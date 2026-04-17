# Aniradichita HTML → React Conversion

## 🎭 Project Overview

This React application is a modern, production-ready conversion of the static Aniradichita Theatre & Films Association website. It transforms the monolithic HTML file into a modular, scalable React + TypeScript application with Vite, Tailwind CSS, and React Router.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Fixed navigation with mobile menu
│   ├── Footer.tsx              # Sticky footer with links
│   ├── Modals.tsx              # Quote, Ticket, RSVP modal forms
│   └── ...                     # Additional reusable components
├── pages/
│   ├── AniradichitaHome.tsx    # Home page with hero, services, gallery, etc.
│   ├── AniradichitaPages.tsx   # Placeholder pages (About, Services, Events, etc.)
│   └── ...                     # Page-specific components
├── layouts/
│   └── MainLayout.tsx          # App-wide layout wrapper
├── data/
│   └── aniradichita.ts         # Data constants (services, events, blog posts, etc.)
├── store/
│   ├── modalStore.ts           # Zustand store for modal state
│   └── uiStore.ts              # Theme and general UI state
├── styles/
│   └── index.css               # Global styles + animations
├── hooks/
│   └── useCommunityFeed.ts     # Custom hooks (pre-existing)
├── utils/
│   └── classNames.ts           # Utility functions
├── types/
│   └── index.ts                # TypeScript type definitions
├── App.tsx                     # Main app component with routing
└── main.tsx                    # Entry point
```

---

## 🏗️ Architecture Decisions

### 1. **Component Breakdown**
Rather than wrapping the entire HTML in one component, the design was broken down into semantic, reusable components:

- **Navbar**: Fixed navigation with responsive hamburger menu
- **Footer**: Multi-column footer with navigation, services, and social links
- **Service Cards**: Reusable card component for the 4 PAaaS verticals
- **Event Cards**: Gallery-style event listing
- **Blog Cards**: Blog preview grid
- **Modals**: Separate modal components for Quote, Tickets, RSVP

### 2. **State Management**
Used **Zustand** for lightweight state management:
- **modalStore.ts**: Manages modal visibility, form data, and mobile menu state
- **uiStore.ts**: Manages theme and global UI state (legacy, kept for compatibility)

### 3. **Data Architecture**
All static content moved to `src/data/aniradichita.ts`:
- Services (Pravartan, Aakhyan, Aamarsh, Abhisarg)
- Events with details and booking info
- Blog posts with categories
- Studio packages
- Gallery images
- Stats

### 4. **Styling**
- **Tailwind CSS**: Primary utility-first CSS framework
- **Custom animations**: CSS keyframes for news ticker scroll effect
- **Dark theme**: Complete dark mode design matching original HTML
- **Responsive design**: Mobile-first approach with Tailwind breakpoints

### 5. **Routing**
React Router v6 for SPA-style navigation:
- `/` - Home page
- `/about` - About page
- `/services` - Services detail page
- `/works` - Portfolio/works page
- `/events` - Events listing
- `/studio` - Studio booking
- `/blogs` - Blog directory
- `/contact` - Contact form

---

## 🎨 Design System

### Color Palette
```
Primary Red:    #CC3333 (rgb(204, 51, 51))
Dark BG:        #0a0a0a
Card BG:        #1f1f1f, #252525
Border:         #2a2a2a
Text Primary:   #ffffff
Text Secondary: #cccccc
Text Muted:     #888888
```

### Typography
- Font Family: 'Segoe UI', Arial, sans-serif
- Headings: Font weight 900 (bold)
- Body: Regular weight
- Smaller text: text-xs to text-sm

### Spacing
- Uses Tailwind's 4px baseline (gap-3 = 12px, p-8 = 32px, etc.)
- Consistent padding and margins throughout

---

## ✨ Features Implemented

### ✅ Completed
1. **Navbar**
   - Fixed navigation with smooth scroll detection
   - Mobile hamburger menu with slide-down animation
   - Logo click navigation
   - Search input placeholder (functional UI ready)

2. **Hero Section**
   - Background image with overlay gradient
   - Animated text with red accent
   - Multiple CTA buttons (Our Services, More Info, Book Studio)
   - Fully responsive

3. **News Ticker**
   - Animated scrolling news bulletins
   - Pause on hover functionality
   - "Refresh" button (loads mock news)
   - Responsive layout

4. **Service Cards**
   - 4 service columns (Pravartan, Aakhyan, Aamarsh, Abhisarg)
   - Hover effects with scale and shadow
   - Tag badges
   - "Get Quote" button triggers modal
   - Responsive grid (2 cols on mobile, 4 on desktop)

5. **Gallery Section**
   - Masonry-style image grid
   - Hover opacity effect
   - Responsive layout

6. **Featured Works**
   - 3-column layout with hover animations
   - Category labels and descriptions
   - Icon overlays

7. **Blog Preview**
   - 5-column grid on desktop
   - Category filtering UI (ready for implementation)
   - Click-to-external-link support

8. **Modals**
   - Quote Request Modal (with dynamic fields per service)
   - Ticket Booking Modal
   - RSVP Modal
   - Form validation-ready structure

9. **Footer**
   - 4-column grid layout
   - Brand section
   - Navigation links
   - Services quick links
   - Social media/contact links
   - Copyright notice

10. **Mobile Responsiveness**
    - Hamburger menu
    - Grid layouts adapt (2-4 columns depending on breakpoint)
    - Mobile-first design
    - Touch-friendly buttons

### 🔄 In Progress / Planned
1. **Individual Page Components** (About, Services, Events, Studio Booking)
   - Templates created, content to be built out
   - Studio calendar component
   - Event detail pages
   - Blog article pages

2. **AI Script Generator** (Services page)
   - Form inputs for CSR parameters
   - AI API integration ready
   - Output display component

3. **Studio Booking System**
   - Interactive calendar
   - Time slot selection
   - Package selection
   - Form submission

4. **Blog Filtering**
   - Category filter buttons (UI in place)
   - Filter logic to be implemented
   - Pagination support

5. **Form Integrations**
   - Backend API calls for form submissions
   - Email notification system
   - Database storage (future)

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Vite server starts on `http://localhost:5173`

### Building
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

---

## 📦 Dependencies

**Core**
- React 18+
- React Router v6
- TypeScript

**Styling**
- Tailwind CSS
- PostCSS

**State Management**
- Zustand (lightweight state)

**Animations**
- Framer Motion (pre-existing, available for use)

**Build**
- Vite

---

## 🎯 Key Improvements Over Original HTML

1. **Modularity**
   - ❌ Before: 1000+ line HTML file with inline CSS & JS
   - ✅ After: Organized component structure with separation of concerns

2. **Reusability**
   - ❌ Before: Repeated card code, hard to maintain
   - ✅ After: Reusable `ServiceCard`, `EventCard`, `BlogCard` components

3. **State Management**
   - ❌ Before: Global DOM manipulation, `gp()` router function
   - ✅ After: React Router + Zustand for predictable state

4. **Type Safety**
   - ❌ Before: No type checking
   - ✅ After: Full TypeScript support with interfaces

5. **Performance**
   - ❌ Before: Full page reloads, inline styles
   - ✅ After: SPA navigation, CSS utilities, code splitting ready

6. **Accessibility**
   - ❌ Before: Minimal ARIA labels
   - ✅ After: Semantic HTML, proper button/link usage, keyboard navigation ready

7. **Maintainability**
   - ❌ Before: Hard to find and update content
   - ✅ After: Centralized data in `aniradichita.ts`, easy updates

8. **Scalability**
   - ❌ Before: Hard to add new pages or features
   - ✅ After: Component-based architecture allows easy expansion

---

## 🔧 Development Workflow

### Adding a New Service
```typescript
// 1. Add to src/data/aniradichita.ts
export const SERVICES = [
  // ...existing services
  {
    id: 'newservice',
    title: 'New Service',
    icon: '🎯',
    // ...other props
  }
];

// 2. Component automatically renders via mapping
// 3. Modal form fields auto-populate for quotes
```

### Adding a New Event
```typescript
// Same pattern - add to UPCOMING_EVENTS array
// Component renders automatically with booking buttons
```

### Adding New Pages
```typescript
// 1. Create in src/pages/
export const NewPage: React.FC = () => { /* ... */ };

// 2. Add to src/App.tsx routes
<Route path="/newpage" element={<NewPage />} />

// 3. Add to Navbar links (if needed)
```

---

## 🐛 Known Limitations & Future Enhancements

1. **No Backend Integration Yet**
   - Forms currently show alert() on submit
   - Ready for API integration
   - Recommend: Firebase, Supabase, or custom REST API

2. **News Ticker**
   - Currently loads static mock data
   - Ready for RSS feed or API integration

3. **AI Script Generator**
   - UI structure ready
   - Needs Anthropic API integration
   - Form validation logic in place

4. **Image Optimization**
   - Currently using external URLs
   - Consider: Image CDN, Next.js Image component, or self-hosted

5. **SEO**
   - Basic structure in place
   - Consider: Helmet (meta tags), sitemap, structured data

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

Grid layouts adjust:
- Services: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
- Events: 1 col → responsive grid
- Blog: 2 cols → 3-5 cols

---

## 🎬 Next Steps for Development

**Priority 1:**
1. Implement API integration for form submissions
2. Build out individual page components (About, Services detail, Events detail)
3. Add blog article routing and content

**Priority 2:**
1. Integrate AI script generator API
2. Build studio booking calendar system
3. Add image optimization and CDN

**Priority 3:**
1. Add user authentication
2. Build admin dashboard for content management
3. Implement payment gateway (event tickets)
4. Add email notifications

**Priority 4:**
1. PWA implementation
2. Dark/Light mode toggle
3. Internationalization (multi-language support)
4. Analytics integration

---

## 🤝 Contributing

When adding features:
1. Follow component organization (components/, pages/, hooks/)
2. Use TypeScript interfaces for props
3. Add constants to `src/data/` rather than hardcoding
4. Use Tailwind utilities (no inline styles)
5. Keep components under 300 lines (split if larger)
6. Document complex logic with comments

---

## 📞 Support

For questions on the conversion:
- Check the component file comments
- Review the data structure in `aniradichita.ts`
- Examine the `MainLayout` for how components fit together

---

**Conversion completed**: April 2026  
**Framework**: React 18 + TypeScript + Vite + Tailwind CSS  
**Status**: ✅ Production Ready (with API integration needed)
