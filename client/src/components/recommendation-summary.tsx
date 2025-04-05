import React from "react";
import { AccessibilityReportResponse, Recommendation } from "@shared/schema";
import { 
  FileText, 
  BookOpen, 
  Drill, 
  ExternalLink 
} from "lucide-react";

interface RecommendationSummaryProps {
  report: AccessibilityReportResponse;
}

export function RecommendationSummary({ report }: RecommendationSummaryProps) {
  // Filter recommendations by priority
  const highPriorityRecs = report.recommendations.filter(rec => rec.priority === 'high');
  const mediumPriorityRecs = report.recommendations.filter(rec => rec.priority === 'medium');
  const lowPriorityRecs = report.recommendations.filter(rec => rec.priority === 'low');
  
  return (
    <section className="max-w-5xl mx-auto mb-12 w-full px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Recommendations Summary</h3>
        <p className="text-gray-600 mb-6">
          Here are the key actions we recommend to improve your website's accessibility:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* High Priority Recommendations */}
          {highPriorityRecs.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h4 className="font-medium text-lg mb-3 text-gray-900">High Priority</h4>
              <ul className="space-y-3">
                {highPriorityRecs.slice(0, 3).map((rec, index) => (
                  <li key={rec.id} className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-destructive-50 text-destructive-700 text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rec.text}</span>
                  </li>
                ))}
                {highPriorityRecs.length > 3 && (
                  <li className="text-sm text-primary-600 ml-9">
                    +{highPriorityRecs.length - 3} more high priority recommendations
                  </li>
                )}
              </ul>
            </div>
          )}
          
          {/* Medium Priority Recommendations */}
          {mediumPriorityRecs.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h4 className="font-medium text-lg mb-3 text-gray-900">Medium Priority</h4>
              <ul className="space-y-3">
                {mediumPriorityRecs.slice(0, 3).map((rec, index) => (
                  <li key={rec.id} className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-warning-50 text-warning-700 text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rec.text}</span>
                  </li>
                ))}
                {mediumPriorityRecs.length > 3 && (
                  <li className="text-sm text-primary-600 ml-9">
                    +{mediumPriorityRecs.length - 3} more medium priority recommendations
                  </li>
                )}
              </ul>
            </div>
          )}
          
          {/* Low Priority Recommendations - show only if no high/medium recommendations or if they exist */}
          {(lowPriorityRecs.length > 0 && (highPriorityRecs.length === 0 || mediumPriorityRecs.length === 0)) && (
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h4 className="font-medium text-lg mb-3 text-gray-900">Low Priority</h4>
              <ul className="space-y-3">
                {lowPriorityRecs.slice(0, 3).map((rec, index) => (
                  <li key={rec.id} className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rec.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <h4 className="font-medium text-lg mb-4 text-gray-900">Resources</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary-500" />
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h5 className="text-base font-medium text-gray-900">WCAG Guidelines</h5>
                    <ExternalLink className="h-3 w-3 ml-1 text-gray-500" />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">Web Content Accessibility Guidelines reference</p>
                </div>
              </div>
            </a>
            
            <a 
              href="https://webaim.org/techniques/alttext/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary-500" />
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h5 className="text-base font-medium text-gray-900">Alt Text Guide</h5>
                    <ExternalLink className="h-3 w-3 ml-1 text-gray-500" />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">How to write effective alternative text</p>
                </div>
              </div>
            </a>
            
            <a 
              href="https://www.w3.org/WAI/ER/tools/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Drill className="h-6 w-6 text-primary-500" />
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h5 className="text-base font-medium text-gray-900">Tools & Resources</h5>
                    <ExternalLink className="h-3 w-3 ml-1 text-gray-500" />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">Recommended accessibility testing tools</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
