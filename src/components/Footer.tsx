import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-leather-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="bi bi-bag-heart text-2xl text-leather-300"></i>
              <h3 className="text-xl font-serif font-semibold">Luxe Leather</h3>
            </div>
            <p className="text-leather-300 mb-4">
              Premium handcrafted leather products made with the finest materials and traditional craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-leather-300 hover:text-white transition-colors">
                <i className="bi bi-facebook text-xl"></i>
              </a>
              <a href="#" className="text-leather-300 hover:text-white transition-colors">
                <i className="bi bi-instagram text-xl"></i>
              </a>
              <a href="#" className="text-leather-300 hover:text-white transition-colors">
                <i className="bi bi-twitter text-xl"></i>
              </a>
              <a href="#" className="text-leather-300 hover:text-white transition-colors">
                <i className="bi bi-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Care Guide</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-leather-300 hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-leather-300 mb-4">Subscribe to get updates on new arrivals and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-leather-800 border border-leather-700 rounded-l-md focus:border-leather-500 focus:outline-none text-white placeholder-leather-400"
              />
              <button className="bg-leather-600 hover:bg-leather-500 px-4 py-2 rounded-r-md transition-colors">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-leather-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-leather-400 text-sm">
            © 2024 Luxe Leather. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-leather-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-leather-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-leather-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
