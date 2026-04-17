# Aniradichita Theatre & Films Association Website

A modern, responsive React + TypeScript website for Aniradichita Theatre & Films Association, featuring interactive modals for quotes, tickets, and RSVPs, with a focus on theatre productions, film services, and community engagement.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Modals**: Quote requests, ticket booking, and RSVP forms
- **Multi-page Navigation**: Home, Community, Members, Casting, Rituals, and Profile pages
- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for lightweight, scalable state handling
- **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Animations**: Framer Motion

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aniradichita-theatre-website.git
   cd aniradichita-theatre-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── layouts/       # Layout components
├── store/         # Zustand state stores
├── data/          # Static data and constants
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── styles/        # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
