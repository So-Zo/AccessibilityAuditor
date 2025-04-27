import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import { AccessibilityReportResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { File, Share } from "lucide-react";

interface ResultsOverviewProps {
  report: AccessibilityReportResponse;
}

export function ResultsOverview({ report }: ResultsOverviewProps) {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Animate the score circle on component mount
    if (circleRef.current) {
      const dashArray = 400;
      const dashOffset = dashArray - (dashArray * report.overallScore / 100);

      // Small delay for animation effect
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = dashOffset.toString();
        }
      }, 100);
    }
  }, [report.overallScore]);

  // Function to determine score description based on overall score
  const getScoreDescription = (score: number): string => {
    if (score >= 90) return "highly accessible";
    if (score >= 80) return "fairly accessible";
    if (score >= 70) return "moderately accessible";
    if (score >= 50) return "somewhat accessible";
    return "poorly accessible";
  };

  // Determine issues count
  const issuesCount = report.issues.length;

  // Format date for display
  const formattedDate = format(new Date(report.date), "MMM d, yyyy");

  // Determine color for overall score
  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-success-500";
    if (score >= 70) return "text-primary-500";
    if (score >= 50) return "text-warning-500";
    return "text-destructive";
  };

  // Determine color for category scores
  const getCategoryScoreColor = (score: number): string => {
    if (score >= 90) return "bg-success-500";
    if (score >= 70) return "bg-primary-500";
    if (score >= 50) return "bg-warning-500";
    return "bg-destructive";
  };

  // Handle export PDF (placeholder)
  const handleExportPDF = () => {
    alert("Export to PDF functionality would be implemented here");
  };

  // Handle share report (placeholder)
  const handleShareReport = () => {
    const shareUrl = `${window.location.origin}/report?url=${encodeURIComponent(report.url)}`;

    if (navigator.share) {
      navigator.share({
        title: `Accessibility Report for ${report.url}`,
        text: `Check out this accessibility report for ${report.url}`,
        url: shareUrl
      }).catch(err => {
        console.error('Share failed:', err);
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert("Report URL copied to clipboard!");
        })
        .catch(err => {
          console.error('Copy failed:', err);
        });
    }
  };

  return (
    <section className="max-w-5xl mx-auto mb-12 w-full px-4">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Accessibility Report</h2>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">{report.url}</span>
              <span className="text-sm ml-2 text-gray-500">{formattedDate}</span>
            </p>
          </div>

          <div className="flex mt-4 md:mt-0">
            <Button
              variant="outline"
              className="mr-3"
              onClick={handleExportPDF}
            >
              <File className="h-4 w-4 mr-2" />
              Export PDF
            </Button>

            <Button
              variant="outline"
              onClick={handleShareReport}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Overall score */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Overall Accessibility Score</h3>

            <div className="relative w-48 h-48 mb-4">
              <svg className="w-full h-full" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#E5E7EB" strokeWidth="12"/>
                <circle
                  ref={circleRef}
                  className="progress-ring__circle"
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray="400"
                  strokeDashoffset="400"
                  className={getScoreColor(report.overallScore)}
                />
                <text
                  x="80"
                  y="85"
                  textAnchor="middle"
                  fontSize="32"
                  fontWeight="bold"
                  fill="currentColor"
                  className={getScoreColor(report.overallScore)}
                >
                  {report.overallScore}%
                </text>
              </svg>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Your site is <span className="font-medium">{getScoreDescription(report.overallScore)}</span>
              </p>
              <div className="flex items-center justify-center">
                <span className="inline-block w-3 h-3 rounded-full bg-warning-500 mr-2"></span>
                <span className="text-sm text-gray-700">{issuesCount} issues to fix</span>
              </div>
            </div>
          </div>

          {/* Category scores */}
          <div className="flex-1 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h3>

            <div className="space-y-4">
              {/* Screen Reader */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Screen Reader Compatibility</span>
                  <span className="text-sm font-medium text-gray-900">{report.screenReaderScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryScoreColor(report.screenReaderScore)}`}
                    style={{ width: `${report.screenReaderScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Keyboard Navigation */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Keyboard Navigation</span>
                  <span className="text-sm font-medium text-gray-900">{report.keyboardScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryScoreColor(report.keyboardScore)}`}
                    style={{ width: `${report.keyboardScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Color Contrast */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Color Contrast</span>
                  <span className="text-sm font-medium text-gray-900">{report.contrastScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryScoreColor(report.contrastScore)}`}
                    style={{ width: `${report.contrastScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Text Sizing */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Text Size & Resizing</span>
                  <span className="text-sm font-medium text-gray-900">{report.textSizeScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryScoreColor(report.textSizeScore)}`}
                    style={{ width: `${report.textSizeScore}%` }}
                  ></div>
                </div>
              </div>

              {/* ARIA & Semantics */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">ARIA & Semantics</span>
                  <span className="text-sm font-medium text-gray-900">{report.ariaScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryScoreColor(report.ariaScore)}`}
                    style={{ width: `${report.ariaScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
