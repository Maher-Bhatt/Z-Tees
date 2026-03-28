import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { IG_URL, IG_HANDLE, WA_NUMBER } from '@/data/products';

export default function AppFooter() {
  return (
    <footer className="bg-black text-white pt-14 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase hover:opacity-70 transition-opacity inline-block mb-3">
              Z Tees.
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-2">
              Modern Indian streetwear. Designed to stand out.
            </p>
            <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Designed in India.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-gray-500">Ordering</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li>Orders placed via WhatsApp</li>
              <li>UPI Payments Accepted</li>
              <li>Cash on Delivery Not Available</li>
              <li>Free Delivery in Gujarat</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-gray-500">Connect</h4>
            <ul className="space-y-3 text-sm font-bold uppercase tracking-wide">
              <li>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors">WhatsApp</a>
              </li>
              <li>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram size={12} /> @{IG_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Z Tees. All rights reserved.</p>
          <a href="https://maherbhatt.me" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition-colors">
            Made by Maher Bhatt
          </a>
        </div>
      </div>
    </footer>
  );
}
