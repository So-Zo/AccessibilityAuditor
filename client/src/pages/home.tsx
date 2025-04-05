import React from "react";
import { URLInput } from "@/components/url-input";
import { HowItWorks } from "@/components/how-it-works";
import { FAQ } from "@/components/faq";
import { useLocation } from "wouter";

export default function Home() {
  const [_, navigate] = useLocation();
  
  const handleAnalysisComplete = (url: string) => {
    // Navigate to the report page with the URL as a query parameter
    navigate(`/report?url=${encodeURIComponent(url)}`);
  };
  
  return (
    <div className="flex flex-col items-center">
      <URLInput onAnalysisComplete={handleAnalysisComplete} />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
