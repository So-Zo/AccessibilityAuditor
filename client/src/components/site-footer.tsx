import React from "react";
import { Link } from "wouter";
import { Twitter, Github, Linkedin, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-primary-500 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
              </svg>
              <h2 className="text-xl font-bold">AccessibilityChecker</h2>
            </div>
            <p className="text-gray-300 mb-4">
              A powerful tool to help you make your websites accessible to everyone. 
              Analyze, fix, and monitor your website's accessibility compliance.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                className="text-gray-300 hover:text-white transition" 
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                className="text-gray-300 hover:text-white transition" 
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-300 hover:text-white transition" 
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className="text-gray-300 hover:text-white transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://www.w3.org/WAI/tutorials/" className="text-gray-300 hover:text-white transition">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className="text-gray-300 hover:text-white transition">
                  WCAG Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">© 2023 AccessibilityChecker. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <Button className="bg-gray-700 hover:bg-gray-600">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
