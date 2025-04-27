import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Link } from "lucide-react";
import { mockCheckUrl, AccessibilityReportResponse } from "@/lib/mockData";

interface URLInputProps {
  onAnalysisComplete: (url: string) => void;
  defaultUrl?: string;
}

export function URLInput({ onAnalysisComplete, defaultUrl = "" }: URLInputProps) {
  const [url, setUrl] = useState(defaultUrl);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateURL = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError(null);
  };

  const { mutate, isPending } = useMutation<AccessibilityReportResponse, Error, string>({
    mutationFn: async (urlToCheck: string) => {
      // Use the mock data service instead of making an API call
      return mockCheckUrl(urlToCheck);
    },
    onSuccess: (data) => {
      onAnalysisComplete(url);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateURL(url)) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    mutate(url);
  };

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
    if (error) setError(null);
  };

  return (
    <section className="max-w-3xl mx-auto mb-12 w-full px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Analyze Website Accessibility</h2>
        <p className="text-gray-600 mb-6">
          Enter a URL to check the accessibility performance of any website. Get detailed feedback and recommendations for improvement.
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="url"
                id="url-input"
                name="url"
                className="pl-10"
                placeholder="https://example.com"
                value={url}
                onChange={handleChange}
                aria-describedby={error ? "url-error" : undefined}
              />
              {error && (
                <div id="url-error" className="text-destructive text-sm mt-1">
                  {error}
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="min-w-[140px]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="mr-2">Analyzing</span>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : "Analyze"}
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap items-center text-sm text-gray-600">
          <span className="mr-4 mb-2">Try examples:</span>
          <button
            type="button"
            onClick={() => handleExampleClick("https://example.com")}
            className="mb-2 mr-3 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            example.com
          </button>
          <button
            type="button"
            onClick={() => handleExampleClick("https://wikipedia.org")}
            className="mb-2 mr-3 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            wikipedia.org
          </button>
          <button
            type="button"
            onClick={() => handleExampleClick("https://news.ycombinator.com")}
            className="mb-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            news.ycombinator.com
          </button>
        </div>
      </div>
    </section>
  );
}
