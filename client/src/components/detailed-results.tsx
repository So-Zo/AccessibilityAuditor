import React, { useState } from "react";
import { AccessibilityReportResponse, Issue, TestResult } from "@/lib/types";
import {
  AlertCircle,
  ChevronDown,
  AudioWaveform,
  Keyboard,
  Droplets,
  ALargeSmall,
  Brackets,
  CheckSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailedResultsProps {
  report: AccessibilityReportResponse;
}

export function DetailedResults({ report }: DetailedResultsProps) {
  const [activeTab, setActiveTab] = useState<'issues' | 'passed' | 'all'>('issues');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'screenReader':
        return <AudioWaveform className="h-4 w-4 mr-2" />;
      case 'keyboard':
        return <Keyboard className="h-4 w-4 mr-2" />;
      case 'contrast':
        return <Droplets className="h-4 w-4 mr-2" />;
      case 'textSize':
        return <ALargeSmall className="h-4 w-4 mr-2" />;
      case 'aria':
        return <Brackets className="h-4 w-4 mr-2" />;
      default:
        return <CheckSquare className="h-4 w-4 mr-2" />;
    }
  };

  // Get category display name
  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'screenReader':
        return 'Screen Reader';
      case 'keyboard':
        return 'Keyboard';
      case 'contrast':
        return 'Contrast';
      case 'textSize':
        return 'Text Size';
      case 'aria':
        return 'ARIA';
      default:
        return category;
    }
  };

  // Get impact badge color
  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'critical':
        return 'bg-destructive-50 text-destructive-700';
      case 'serious':
        return 'bg-destructive-50 text-destructive-700';
      case 'moderate':
        return 'bg-warning-50 text-warning-700';
      case 'minor':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'passed':
        return 'bg-success-50 text-success-700';
      case 'failed':
        return 'bg-destructive-50 text-destructive-700';
      case 'partial':
        return 'bg-warning-50 text-warning-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter issues by category
  const filteredIssues = selectedCategory === 'all'
    ? report.issues
    : report.issues.filter(issue => issue.category === selectedCategory);

  // Issue accordion component
  const IssueAccordion = ({ issue }: { issue: Issue }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-destructive-50 text-destructive-500">
                <AlertCircle className="h-5 w-5" />
              </span>
            </div>
            <div className="ml-4 text-left">
              <h4 className="text-base font-medium text-gray-900">{issue.name}</h4>
              <p className="mt-1 text-sm text-gray-600">{issue.description}</p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(issue.impact)}`}>
              {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)}
            </span>
            <ChevronDown className={`ml-2 h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-800">
              <h5 className="font-medium mb-2">Problem</h5>
              <p className="mb-4">{issue.description}</p>

              <h5 className="font-medium mb-2">Affected Elements</h5>
              <div className="bg-white rounded-md border border-gray-200 p-3 mb-4 overflow-x-auto">
                <ul className="list-disc pl-5 space-y-2">
                  {issue.elements.map((element, idx) => (
                    <li key={idx}>
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{element.html}</code>
                      {element.location && ` - ${element.location}`}
                    </li>
                  ))}
                </ul>
              </div>

              <h5 className="font-medium mb-2">How to Fix</h5>
              <p className="mb-3">{issue.howToFix}</p>

              {issue.fixCode && (
                <div className="bg-success-50 rounded-md border border-success-200 p-3">
                  <code className="text-xs text-success-800">{issue.fixCode}</code>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="max-w-5xl mx-auto mb-12 w-full px-4">
      {/* Tabs navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Report sections">
          <button
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm mr-8",
              activeTab === 'issues'
                ? "text-primary-600 border-primary-500"
                : "text-gray-500 hover:text-gray-700 border-transparent"
            )}
            onClick={() => setActiveTab('issues')}
            aria-selected={activeTab === 'issues'}
            aria-controls="panel-issues"
          >
            Issues to Fix
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-warning-50 text-warning-600">
              {report.issues.length}
            </span>
          </button>

          <button
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm mr-8",
              activeTab === 'passed'
                ? "text-primary-600 border-primary-500"
                : "text-gray-500 hover:text-gray-700 border-transparent"
            )}
            onClick={() => setActiveTab('passed')}
            aria-selected={activeTab === 'passed'}
            aria-controls="panel-passed"
          >
            Passed Tests
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-success-50 text-success-600">
              {report.passedTests.length}
            </span>
          </button>

          <button
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm",
              activeTab === 'all'
                ? "text-primary-600 border-primary-500"
                : "text-gray-500 hover:text-gray-700 border-transparent"
            )}
            onClick={() => setActiveTab('all')}
            aria-selected={activeTab === 'all'}
            aria-controls="panel-all"
          >
            All Results
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100 text-gray-600">
              {report.allTests.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Issues panel */}
      <div id="panel-issues" role="tabpanel" aria-labelledby="tab-issues" hidden={activeTab !== 'issues'}>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">Issues to Fix</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Filter by:</span>
              <select
                className="text-sm border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="screenReader">Screen Reader</option>
                <option value="keyboard">Keyboard Navigation</option>
                <option value="contrast">Color Contrast</option>
                <option value="textSize">Text Sizing</option>
                <option value="aria">ARIA & Semantics</option>
              </select>
            </div>
          </div>

          {/* Issues Accordion */}
          <div className="space-y-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <IssueAccordion key={issue.id} issue={issue} />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">
                No issues found in this category. Great job!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Passed Tests panel */}
      <div id="panel-passed" role="tabpanel" aria-labelledby="tab-passed" hidden={activeTab !== 'passed'}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Passed Accessibility Tests</h3>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600 mb-6">Your website successfully passed the following accessibility tests:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Group tests by category */}
              {['screenReader', 'keyboard', 'contrast', 'textSize', 'aria'].map(category => {
                const categoryTests = report.passedTests.filter(test => test.category === category);

                if (categoryTests.length === 0) return null;

                return (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center text-gray-900">
                      {getCategoryIcon(category)}
                      {getCategoryName(category)}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {categoryTests.slice(0, 3).map(test => (
                        <li key={test.id} className="flex items-start">
                          <CheckSquare className="text-success-500 h-4 w-4 mt-0.5 mr-2" />
                          <span>{test.name}</span>
                        </li>
                      ))}
                      {categoryTests.length > 3 && (
                        <li className="text-primary-600 text-xs mt-1">
                          +{categoryTests.length - 3} more tests passed in this category
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* All Results panel */}
      <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden={activeTab !== 'all'}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Complete Accessibility Results</h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="px-6 py-4 flex items-center">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Test Name</h4>
                </div>
                <div className="w-32 text-center">
                  <h4 className="font-medium text-gray-900">Category</h4>
                </div>
                <div className="w-24 text-center">
                  <h4 className="font-medium text-gray-900">Status</h4>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {report.allTests.map((test: TestResult) => (
                <div key={test.id} className="px-6 py-4 flex items-center hover:bg-gray-50">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900">{test.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">{test.description}</p>
                  </div>
                  <div className="w-32 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {getCategoryName(test.category)}
                    </span>
                  </div>
                  <div className="w-24 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status === 'passed' ? (
                        <CheckSquare className="h-3 w-3 mr-1" />
                      ) : test.status === 'failed' ? (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
