import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { CustomCursor } from './CustomCursor';
import { usePageLoader } from '../hooks/usePageLoader';
// import { ThemeToggle } from '@/components/ThemeToggle';
import { ShoppingCart, Menu, X } from 'lucide-react';

function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Shows', href: '/shows' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect dark:bg-gray-900/80 dark:backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="font-display font-bold text-2xl gradient-text">
                Zakir Khan
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`text-secondary dark:text-gray-200 hover:text-primary dark:hover:text-accent transition-colors duration-200 font-medium ${
                  location === item.href ? 'text-primary dark:text-accent' : ''
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/cart">
              <a className="text-secondary dark:text-gray-200 hover:text-primary dark:hover:text-accent transition-colors duration-200 font-medium relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </Link>
            {/* <ThemeToggle /> */}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-secondary dark:text-gray-200 hover:text-primary dark:hover:text-accent"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a 
                    className={`block px-3 py-2 text-base font-medium ${
                      location === item.href 
                        ? 'text-primary dark:text-accent bg-gray-50 dark:bg-gray-800' 
                        : 'text-secondary dark:text-gray-200 hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800'
                    } transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              <Link href="/cart">
                <a 
                  className="flex items-center px-3 py-2 text-base font-medium text-secondary dark:text-gray-200 hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary dark:bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-2xl gradient-text mb-4">Zakir Khan</h3>
            <p className="text-gray-400 dark:text-gray-300 mb-6 max-w-md">
              Official merchandise and show bookings for India's favorite "Sakht Launda". 
              Bringing laughter and community together, one joke at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-400 hover:text-primary transition-colors">Home</a></Link></li>
              <li><Link href="/shop"><a className="text-gray-400 hover:text-primary transition-colors">Shop</a></Link></li>
              <li><Link href="/shows"><a className="text-gray-400 hover:text-primary transition-colors">Shows</a></Link></li>
              <li><Link href="/about"><a className="text-gray-400 hover:text-primary transition-colors">About</a></Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Size Guide</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Zakir Khan - Sakht Launda Official. All rights reserved. 
            <span className="text-primary"> Made with ❤️ for comedy lovers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  usePageLoader();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}
