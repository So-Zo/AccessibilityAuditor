import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ResultsOverview } from "@/components/results-overview";
import { DetailedResults } from "@/components/detailed-results";
import { RecommendationSummary } from "@/components/recommendation-summary";
import { URLInput } from "@/components/url-input";
import { useToast } from "@/hooks/use-toast";
import { AccessibilityReportResponse, mockCheckUrl } from "@/lib/mockData";

export default function Report() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // Get the URL from the query parameters
  const params = new URLSearchParams(window.location.search);
  const url = params.get("url");

  // Query to fetch the report using mock data
  const {
    data: report,
    isLoading,
    isError,
    error
  } = useQuery<AccessibilityReportResponse>({
    queryKey: ['mockCheck', url],
    enabled: !!url,
    queryFn: async () => {
      if (!url) throw new Error('URL is required');
      return mockCheckUrl(url);
    }
  });

  useEffect(() => {
    // Redirect to home if no URL is provided
    if (!url) {
      navigate("/");
      toast({
        title: "No URL provided",
        description: "Please enter a URL to analyze.",
        variant: "destructive",
      });
    }
  }, [url, navigate, toast]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch accessibility report",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const handleNewAnalysis = (newUrl: string) => {
    navigate(`/report?url=${encodeURIComponent(newUrl)}`);
  };

  if (!url) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <URLInput onAnalysisComplete={handleNewAnalysis} defaultUrl={url} />

      {isLoading && (
        <div className="max-w-5xl mx-auto my-12 bg-white rounded-xl shadow-md p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-12 w-12 rounded-full border-4 border-t-primary border-primary-100 animate-spin mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Analyzing Website Accessibility</h2>
            <p className="text-gray-600">
              We're examining {url} for accessibility issues. This may take a moment...
            </p>
          </div>
        </div>
      )}

      {!isLoading && !isError && report && (
        <>
          <ResultsOverview report={report} />
          <DetailedResults report={report} />
          <RecommendationSummary report={report} />
        </>
      )}
    </div>
  );
}
