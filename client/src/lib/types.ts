// Types for the application
export interface Issue {
  id: string;
  name: string;
  description: string;
  category: 'screenReader' | 'keyboard' | 'contrast' | 'textSize' | 'aria';
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  elements: Array<{
    html: string;
    location?: string;
  }>;
  howToFix: string;
  code?: string;
  fixCode?: string;
}

export interface TestResult {
  id: string;
  name: string;
  description: string;
  category: 'screenReader' | 'keyboard' | 'contrast' | 'textSize' | 'aria';
  status: 'passed' | 'failed' | 'partial' | 'inapplicable';
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  text: string;
}

export interface AccessibilityReportResponse {
  url: string;
  date: string;
  overallScore: number;
  screenReaderScore: number;
  keyboardScore: number;
  contrastScore: number;
  textSizeScore: number;
  ariaScore: number;
  issues: Issue[];
  passedTests: TestResult[];
  allTests: TestResult[];
  recommendations: Recommendation[];
}
