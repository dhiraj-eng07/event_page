# ACM PCCOER Events Section

A modern, redesigned events section for the ACM PCCOER website featuring a clean light blue theme, featured event highlighting, and separated past events functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download this project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd acm-pccoer-events-section
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

5. **Open your browser** and navigate to the URL shown in your terminal (typically `http://localhost:5173`)

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## 📂 Project Structure

```
├── App.tsx                    # Main application component
├── components/
│   ├── EventsSection.tsx      # Main events display
│   ├── PastEventsSection.tsx  # Past events page
│   ├── EventCard.tsx          # Individual event cards
│   ├── FeaturedEventCard.tsx  # Featured upcoming event
│   └── ui/                    # Shadcn/ui components
├── integration/               # Integration files for existing websites
├── styles/
│   └── globals.css           # Global styles with Tailwind CSS v4
└── package.json              # Project dependencies
```

## 🎨 Features

- **Modern Design**: Clean, professional appearance with light blue theme
- **Featured Events**: Highlighted upcoming events at the top
- **Past Events**: Separate section for completed events
- **Responsive**: Works on all device sizes
- **Accessible**: Built with accessibility best practices
- **Type Safe**: Full TypeScript support

## 🔧 Integration

To integrate this into your existing ACM PCCOER website, check the files in the `/integration` folder:

- `INTEGRATION_GUIDE.md` - Detailed integration instructions
- `EmbeddableEventsSection.tsx` - Standalone component for embedding
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
- `css-only/events-section.html` - CSS-only version if needed

## 🚀 Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Or integrate the components into your existing website

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to submit issues and enhancement requests for the ACM PCCOER events section!