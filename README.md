# Minimal Pricing (Web)

Minimal Pricing is a web-based application designed to help users calculate costs, margins, and profits for their projects efficiently. This repository is public to allow anyone interested to review the codebase and understand the project's structure and implementation. It is not intended for forks or external contributions.

## Features

- **Dynamic Project Pricing**: Calculate pricing based on materials, labor, and additional costs
- **Task Management**: Organize tasks into sections for materials, labor fees, and additional expenses
- **PDF Generation**: Generate detailed quotes for yourself and customer-ready PDFs
- **Profit Calculator**: Calculate profit margins and view comprehensive project overviews
- **User Management**: Manage user accounts and customer information
- **Responsive Design**: Optimized for mobile to ultra-wide screens
- **Dark Mode**: Toggle between light and dark themes
- **Data Privacy**: All data stays in browser session storage and disappears when you close the tab

## Tech Stack

Minimal Pricing is built using the following technologies:

- **Language**: TypeScript
- **Frontend Framework**: Next.js (built on React)
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **PDF Generation**: React-PDF
- **Data Persistence**: Browser Session Storage
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React & Heroicons
- **Form Handling**: React Number Format
- **Payment Processing**: Stripe
- **Analytics**: Vercel Analytics & Speed Insights
- **Hosting**: Vercel
- **Syntax Checking**: ESLint & Prettier

## Project Structure

The project is organized as follows:

```plaintext
src/
  app/                # Next.js app router pages and API routes
  components/         # Reusable UI components
  context/            # React context providers
  data/               # Sample data and project data
  hooks/              # Custom React hooks
  lib/                # Utility libraries
  styles/             # Global CSS styles
  types/              # TypeScript type definitions
```

## Pages

### Main Pages

- **Home**: `/` - Welcome page with project overview
- **Tasks**: `/tasks` - Task management and pricing calculations
- **Overview**: `/overview` - Project overview and summary
- **Profit**: `/profit` - Profit calculator and margin analysis
- **Users**: `/users` - User and customer management

### API Routes

- **Sitemap**: `/api/sitemap` - Dynamic sitemap generation
- **Support**: `/api/support` - Support form handling

## Components

### Core Components

- `NavBar`: Navigation bar with theme switcher
- `ThemeSwitcher`: Dark/light mode toggle
- `LoadingSkeleton`: Loading states for better UX
- `BuyMeCoffeeModal`: Support modal for donations

### Task Components

- `Materials`: Material cost management
- `Labors`: Labor cost tracking
- `Additional`: Additional expense handling
- `AddItemButton`: Add new items to categories

### Profit Components

- `ProfitCalculator`: Calculate and display profit margins

### PDF Components

- `PDFDocument`: Generate PDF documents for customers and providers
- `PDFDownloadButton`: Download PDF functionality

## Local Run

To run the project locally:

```bash
npm install
npm run dev

# Development with Turbopack
npm run dev

# Build for production
npm run build
npm start

# Lint and format code
npm run lint
npm run format
```

## Screenshots

Take the following screenshots for documentation:

1. **Home Page**: Welcome screen with project overview
2. **Tasks Page**: Task management with materials, labor, and additional costs
3. **Overview Page**: Project summary and totals
4. **Profit Page**: Profit calculator and margin analysis
5. **Users Page**: User and customer management
6. **PDF Generation**: Sample PDF outputs for customers and providers

## License

This project is licensed under a Proprietary License.

### Terms

- The code in this repository is provided for viewing purposes only
- Copying, modifying, redistributing, or using the code in any form is strictly prohibited
- For inquiries or permissions, please contact the repository owner directly
