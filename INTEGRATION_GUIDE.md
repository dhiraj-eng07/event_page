# ACM PCCOER Website Integration Guide

This guide will help you integrate the modern events section into your existing ACM PCCOER website at https://pccoer.acm.org/

## Integration Options

### Option 1: Replace Existing Events Section (Recommended)

This approach replaces your current events section with the new modern design while maintaining your existing website structure.

#### Steps:

1. **Copy React Components**
   - Copy the entire `/components` folder to your website's source code
   - Copy `/styles/globals.css` or merge the CSS variables with your existing styles
   - Copy `/integration/EmbeddableEventsSection.tsx`

2. **Update Your Main Website File**
   Replace your existing events section with:
   ```jsx
   import { EmbeddableEventsSection } from './integration/EmbeddableEventsSection';

   // In your main component/page
   <EmbeddableEventsSection 
     sectionId="events" 
     events={yourEventsData}
   />
   ```

3. **Configure Events Data**
   Update the events data in `EmbeddableEventsSection.tsx` with your actual events, or connect it to your CMS/database.

### Option 2: Create a Dedicated Events Page

Create a separate `/events` page for a full events experience.

#### Steps:

1. Create a new route/page for events
2. Use the existing `App.tsx` as your events page template
3. Add navigation from your main site to the new events page

### Option 3: Embed as an iframe (Quick Integration)

For the fastest integration without code changes:

1. Host this events section on a subdomain (e.g., `events.pccoer.acm.org`)
2. Embed it in your existing site using an iframe:
   ```html
   <iframe 
     src="https://events.pccoer.acm.org" 
     width="100%" 
     height="800px"
     frameborder="0">
   </iframe>
   ```

## Required Dependencies

If your website doesn't already have these, install:

```bash
npm install react @types/react
npm install lucide-react
npm install motion/react
npm install tailwindcss
```

## Styling Integration

### CSS Variables Integration

Add these CSS variables to your existing stylesheet to match the light blue theme:

```css
:root {
  --events-bg: #f0f9ff;
  --events-primary: #0369a1;
  --events-secondary: #e0f2fe;
  --events-accent: #bae6fd;
  --events-border: rgba(59, 130, 246, 0.15);
}
```

### Custom Styling

To match your existing website's design system:

1. **Colors**: Update the color scheme in the CSS variables
2. **Fonts**: Modify font families in the component files
3. **Spacing**: Adjust padding and margins to match your site's rhythm
4. **Border Radius**: Update `--radius` variable to match your design

## Data Integration

### Static Data
Replace the `sampleEvents` array in `EmbeddableEventsSection.tsx` with your actual events data.

### Dynamic Data (CMS/API)
Connect to your data source:

```jsx
import { useState, useEffect } from 'react';

function EmbeddableEventsSection() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Fetch from your API/CMS
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);
  
  // Rest of component...
}
```

### Event Data Structure

Ensure your events data matches this structure:

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Format: "January 15, 2025"
  time: string; // Format: "9:00 AM - 6:00 PM"
  location: string;
  category: "Workshop" | "Competition" | "Guidance" | "Celebration";
  status: "upcoming" | "ongoing" | "completed";
  image: string; // URL to event image
  attendees: number;
}
```

## Navigation Integration

### Update Your Navigation Menu

Add a smooth scroll to the events section:

```html
<a href="#events" class="nav-link">Events</a>
```

Or for a dedicated events page:

```html
<a href="/events" class="nav-link">Events</a>
```

### JavaScript Smooth Scrolling

```javascript
document.querySelector('a[href="#events"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#events').scrollIntoView({
    behavior: 'smooth'
  });
});
```

## SEO and Performance

### Meta Tags for Events Page

```html
<meta name="description" content="Explore exciting events, workshops, and competitions organized by ACM PCCOER. Join our community of learners and innovators.">
<meta property="og:title" content="Events - ACM PCCOER">
<meta property="og:description" content="Discover upcoming events and workshops by ACM PCCOER">
<meta property="og:image" content="/path/to/events-preview-image.jpg">
```

### Performance Optimization

1. **Lazy Loading**: Images are already optimized with the `ImageWithFallback` component
2. **Code Splitting**: Consider lazy loading the events section if it's not immediately visible
3. **Caching**: Implement caching for events data if fetching from an API

## Testing

1. **Responsiveness**: Test on mobile, tablet, and desktop
2. **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
3. **Performance**: Check loading times and smooth animations
4. **Accessibility**: Ensure keyboard navigation and screen reader compatibility

## Deployment

### Build Process

1. Ensure all dependencies are installed
2. Build your React components
3. Test the integration locally
4. Deploy to your hosting platform

### Environment Variables

If using dynamic data, set up environment variables:

```env
REACT_APP_API_URL=https://api.pccoer.acm.org
REACT_APP_EVENTS_ENDPOINT=/events
```

## Troubleshooting

### Common Issues

1. **Styling Conflicts**: CSS specificity issues - use more specific selectors
2. **JavaScript Errors**: Missing dependencies - check console for errors
3. **Layout Issues**: Conflicting CSS - use CSS modules or styled-components
4. **Image Loading**: Use absolute URLs for images or configure your bundler

### Support

For additional help:
1. Check browser console for errors
2. Validate your events data structure
3. Ensure all dependencies are correctly installed
4. Test components individually before full integration

---

## Example Integration

Here's a complete example of how to integrate into an existing React website:

```jsx
// YourMainWebsite.jsx
import { EmbeddableEventsSection } from './integration/EmbeddableEventsSection';

function MainWebsite() {
  return (
    <div>
      {/* Your existing header */}
      <header>...</header>
      
      {/* Your existing hero section */}
      <section id="home">...</section>
      
      {/* Your existing about section */}
      <section id="about">...</section>
      
      {/* New Events Section */}
      <EmbeddableEventsSection />
      
      {/* Your existing team section */}
      <section id="team">...</section>
      
      {/* Your existing contact section */}
      <section id="contact">...</section>
      
      {/* Your existing footer */}
      <footer>...</footer>
    </div>
  );
}
```

This integration maintains your existing website structure while adding the modern events functionality!