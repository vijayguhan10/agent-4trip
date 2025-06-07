import React from "react";

const Footer = () => (
  <footer className="py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm bg-white">
    <div className="flex flex-col md:flex-row items-center">
      <span className="text-teal-600 font-bold mr-2">trip</span>
      <span className="text-gray-600 mr-2">
        © 2025 ORBITRA TECHNOLOGIES LLP. All rights reserved.
      </span>
      <span className="text-gray-500 text-xs md:ml-4 xl:w-96">
        Shop no. 3, Gokul Plaza, Veer Savarkar Road, Nr RLY Phatak Gawad Wadi,
        Virar East, Vasai Virar, Palghar, Maharashtra, 401303
      </span>
    </div>
    <div className="flex gap-4 text-gray-600 mt-2 md:mt-0">
      <a href="#" className="hover:text-gray-800">
        Terms & Conditions
      </a>
      <a href="/privacy" className="hover:text-gray-800">
        Privacy Policy
      </a>
      <a href="#" className="hover:text-gray-800">
        Support
      </a>
      <a href="#" className="hover:text-gray-800">
        Contact
      </a>
    </div>
  </footer>
);

export default Footer;
