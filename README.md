# Accessibility Auditor

A frontend-only web application for analyzing website accessibility. This tool helps identify accessibility issues on websites and provides recommendations for improvement.

## Features

- Analyze any website for accessibility issues
- Get detailed reports on accessibility problems
- View recommendations for improving accessibility
- See scores for different accessibility categories (screen reader compatibility, keyboard navigation, etc.)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/accessibility-auditor.git
cd accessibility-auditor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

- `client/src/` - Frontend source code
  - `components/` - React components
  - `lib/` - Utility functions and mock data
  - `pages/` - Page components
  - `hooks/` - Custom React hooks

## How It Works

This application is a frontend-only tool that simulates accessibility testing. In a real-world scenario, you would typically connect this to a backend service that performs actual accessibility testing using tools like axe-core.

The current implementation uses mock data to demonstrate the UI and functionality.

## Technologies Used

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- Wouter (for routing)
- Radix UI (for accessible UI components)
- Lucide React (for icons)

## License

MIT
