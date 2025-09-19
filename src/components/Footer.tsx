import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-amber-50 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg text-amber-800">토리토리</h3>
              <p className="text-amber-600">Toritori</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              작은 토퍼에 담긴, 큰 이야기들<br />
              당신의 소중한 순간을 특별하게
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-gray-800">연락처</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>hello@toritori.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>010-1234-5678</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h4 className="text-gray-800">소셜 미디어</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-600 hover:text-amber-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-700 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>상호: 토리토리</p>
              <p>대표: 김○○</p>
              <p>사업자등록번호: 000-00-00000</p>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-500">
              © 2024 토리토리. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-700">이용약관</a>
              <a href="#" className="hover:text-gray-700">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}