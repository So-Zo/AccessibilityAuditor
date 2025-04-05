import React, { useState } from "react";
import { Link } from "wouter";
import { Sun, Moon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <svg className="w-8 h-8 text-primary-500 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
          </svg>
          <Link href="/">
            <a className="text-xl font-bold text-gray-900">AccessibilityChecker</a>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="#how-it-works">
            <a className="text-gray-600 hover:text-primary-600 font-medium">How it works</a>
          </Link>
          <Link href="#faq">
            <a className="text-gray-600 hover:text-primary-600 font-medium">FAQ</a>
          </Link>
        </div>
      </div>
    </header>
  );
}
