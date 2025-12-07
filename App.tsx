import React, { useState } from 'react';
import { Book, CartItem, User, Order, ViewState, SalesData, TimeSlot, Booking, Episode } from './types';
import { generateAuthorResponse } from './services/geminiService';
import { BookStore } from './components/BookStore';
import { AdminDashboard } from './components/AdminDashboard';
import { AIChat } from './components/AIChat';
import {
  ShoppingBag,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  CreditCard,
  Lock,
  Radio,
  Headphones,
  Calendar,
  Clock,
  Users,
  DollarSign,
  MessageSquare
} from 'lucide-react';

// --- MOCK DATA ---

const AUTHOR_BIO_CONTEXT = `
Robert Williams is a retired Army officer who lives in Northern Virginia. Enlisting in the US Army in 1982 into the Infantry his first assignment was Fort Lewis, Washington. The high point of this first tour was climbing Mount Rainer and many weekends spent in Pioneer Square Tavern in Seattle. His thirty-two-year Army career was one of two halves the first being assignments with the Infantry and the latter eighteen years as a Russia Foreign Area officer with multiple assignments in Eastern Europe and missions in Russia proper.

Born in 1960 in Memphis, Tennessee he lived there a very short time before moving to West Memphis, Arkansas. Growing up as the son of a schoolteacher he was encouraged from an early age to read and to this day remains an avid reader. His summers were spent in Tyronza, Arkansas where he along with his siblings and cousins worked for their maternal grandfather chopping cotton and soy beans.

While in College in 1987 at the University of Memphis and enrolled in a Medical Anthropology course the seed for writing was planted. Years later, inspired by George Orwell's Animal Farm, he wrote "Rainbow Farm".

BOOKS BY ROBERT R WILLIAMS:

1. Woodlawn Giants: A story about a group of boys growing up in West Memphis, Arkansas, in the ’60’s and early ’70’s. It features characters like Big Phil Spicer and adventures like jumping the Ten-Mile Bayou.

2. Rainbow Farm 2.0: Impeachment and Virus: A sequel to Rainbow Farm where the farm is hit by an impeachment followed by a virus. Features characters like Imperitia, Fancy the Bat, Shifty the Weasel, and new characters like Wiltberg the pig.

3. Rainbow Farm: An account of the state of U.S. political affairs since the election of Donald Trump. It uses the same principle as George Orwell did in Animal Farm. Characters include Pete, Rex, Shrill, and Cam.
`;

const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Woodlawn Giants',
    subtitle: 'Growing up in West Memphis',
    description: "Woodlawn Giants. A story about a group of boys growing up in West Memphis, Arkansas, in the ’60’s and early ’70’s. The story begins with Daddy and Mr. Rick planting some pine trees. Those trees symbolize my lifelong friends, the Woodlawn Giants. Enjoy the trip back in time as the boys embark on several adventures to include Florida Ball, snipe hunting, and an attempt to jump the Ten-Mile Bayou. You will experience the “it takes a village” mentality that defined the everyday world the boys experienced under the watchful eye of Mrs. Mary Jane and Momma. Meet Big Phil Spicer the benevolent, larger- than- life patriarch of our gang. You will love the sassy Janice Smith, aka Skillet, quick and sharp with the tongue. Have a front row seat to the sniper operation where the entire gang comes together in a takedown of Old Man Donaldson. If you love to fish, you will enjoy the trot line stories on Dacus and Tunica Lake. Of course, anytime boys get together, there will be accidents and mistakes. We were not angels, and we learned some hard life lessons along the way. We all lived, we all learned, and it was a wonderful childhood. Miss you, Momma and Daddy. Miss you, Big Phil and the Woodlawn Giants. The pines still stand, and the memories live on.",
    price: 14.99,
    image: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1634944712i/59433146.jpg',
    inStock: true,
    rating: 4.42,
    reviewCount: 217
  },
  {
    id: '2',
    title: 'Rainbow Farm 2.0: Impeachment and Virus',
    subtitle: 'Oh, what tangled webs we weave',
    description: 'Oh, what tangled webs we weave. The farm is hit by an impeachment followed by a virus that shakes it to its core. During all this, the Squad of cute little rabbits and their fearless leader, Imperitia, have been successful in pulling their party, the Donkeys, to the extreme far left. Fancy the Bat has capitulated to the calls and demands for impeachment as Operation Take Down Pete continues. Her lead attack dog, Shifty the Weasel, leads the charge as Nads the Walrus is regulated to second fiddle. There are a host of new characters to include such as Wiltberg, a potbellied pig; Dyani, a beautiful albino doe; a meerkat named Elena; a young possum named Alfred; Hitch, a turtle; Bookie, a black lion; Cackles, a hyena; and Myanna, a beautiful mink. Also joining the farm are two Ukrana twin bears, Beefy and Atticus. Have front-row seats to the Donkey debate known as the Huss, Fuss, and Cuss in Sin City. Be part of the audience for a host of new events in the pen of Justice the Bull. Observe two earth-shattering events on the impeachment and virus. Whom will the Donkeys pick as their nominee? Will it be a newcomer or someone from the establishment? Will Shrill the parrot parachute in at the last minute to save the day? Is the Farm headed for revolution? Join along and enjoy this sequel to Rainbow Farm and find the answers to these questions.',
    price: 18.99,
    image: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1612682829i/56977309.jpg',
    inStock: true,
    rating: 4.57,
    reviewCount: 105
  },
  {
    id: '3',
    title: 'Rainbow Farm',
    subtitle: 'A Political Allegory',
    description: "Rainbow Farm is an account of the state of U.S. political affairs since the election of Donald Trump as the Forty-Fifth President. It uses the same principle as George Orwell did in Animal Farm where certain notorious personalities come to life as animals on the farm. It exposes the hypocrisy of both U.S. political parties, Donkeys and Elephants, in their dealings with each other as well as their hypocritical views of other farms. When it comes to U.S. foreign policy, it exposes how U.S. criticisms of other farms' actions are really actions that are the same as its own. It shows how we all are similar in nature and one and the same with just different means trying to achieve the same ends. You will immediately recognize certain personalities like the flamboyant Pete, sexy Rex, Shrill, and Cam, but other personalities' portrayals are more cryptic, requiring analysis to determine who that character may be. The story begins with the arrival of Pete to the farm up to the point of the election and the aftermath of what is undoubtedly the greatest political upset in modern history. Not all is serious, and not all is politics. Join the animals on the farm in their favorite pastime as they observe the annual bull-riding competition on Justice; watch Regan in her inferno as she slowly gets grilled by Sly, and have a front row to the Hen's March, the Coup, and Inquisition. Enjoy the in-depth conversation between Rex and Pete, and finally contemplate the final interview of the Wise Old Owl on numerous topics which are affecting today's society. There is something for everyone in Rainbow Farm. Hopefully, the result of reading it will be an honest self-critique of ourselves and America and more acceptance of all things different.",
    price: 19.99,
    image: 'https://m.media-amazon.com/images/I/71hoomJ+wgL._SY466_.jpg',
    inStock: true,
    rating: 4.7,
    reviewCount: 14
  }
];

const INITIAL_SALES: SalesData[] = [
  { month: 'Jan', revenue: 1200, sales: 60 },
  { month: 'Feb', revenue: 1900, sales: 95 },
  { month: 'Mar', revenue: 1500, sales: 75 },
  { month: 'Apr', revenue: 2400, sales: 120 },
  { month: 'May', revenue: 2100, sales: 105 },
  { month: 'Jun', revenue: 3200, sales: 160 },
];

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Robert Williams', email: 'robert@example.com', role: 'admin', joinDate: '2023-01-15' },
  { id: 'u2', name: 'Jane Doe', email: 'jane@customer.com', role: 'customer', joinDate: '2023-05-20' },
  { id: 'u3', name: 'John Smith', email: 'john@customer.com', role: 'customer', joinDate: '2023-06-10' },
];

const MOCK_ORDERS: Order[] = [
  { id: 'o1', customerName: 'Jane Doe', total: 19.99, date: '2023-05-20', status: 'completed' },
  { id: 'o2', customerName: 'John Smith', total: 44.49, date: '2023-06-10', status: 'shipped' },
];

const MOCK_EPISODES: Episode[] = [
  {
    id: '1',
    number: 1,
    title: 'Hey US, THE World is not a zero-sum game',
    description: 'Episode one of this podcast will present to you the moderators via a brief introduction and talk about their experiences overseas, albeit different. With Chloe having been born in India, and Bob having served in the US Army with several posts throughout Europe to include also Korea. Our intent is to show that the world is not a zero sum game. In other words, because the US does things one way doesn\'t mean you can\'t get positive results in other countries doing it, albeit a different way.',
    duration: '45 minutes',
    date: 'November 2024',
    hasPlayer: true,
    playerSrc: 'https://www.podbean.com/player-v2/?i=4dkfs-16dc4df-pb&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7'
  },
  {
    id: '2',
    number: 2,
    title: 'Death Penalty',
    description: 'A critical examination of capital punishment from multiple perspectives, exploring the moral, legal, and practical implications of the death penalty system.',
    duration: '52 minutes',
    date: 'December 2024',
    hasPlayer: true,
    playerSrc: 'https://www.podbean.com/player-v2/?i=nekdx-19e2df4-pb&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7'
  }
];

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Meet & Greet State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'meet-greet' | 'book-signing' | 'discussion'>('meet-greet');
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Podcast Episode State
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  
  // Admin Mock Data State
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [sales, setSales] = useState<SalesData[]>(INITIAL_SALES);

  // Cart Logic
  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    // Simple toast could go here
    alert(`Added ${book.title} to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      const newOrder: Order = {
        id: `o${Date.now()}`,
        customerName: 'Guest Customer', // In real app, get from form
        total: cartTotal,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setOrders(prev => [...prev, newOrder]);
      setCart([]);
      setView('success');
    }, 1500);
  };

  const toggleAdmin = () => {
    if (currentUser?.role === 'admin') {
      setCurrentUser(null);
      setView('home');
    } else {
      setCurrentUser(MOCK_USERS[0]);
      setView('admin');
    }
  };

  // --- SUB-COMPONENTS FOR LAYOUT ---

  const Navbar = () => (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">R.R. Williams</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className={`text-sm font-medium transition-colors ${view === 'home' ? 'text-military-600' : 'text-stone-500 hover:text-stone-900'}`}>Home</button>
            <button onClick={() => setView('store')} className={`text-sm font-medium transition-colors ${view === 'store' ? 'text-military-600' : 'text-stone-500 hover:text-stone-900'}`}>Books</button>
            <button onClick={() => {setView('podcast'); setSelectedEpisode(null)}} className={`text-sm font-medium transition-colors ${view === 'podcast' || view === 'episode' ? 'text-military-600' : 'text-stone-500 hover:text-stone-900'}`}>Podcast</button>
            <button onClick={() => setView('meet-greet')} className={`text-sm font-medium transition-colors ${view === 'meet-greet' ? 'text-military-600' : 'text-stone-500 hover:text-stone-900'}`}>Meet & Greet</button>
            {currentUser?.role === 'admin' && (
              <button onClick={() => setView('admin')} className={`text-sm font-medium transition-colors ${view === 'admin' ? 'text-military-600' : 'text-stone-500 hover:text-stone-900'}`}>Dashboard</button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 text-stone-500 hover:text-military-600 transition-colors"
              onClick={() => cart.length > 0 && setView('checkout')}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cart.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-stone-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button onClick={toggleAdmin} className="hidden md:block p-2 text-stone-400 hover:text-stone-800" title={currentUser ? "Logout" : "Admin Login"}>
              {currentUser ? <LogOut size={20} /> : <UserIcon size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => {setView('home'); setIsMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50">Home</button>
            <button onClick={() => {setView('store'); setIsMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50">Books</button>
            <button onClick={() => {setView('podcast'); setSelectedEpisode(null); setIsMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50">Podcast</button>
            <button onClick={() => {setView('meet-greet'); setIsMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50">Meet & Greet</button>
            <button onClick={() => {toggleAdmin(); setIsMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50">
              {currentUser ? 'Logout' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // --- VIEWS ---

  const HomeView = () => (
    <>
      {/* Hero */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/122/1920/1080" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Soldier. Scholar. <br/> <span className="text-military-300">Storyteller.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-8 max-w-2xl leading-relaxed">
            From the cotton fields of Arkansas to the diplomatic circles of Eastern Europe. 
            Discover the works of Robert R Williams, featuring the acclaimed political satire "Rainbow Farm".
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setView('store')} className="px-8 py-4 bg-military-600 hover:bg-military-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-military-600/50 flex items-center justify-center">
              Buy the Book <ArrowRight className="ml-2" size={20} />
            </button>
            <button 
               onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
               className="px-8 py-4 bg-transparent border border-stone-500 hover:border-white text-stone-300 hover:text-white font-medium rounded-lg transition-colors"
            >
              Read Biography
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 mb-10 lg:mb-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://picsum.photos/id/338/800/1000" 
                  alt="Robert R Williams" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-serif italic">"The seed for writing was planted in Memphis, 1987."</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <h4 className="font-bold text-2xl text-military-700 mb-1">32</h4>
                  <p className="text-sm text-stone-600 font-medium">Years of Service</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <h4 className="font-bold text-2xl text-military-700 mb-1">18</h4>
                  <p className="text-sm text-stone-600 font-medium">Years as FAO</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-sm font-bold text-military-600 tracking-wider uppercase">About the Author</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">From The Infantry to Intelligence</h3>
              <div className="prose prose-lg text-stone-600">
                <p>
                  Robert Williams is a retired Army officer who lives in Northern Virginia. Enlisting in the US Army in 1982 into the Infantry his first assignment was Fort Lewis, Washington. His thirty-two-year Army career was one of two halves the first being assignments with the Infantry and the latter eighteen years as a Russia Foreign Area officer with multiple assignments in Eastern Europe and missions in Russia proper.
                </p>
                <p>
                  Born in 1960 in Memphis, Tennessee, he lived there a very short time before moving to West Memphis, Arkansas. Growing up as the son of a schoolteacher he was encouraged from an early age to read and to this day remains an avid reader. While in College in 1987 at the University of Memphis and enrolled in a Medical Anthropology course the seed for writing was planted.
                </p>
                <p>
                  It was a British author, George Orwell and his allegorical novella <em>Animal Farm</em> that was his favorite. This story would resurface seventeen years later and while on vacation with his family in South Carolina the seed planted in Memphis in 1987 twenty plus years earlier would germinate and he would pen <strong>Rainbow Farm</strong>.
                </p>
              </div>
              
              <div className="pt-6 border-t border-stone-200">
                <h4 className="font-serif font-bold text-stone-900 mb-4">Literary Influences</h4>
                <div className="flex flex-wrap gap-2">
                  {['John Steinbeck', 'Fyodor Dostoevsky', 'George Orwell', 'Mark Twain'].map((author) => (
                    <span key={author} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium">
                      {author}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const PodcastView = () => (
    <div className="py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Radio className="text-military-600 mr-3" size={40} />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Podcast</h1>
          </div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Exploring global perspectives through military and diplomatic experiences
          </p>
        </div>

        {/* Featured Episode */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="lg:grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="flex items-center mb-4">
                <span className="bg-military-100 text-military-700 px-3 py-1 rounded-full text-sm font-bold mr-3">LATEST EPISODE</span>
                <span className="text-stone-500 text-sm">{MOCK_EPISODES[0].duration}</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-4">
                {MOCK_EPISODES[0].title}
              </h2>
              
              <div className="prose prose-lg text-stone-600 mb-8">
                <p>{MOCK_EPISODES[0].description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setSelectedEpisode(MOCK_EPISODES[0]);
                    setView('episode');
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-military-600 hover:bg-military-500 text-white font-bold rounded-lg transition-colors shadow-lg"
                >
                  <Headphones className="mr-2" size={20} />
                  Listen Now
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition-colors">
                  Subscribe for Updates
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-military-600 to-military-800 p-8 lg:p-12 text-white flex items-center justify-center">
              <div className="text-center">
                <Radio className="mx-auto mb-6" size={80} />
                <h3 className="text-2xl font-bold mb-4">Global Perspectives</h3>
                <p className="text-military-100 text-lg">
                  "Exploring international viewpoints"
                </p>
                <div className="mt-8 flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{MOCK_EPISODES.length}</div>
                    <div className="text-military-200 text-sm">Episodes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-military-200 text-sm">Hosts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">∞</div>
                    <div className="text-military-200 text-sm">Perspectives</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Archive */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Episodes Archive</h3>
          <div className="space-y-4">
            {MOCK_EPISODES.map((episode) => (
              <div 
                key={episode.id}
                className="border-l-4 border-military-500 pl-6 py-4 bg-stone-50 rounded-r-lg cursor-pointer hover:bg-stone-100 transition-colors"
                onClick={() => {
                  setSelectedEpisode(episode);
                  setView('episode');
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-stone-900">Episode {episode.number}: {episode.title}</h4>
                  <span className="text-stone-500 text-sm">{episode.duration}</span>
                </div>
                <p className="text-stone-600 text-sm mb-3">
                  {episode.description.length > 150 ? `${episode.description.substring(0, 150)}...` : episode.description}
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-military-600 hover:text-military-700 font-medium text-sm flex items-center">
                    <Headphones size={16} className="mr-1" />
                    Listen Now
                  </button>
                  <span className="text-stone-400 text-sm">•</span>
                  <span className="text-stone-500 text-sm">{episode.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-stone-500 text-sm">More episodes coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );

  const EpisodeView = () => {
    if (!selectedEpisode) {
      return <div>Episode not found</div>;
    }

    return (
      <div className="py-20 bg-stone-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button 
            onClick={() => setView('podcast')}
            className="mb-8 inline-flex items-center text-military-600 hover:text-military-700 font-medium"
          >
            ← Back to Podcast
          </button>

          {/* Episode Header */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="p-8 lg:p-12">
              <div className="flex items-center mb-4">
                <span className="bg-military-100 text-military-700 px-3 py-1 rounded-full text-sm font-bold mr-3">
                  EPISODE {selectedEpisode.number}
                </span>
                <span className="text-stone-500 text-sm">{selectedEpisode.duration}</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-4">
                {selectedEpisode.title}
              </h1>
              
              <p className="text-stone-500 text-sm mb-6">{selectedEpisode.date}</p>
              
              <div className="prose prose-lg text-stone-600">
                <p>{selectedEpisode.description}</p>
              </div>
            </div>
          </div>

          {/* Embedded Player */}
          {selectedEpisode.hasPlayer && selectedEpisode.playerSrc && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Listen Now</h2>
              <div className="flex justify-center">
                <iframe 
                  title={selectedEpisode.title}
                  allowtransparency="true" 
                  height="150" 
                  width="100%" 
                  style={{border: 'none', minWidth: 'min(100%, 430px)', height: '150px'}} 
                  scrolling="no" 
                  data-name="pb-iframe-player" 
                  src={selectedEpisode.playerSrc}
                  loading="lazy">
                </iframe>
              </div>
            </div>
          )}

          {/* Episode Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Share & Subscribe</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://podbean.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-military-600 hover:bg-military-500 text-white font-bold rounded-lg transition-colors shadow-lg"
              >
                <Headphones className="mr-2" size={20} />
                Listen on Podbean
              </a>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition-colors">
                Subscribe for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper functions for Meet & Greet
  const generateAvailability = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    
    // Generate availability for next 30 days
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for bookings
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const dateStr = date.toISOString().split('T')[0];
        
        // Add time slots from 10 AM to 4 PM
        const times = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
        times.forEach((time, index) => {
          slots.push({
            id: `${dateStr}-${index}`,
            date: dateStr,
            time,
            available: Math.random() > 0.3, // 70% availability
            booked: Math.random() > 0.8 // 20% booked
          });
        });
      }
    }
    
    return slots;
  };

  const [availability] = useState<TimeSlot[]>(generateAvailability());

  const bookingTypes = [
    {
      type: 'meet-greet' as const,
      title: 'Meet & Greet',
      description: 'Personal introduction and brief conversation with Robert R. Williams',
      duration: '30 minutes',
      price: 25,
      icon: Users
    },
    {
      type: 'book-signing' as const,
      title: 'Book Signing',
      description: 'Personal book signing session with photo opportunity',
      duration: '45 minutes',
      price: 35,
      icon: MessageSquare
    },
    {
      type: 'discussion' as const,
      title: 'Author Discussion',
      description: 'In-depth conversation about literature, politics, and military experience',
      duration: '60 minutes',
      price: 50,
      icon: MessageSquare
    }
  ];

  const getSelectedTypeInfo = () => {
    return bookingTypes.find(type => type.type === selectedType)!;
  };

  const getAvailableDates = () => {
    const dates = new Set(availability.filter(slot => slot.available && !slot.booked).map(slot => slot.date));
    return Array.from(dates).sort();
  };

  const getAvailableTimes = (date: string) => {
    return availability.filter(slot => slot.date === date && slot.available && !slot.booked).map(slot => slot.time);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedTypeInfo = getSelectedTypeInfo();
    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      customerName: (e.target as any).customerName.value,
      customerEmail: (e.target as any).customerEmail.value,
      customerPhone: (e.target as any).customerPhone.value,
      date: selectedDate,
      time: selectedTime,
      duration: parseInt(selectedTypeInfo.duration.split(' ')[0]),
      type: selectedType,
      notes: (e.target as any).notes.value,
      paymentStatus: 'paid',
      amount: selectedTypeInfo.price,
      createdAt: new Date().toISOString()
    };
    
    setBookings(prev => [...prev, newBooking]);
    setBookingStep(4);
  };

  const MeetGreetView = () => (
    <div className="py-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="text-military-600 mr-3" size={40} />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Meet & Greet</h1>
          </div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Book a personal meeting with Robert R. Williams
          </p>
        </div>

        {/* Author Info Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="lg:grid lg:grid-cols-3">
            <div className="lg:col-span-2 p-8 lg:p-12">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">About Robert R. Williams</h2>
              <div className="prose prose-lg text-stone-600 space-y-4">
                <p>
                  <strong>Retired U.S. Army Colonel</strong> with 32 years of distinguished service, including 18 years as a Russia Foreign Area Officer with extensive experience in Eastern Europe and missions in Russia proper.
                </p>
                <p>
                  Born in Memphis, Tennessee (1960), Robert grew up in West Memphis, Arkansas. His military career spanned from the Infantry to Foreign Area Officer specialization, giving him unique insights into international relations and global affairs.
                </p>
                <p>
                  An accomplished author known for works like <em>"Rainbow Farm"</em> and <em>"Woodlawn Giants"</em>, Robert brings together his military experience, literary talent, and diplomatic insights in his engaging presentations.
                </p>
                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-military-500">
                  <h3 className="font-bold text-stone-900 mb-2">What to Expect:</h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Personal stories from a 32-year military career</li>
                    <li>• Insights into international diplomacy and foreign relations</li>
                    <li>• Discussion about his literary works and inspiration</li>
                    <li>• Q&A about military service, literature, and current affairs</li>
                    <li>• Personalized photo opportunity</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-military-600 to-military-800 p-8 lg:p-12 text-white flex items-center justify-center">
              <div className="text-center">
                <img
                  src="https://picsum.photos/id/338/400/500"
                  alt="Robert R. Williams"
                  className="w-48 h-56 object-cover rounded-2xl mx-auto mb-6 shadow-2xl"
                />
                <h3 className="text-2xl font-bold mb-2">Col. Robert R. Williams</h3>
                <p className="text-military-100 mb-4">Retired Army Officer & Author</p>
                <div className="space-y-2 text-sm">
                  <div>📍 Northern Virginia</div>
                  <div>📚 3 Published Books</div>
                  <div>🎖️ 32 Years Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Process */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    bookingStep >= step ? 'bg-military-600 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      bookingStep > step ? 'bg-military-600' : 'bg-stone-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Meeting Type Selection */}
            {bookingStep === 1 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Choose Your Meeting Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bookingTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.type}
                        onClick={() => setSelectedType(type.type)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedType === type.type
                            ? 'border-military-500 bg-military-50'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="text-center">
                          <IconComponent className="mx-auto mb-4 text-military-600" size={48} />
                          <h3 className="text-xl font-bold text-stone-900 mb-2">{type.title}</h3>
                          <p className="text-stone-600 text-sm mb-4">{type.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-500 text-sm">{type.duration}</span>
                            <span className="text-2xl font-bold text-military-600">${type.price}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="px-8 py-3 bg-military-600 hover:bg-military-500 text-white font-bold rounded-lg transition-colors"
                  >
                    Continue to Date & Time
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {bookingStep === 2 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Select Date & Time</h2>
                
                {/* Calendar */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-stone-900 mb-4">Available Dates</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {getAvailableDates().slice(0, 12).map((date: string) => {
                      const dateObj = new Date(date);
                      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = dateObj.getDate();
                      const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                      
                      return (
                        <button
                          key={date}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedTime(''); // Reset time when date changes
                          }}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            selectedDate === date
                              ? 'border-military-500 bg-military-50 text-military-700'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="text-sm font-medium">{dayName}</div>
                          <div className="text-lg font-bold">{dayNum}</div>
                          <div className="text-xs text-stone-500">{month}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-stone-900 mb-4">Available Times</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {getAvailableTimes(selectedDate).map((time: string) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            selectedTime === time
                              ? 'border-military-500 bg-military-50 text-military-700'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <Clock className="mx-auto mb-1" size={16} />
                          <div className="text-sm font-medium">{time}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setBookingStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="px-8 py-3 bg-military-600 hover:bg-military-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                  >
                    Continue to Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Customer Details */}
            {bookingStep === 3 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Booking Details</h2>
                
                <form onSubmit={handleBookingSubmit} className="max-w-2xl mx-auto">
                  <div className="bg-stone-50 p-6 rounded-xl mb-6">
                    <h3 className="font-bold text-stone-900 mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-stone-600">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{getSelectedTypeInfo().title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{getSelectedTypeInfo().duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-300 pt-2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-military-600">${getSelectedTypeInfo().price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="customerEmail"
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-stone-700 mb-2">Special Requests or Questions</label>
                    <textarea
                      name="notes"
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                      placeholder="Any specific topics you'd like to discuss or special requests..."
                    ></textarea>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-white border-2 border-stone-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-stone-900">Advance Payment Required</h4>
                      <DollarSign className="text-military-600" size={24} />
                    </div>
                    <p className="text-stone-600 text-sm mb-4">
                      A advance payment of ${getSelectedTypeInfo().price} is required to secure your booking. This will be applied to your total.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Card Number *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">CVC *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-military-600 hover:bg-military-500 text-white font-bold rounded-lg transition-colors flex items-center"
                    >
                      <CreditCard className="mr-2" size={20} />
                      Confirm Booking - ${getSelectedTypeInfo().price}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {bookingStep === 4 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Booking Confirmed!</h2>
                <p className="text-stone-600 mb-8">
                  Thank you for booking a meeting with Robert R. Williams. You will receive a confirmation email shortly.
                </p>
                
                <div className="bg-stone-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                  <h3 className="font-bold text-stone-900 mb-4">Meeting Details</h3>
                  <div className="space-y-2 text-stone-600">
                    <div><strong>Type:</strong> {getSelectedTypeInfo().title}</div>
                    <div><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {selectedTime}</div>
                    <div><strong>Duration:</strong> {getSelectedTypeInfo().duration}</div>
                    <div><strong>Location:</strong> Northern Virginia (details via email)</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBookingStep(1);
                    setSelectedDate('');
                    setSelectedTime('');
                    setSelectedType('meet-greet');
                  }}
                  className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Book Another Meeting
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const CheckoutView = () => (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Secure Checkout</h2>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-bold text-stone-800 mb-4">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-stone-100">
                  <div>
                    <p className="font-medium text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-bold text-lg text-stone-900">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <h3 className="font-bold text-stone-800 mb-4">Payment Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <input type="email" required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none" placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Card Information</label>
                <div className="relative">
                  <input type="text" required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none pl-10" placeholder="0000 0000 0000 0000" />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <input type="text" required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none" placeholder="MM/YY" />
                </div>
                <div>
                   <input type="text" required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-military-500 outline-none" placeholder="CVC" />
                </div>
              </div>

              <button type="submit" className="w-full bg-military-600 text-white py-3 rounded-lg font-bold hover:bg-military-700 transition-colors flex items-center justify-center mt-6">
                <Lock size={16} className="mr-2" /> Pay ${cartTotal.toFixed(2)}
              </button>
              <p className="text-xs text-center text-stone-400 mt-2">Encrypted and Secure Payment Processing</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const SuccessView = () => (
    <div className="min-h-[60vh] flex items-center justify-center bg-stone-50">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Thank You for Your Order!</h2>
        <p className="text-stone-600 mb-8">Your copy of Rainbow Farm is being prepared for shipment.</p>
        <button onClick={() => setView('home')} className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
          Return Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900">
      <Navbar />

      <main className="flex-grow">
        {view === 'home' && <HomeView />}
        {view === 'store' && <BookStore books={MOCK_BOOKS} onAddToCart={addToCart} />}
        {(view === 'podcast' || view === 'episode') && (selectedEpisode ? <EpisodeView /> : <PodcastView />)}
        {view === 'meet-greet' && <MeetGreetView />}
        {view === 'admin' && <AdminDashboard users={users} orders={orders} salesData={sales} />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'success' && <SuccessView />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-serif font-bold text-xl mb-4">Robert R Williams</h3>
              <p className="text-sm leading-relaxed">
                Author, Veteran, Thinker. Sharing perspectives on history, politics, and the human condition through literature.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><MapPin size={16} className="mr-2" /> Northern Virginia, USA</li>
                <li className="flex items-center"><Mail size={16} className="mr-2" /> contact@robertrwilliams.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Follow</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-center">
            &copy; {new Date().getFullYear()} Robert R Williams. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Global Components */}
      <AIChat context={AUTHOR_BIO_CONTEXT} />
    </div>
  );
};

export default App;