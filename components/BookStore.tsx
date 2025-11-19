import React from 'react';
import { Book } from '../types';
import { ShoppingCart, Check, Star } from 'lucide-react';

interface BookStoreProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

export const BookStore: React.FC<BookStoreProps> = ({ books, onAddToCart }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${
          i < Math.round(rating) ? 'text-yellow-500 fill-current' : 'text-stone-300'
        }`} 
      />
    ));
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">The Bookstore</h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Explore the literary works of Robert R Williams. Political satire, military history, and personal memoirs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 flex flex-col md:flex-row transition-transform hover:-translate-y-1 duration-300">
            <div className="md:w-1/2 relative group">
              <div className="aspect-[3/4] w-full overflow-hidden bg-stone-200">
                 <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-duration-500"
                />
              </div>
            </div>
            
            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {renderStars(book.rating || 5)}
                  </div>
                  {book.rating && (
                    <span className="text-xs text-stone-600 font-medium">{book.rating} ({book.reviewCount} reviews)</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mb-2">{book.title}</h3>
                {book.subtitle && (
                  <p className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-4">{book.subtitle}</p>
                )}
                <p className="text-stone-600 leading-relaxed mb-6 text-sm">
                  {book.description.length > 200 ? `${book.description.substring(0, 200)}...` : book.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-stone-900">${book.price}</span>
                  <span className="ml-2 text-sm text-stone-500">USD</span>
                </div>
                
                <button
                  onClick={() => onAddToCart(book)}
                  disabled={!book.inStock}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg text-white font-semibold transition-all ${
                    book.inStock 
                      ? 'bg-military-600 hover:bg-military-700 shadow-lg shadow-military-600/30' 
                      : 'bg-stone-300 cursor-not-allowed'
                  }`}
                >
                  {book.inStock ? (
                    <>
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </>
                  ) : (
                    <span>Out of Stock</span>
                  )}
                </button>
                
                <div className="mt-4 flex items-center justify-center text-xs text-stone-500 space-x-4">
                  <div className="flex items-center">
                    <Check size={12} className="text-green-500 mr-1" />
                    Secure Checkout
                  </div>
                  <div className="flex items-center">
                    <Check size={12} className="text-green-500 mr-1" />
                    Fast Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};