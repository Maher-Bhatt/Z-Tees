import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';

export default function NotFound() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col selection:bg-black selection:text-white">
      <style>{`
        * { cursor: inherit; }
        button, a, [role="button"] { cursor: pointer !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>

      <AppNavbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center fade-in">
        {/* Big 404 */}
        <p
          className="font-black text-gray-100 select-none leading-none mb-0"
          style={{ fontSize: 'clamp(8rem, 30vw, 18rem)', lineHeight: 1 }}
        >
          404
        </p>

        {/* Message */}
        <div className="-mt-6 md:-mt-10 relative z-10">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-sm font-medium mb-10 max-w-xs mx-auto leading-relaxed">
            This page doesn't exist or was moved. Head back to the collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Back to Shop <ArrowRight size={14} />
            </Link>
            <a
              href="https://instagram.com/z_tees.in"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 text-gray-600 px-8 py-4 text-xs font-black uppercase tracking-widest hover:border-gray-800 hover:text-gray-900 transition-all active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
