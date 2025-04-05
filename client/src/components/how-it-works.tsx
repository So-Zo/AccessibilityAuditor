import React from "react";
import { Zap, FileCheck, CheckCircle, AudioWaveform, Keyboard, Droplets, ALargeSmall, Brackets, Award } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-5xl mx-auto mb-12 w-full px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 rounded-full p-4 mb-4">
                <Zap className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Input Your URL</h3>
              <p className="text-gray-600">Enter the URL of any website you want to analyze for accessibility issues.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 rounded-full p-4 mb-4">
                <FileCheck className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Automated Analysis</h3>
              <p className="text-gray-600">Our tool scans the website and tests it against WCAG accessibility guidelines.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 rounded-full p-4 mb-4">
                <CheckCircle className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Get Results & Recommendations</h3>
              <p className="text-gray-600">Receive a detailed report with specific issues and actionable recommendations.</p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">What We Test For</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                    <AudioWaveform className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Screen Reader Compatibility</h4>
                  <p className="mt-2 text-sm text-gray-600">Alt text, heading structure, ARIA attributes, and more.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                    <Keyboard className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Keyboard Navigation</h4>
                  <p className="mt-2 text-sm text-gray-600">Tab order, focus indicators, keyboard traps, and shortcuts.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                    <Droplets className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Color Contrast</h4>
                  <p className="mt-2 text-sm text-gray-600">Text contrast ratios against backgrounds for readability.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                    <ALargeSmall className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Text Size & Resizing</h4>
                  <p className="mt-2 text-sm text-gray-600">Text scaling and responsive design for various font sizes.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                    <Brackets className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">ARIA & Semantics</h4>
                  <p className="mt-2 text-sm text-gray-600">Proper use of semantic HTML and ARIA landmarks.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Overall Scoring</h4>
                  <p className="mt-2 text-sm text-gray-600">Comprehensive score based on WCAG compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
