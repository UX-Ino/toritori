"use client";
import { useState } from 'react';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '우리 이야기' },
    { id: 'portfolio', label: '작품 이야기' },
    { id: 'order', label: '주문 안내' },
    { id: 'contact', label: '시작하기' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-2xl font-semibold text-amber-800">토리토리</h1>
            <p className="text-xs text-amber-600">Toritori</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm transition-colors ${
                  currentPage === item.id
                    ? 'text-amber-700 border-b-2 border-amber-300'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-amber-600 hover:text-amber-700 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-amber-600 hover:text-amber-700 transition-colors">
              <MessageCircle size={20} />
            </a>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left text-sm transition-colors ${
                    currentPage === item.id
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-25'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
