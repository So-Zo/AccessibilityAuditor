import { v4 as uuidv4 } from 'uuid';

// Define types for our mock data
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

// Mock data generator
export const generateMockReport = (url: string): AccessibilityReportResponse => {
  // Generate some mock issues
  const issues: Issue[] = [
    {
      id: uuidv4(),
      name: 'Images must have alternate text',
      description: 'Images must have an alt attribute that describes the purpose of the image.',
      category: 'screenReader',
      impact: 'serious',
      elements: [
        {
          html: '<img src="logo.png">',
          location: 'header'
        }
      ],
      howToFix: 'Add an alt attribute to the image tag that describes the purpose of the image.'
    },
    {
      id: uuidv4(),
      name: 'Buttons must have accessible names',
      description: 'Buttons must have text that describes their purpose.',
      category: 'screenReader',
      impact: 'critical',
      elements: [
        {
          html: '<button></button>',
          location: 'navigation'
        }
      ],
      howToFix: 'Add text content to the button or use aria-label to provide an accessible name.'
    },
    {
      id: uuidv4(),
      name: 'Color contrast must be sufficient',
      description: 'Text must have sufficient contrast with its background.',
      category: 'contrast',
      impact: 'serious',
      elements: [
        {
          html: '<p style="color: #999; background-color: #eee;">Low contrast text</p>',
          location: 'main content'
        }
      ],
      howToFix: 'Increase the contrast between the text and background colors.'
    }
  ];

  // Generate some mock passed tests
  const passedTests: TestResult[] = [
    {
      id: uuidv4(),
      name: 'Document must have a title',
      description: 'The document must have a title that describes its topic or purpose.',
      category: 'screenReader',
      status: 'passed'
    },
    {
      id: uuidv4(),
      name: 'Page must contain a level-one heading',
      description: 'The page must contain at least one level-one heading.',
      category: 'screenReader',
      status: 'passed'
    },
    {
      id: uuidv4(),
      name: 'Links must have discernible text',
      description: 'Links must have text that describes their purpose.',
      category: 'screenReader',
      status: 'passed'
    },
    {
      id: uuidv4(),
      name: 'Form elements must have labels',
      description: 'Form elements must have labels that describe their purpose.',
      category: 'screenReader',
      status: 'passed'
    }
  ];

  // Combine passed and failed tests
  const allTests: TestResult[] = [
    ...passedTests,
    {
      id: issues[0].id,
      name: issues[0].name,
      description: issues[0].description,
      category: issues[0].category,
      status: 'failed'
    },
    {
      id: issues[1].id,
      name: issues[1].name,
      description: issues[1].description,
      category: issues[1].category,
      status: 'failed'
    },
    {
      id: issues[2].id,
      name: issues[2].name,
      description: issues[2].description,
      category: issues[2].category,
      status: 'failed'
    }
  ];

  // Generate recommendations
  const recommendations: Recommendation[] = [
    {
      id: uuidv4(),
      priority: 'high',
      text: 'Add alt text to all images'
    },
    {
      id: uuidv4(),
      priority: 'high',
      text: 'Ensure all buttons have accessible names'
    },
    {
      id: uuidv4(),
      priority: 'medium',
      text: 'Improve color contrast for text elements'
    }
  ];

  // Calculate mock scores
  const passedCount = passedTests.length;
  const totalCount = allTests.length;
  const overallScore = Math.round((passedCount / totalCount) * 100);

  // Category-specific scores
  const screenReaderTests = allTests.filter(test => test.category === 'screenReader');
  const screenReaderPassed = screenReaderTests.filter(test => test.status === 'passed').length;
  const screenReaderScore = Math.round((screenReaderPassed / screenReaderTests.length) * 100);

  const keyboardTests = allTests.filter(test => test.category === 'keyboard');
  const keyboardScore = keyboardTests.length > 0 
    ? Math.round((keyboardTests.filter(test => test.status === 'passed').length / keyboardTests.length) * 100)
    : 100;

  const contrastTests = allTests.filter(test => test.category === 'contrast');
  const contrastScore = contrastTests.length > 0
    ? Math.round((contrastTests.filter(test => test.status === 'passed').length / contrastTests.length) * 100)
    : 100;

  const textSizeTests = allTests.filter(test => test.category === 'textSize');
  const textSizeScore = textSizeTests.length > 0
    ? Math.round((textSizeTests.filter(test => test.status === 'passed').length / textSizeTests.length) * 100)
    : 100;

  const ariaTests = allTests.filter(test => test.category === 'aria');
  const ariaScore = ariaTests.length > 0
    ? Math.round((ariaTests.filter(test => test.status === 'passed').length / ariaTests.length) * 100)
    : 100;

  return {
    url,
    date: new Date().toISOString(),
    overallScore,
    screenReaderScore,
    keyboardScore,
    contrastScore,
    textSizeScore,
    ariaScore,
    issues,
    passedTests,
    allTests,
    recommendations
  };
};

// Mock API function to replace the fetch call
export const mockCheckUrl = async (url: string): Promise<AccessibilityReportResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return generateMockReport(url);
};
