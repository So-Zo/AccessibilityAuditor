import { Issue, TestResult, Recommendation } from "@/lib/types";

// Define categories for accessibility tests
export type AccessibilityCategory = 'screenReader' | 'keyboard' | 'contrast' | 'textSize' | 'aria';

// Define impact levels
export type ImpactLevel = 'critical' | 'serious' | 'moderate' | 'minor';

// Define a map of axe-core rules to our categories
export const ruleToCategory: Record<string, AccessibilityCategory> = {
  // Screen reader related rules
  'image-alt': 'screenReader',
  'image-redundant-alt': 'screenReader',
  'input-image-alt': 'screenReader',
  'area-alt': 'screenReader',
  'server-side-image-map': 'screenReader',
  'duplicate-id': 'screenReader',
  'label': 'screenReader',
  'form-label': 'screenReader',
  'link-name': 'screenReader',
  'object-alt': 'screenReader',
  'dlitem': 'screenReader',
  'document-title': 'screenReader',
  'frame-title': 'screenReader',
  'heading-order': 'screenReader',
  'html-lang': 'screenReader',
  'html-lang-valid': 'screenReader',
  'meta-viewport': 'screenReader',
  'table-duplicate-name': 'screenReader',
  'table-fake-caption': 'screenReader',
  'td-has-header': 'screenReader',
  'th-has-data-cells': 'screenReader',

  // Keyboard navigation related rules
  'accesskeys': 'keyboard',
  'tabindex': 'keyboard',
  'focus-order-semantics': 'keyboard',
  'keyboard': 'keyboard',
  'bypass': 'keyboard',
  'region': 'keyboard',
  'skip-link': 'keyboard',

  // Color contrast related rules
  'color-contrast': 'contrast',
  'link-in-text-block': 'contrast',

  // Text size related rules
  'meta-viewport-large': 'textSize',
  'zoom-resize': 'textSize',
  'avoid-inline-spacing': 'textSize',

  // ARIA and semantics related rules
  'aria-allowed-attr': 'aria',
  'aria-hidden-body': 'aria',
  'aria-required-attr': 'aria',
  'aria-required-children': 'aria',
  'aria-required-parent': 'aria',
  'aria-roles': 'aria',
  'aria-valid-attr': 'aria',
  'aria-valid-attr-value': 'aria',
  'button-name': 'aria',
  'definition-list': 'aria',
  'list': 'aria',
  'listitem': 'aria',
  'marquee': 'aria',
  'nested-interactive': 'aria',
  'role-img-alt': 'aria',
  'scope-attr-valid': 'aria',
  'scrollable-region-focusable': 'aria',
  'valid-lang': 'aria',
  'video-caption': 'aria',
  'blink': 'aria',
  'deprecated-tag': 'aria',
  'landmark-banner-is-top-level': 'aria',
  'landmark-complementary-is-top-level': 'aria',
  'landmark-contentinfo-is-top-level': 'aria',
  'landmark-main-is-top-level': 'aria',
  'landmark-no-duplicate-banner': 'aria',
  'landmark-no-duplicate-contentinfo': 'aria',
  'landmark-no-duplicate-main': 'aria',
  'landmark-one-main': 'aria',
  'p-as-heading': 'aria',
  'page-has-heading-one': 'aria',
  'presentation-role-conflict': 'aria',
};

// Map impact levels from axe-core to our system
export const impactMap: Record<string, ImpactLevel> = {
  'critical': 'critical',
  'serious': 'serious',
  'moderate': 'moderate',
  'minor': 'minor',
};

// Get category display name
export function getCategoryDisplayName(category: AccessibilityCategory): string {
  switch (category) {
    case 'screenReader':
      return 'Screen Reader Compatibility';
    case 'keyboard':
      return 'Keyboard Navigation';
    case 'contrast':
      return 'Color Contrast';
    case 'textSize':
      return 'Text Size & Resizing';
    case 'aria':
      return 'ARIA & Semantics';
  }
}

// Generate recommendations based on issues
export function generateRecommendations(issues: Issue[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const seenIssueTypes = new Set<string>();

  // Group issues by impact and type
  const criticalIssues = issues.filter(i => i.impact === 'critical');
  const seriousIssues = issues.filter(i => i.impact === 'serious');
  const moderateIssues = issues.filter(i => i.impact === 'moderate');

  // Add recommendations for critical issues first
  for (const issue of criticalIssues) {
    // Avoid duplicate recommendations for the same issue type
    if (!seenIssueTypes.has(issue.name)) {
      recommendations.push({
        id: `rec-${issue.id}`,
        priority: 'high',
        text: `Fix ${issue.name} issues`
      });
      seenIssueTypes.add(issue.name);
    }
  }

  // Then add recommendations for serious issues
  for (const issue of seriousIssues) {
    if (!seenIssueTypes.has(issue.name)) {
      recommendations.push({
        id: `rec-${issue.id}`,
        priority: 'high',
        text: `Fix ${issue.name} issues`
      });
      seenIssueTypes.add(issue.name);
    }
  }

  // Then add recommendations for moderate issues
  for (const issue of moderateIssues) {
    if (!seenIssueTypes.has(issue.name)) {
      recommendations.push({
        id: `rec-${issue.id}`,
        priority: 'medium',
        text: `Fix ${issue.name} issues`
      });
      seenIssueTypes.add(issue.name);
    }
  }

  // Group similar recommendations by category
  const categoryRecommendations: Record<string, string[]> = {
    'screenReader': [],
    'keyboard': [],
    'contrast': [],
    'textSize': [],
    'aria': []
  };

  // Add generic recommendations based on issue categories
  for (const issue of issues) {
    if (issue.category === 'screenReader' && !categoryRecommendations.screenReader.includes('Add alt text to images')) {
      categoryRecommendations.screenReader.push('Add alt text to images');
    }
    if (issue.category === 'keyboard' && !categoryRecommendations.keyboard.includes('Improve keyboard navigation')) {
      categoryRecommendations.keyboard.push('Improve keyboard navigation');
    }
    if (issue.category === 'contrast' && !categoryRecommendations.contrast.includes('Increase color contrast for text')) {
      categoryRecommendations.contrast.push('Increase color contrast for text');
    }
    if (issue.category === 'textSize' && !categoryRecommendations.textSize.includes('Ensure text can be resized')) {
      categoryRecommendations.textSize.push('Ensure text can be resized');
    }
    if (issue.category === 'aria' && !categoryRecommendations.aria.includes('Add ARIA landmarks')) {
      categoryRecommendations.aria.push('Add ARIA landmarks');
    }
  }

  // Add category-specific recommendations
  Object.entries(categoryRecommendations).forEach(([category, recList]) => {
    recList.forEach(text => {
      if (!recommendations.some(r => r.text === text)) {
        recommendations.push({
          id: `rec-${category}-${text.replace(/\s+/g, '-').toLowerCase()}`,
          priority: recommendations.length < 3 ? 'high' : 'medium',
          text
        });
      }
    });
  });

  return recommendations;
}

// Calculate score based on test results
export function calculateScore(tests: TestResult[], category?: AccessibilityCategory): number {
  const filteredTests = category
    ? tests.filter(test => test.category === category)
    : tests;

  if (filteredTests.length === 0) {
    return 100; // Perfect score if no tests
  }

  const passedCount = filteredTests.filter(test => test.status === 'passed').length;
  return Math.round((passedCount / filteredTests.length) * 100);
}

// Get color class based on score
export function getScoreColorClass(score: number): string {
  if (score >= 90) return 'text-success-500';
  if (score >= 70) return 'text-primary-500';
  if (score >= 50) return 'text-warning-500';
  return 'text-destructive';
}
