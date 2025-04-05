import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What accessibility standards do you test against?",
    answer: "Our tool tests websites against the Web Content Accessibility Guidelines (WCAG) 2.1 at levels A and AA. These guidelines are the internationally recognized standards for web accessibility, covering a wide range of recommendations for making web content more accessible to people with disabilities."
  },
  {
    question: "Can this tool replace manual testing?",
    answer: "While our tool provides comprehensive automated testing, it should complement, not replace, manual testing. Automated testing can identify many technical issues, but human evaluation is still necessary for aspects that require judgment, such as the appropriateness of alt text or the logical order of elements. We recommend using our tool as part of a broader accessibility testing strategy."
  },
  {
    question: "How often should I test my website?",
    answer: "We recommend testing your website after any significant updates or content changes. For websites that update frequently, consider monthly testing. For more static websites, quarterly testing may be sufficient. Establishing a regular testing schedule helps ensure your site maintains accessibility compliance over time."
  },
  {
    question: "Can I test password-protected pages?",
    answer: "Currently, our tool can only test publicly accessible pages. For password-protected or authenticated sections of your website, consider using our enterprise version which supports authenticated testing through secure credential management and API integration."
  },
  {
    question: "Is this tool GDPR compliant?",
    answer: "Yes, our tool is GDPR compliant. We do not store personal data from the websites we scan, and all analysis is performed securely. Reports are stored temporarily and can be permanently deleted at your request. For more information, please see our Privacy Policy."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="max-w-3xl mx-auto mb-16 w-full px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="px-6 py-4">
              <button 
                className="w-full flex justify-between items-center focus-visible"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-gray-900 text-left">{faq.question}</h3>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-gray-500 transition-transform",
                    openIndex === index ? "transform rotate-180" : ""
                  )} 
                />
              </button>
              <div 
                className={cn(
                  "mt-2 transition-all overflow-hidden",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
