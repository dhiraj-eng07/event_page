import { useState } from "react";
import { EventsSection } from "./components/EventsSection";
import { PastEventsSection } from "./components/PastEventsSection";
import type { Event } from "./components/EventCard";

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "ICPC Guidance Session",
    description: "An interactive session was conducted with an ICPC veteran, where expert tips, tricks, and strategies for excelling in competitive programming were shared.",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Computer Lab A-201",
    category: "Guidance",
    status: "completed",
    image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvbXBldGl0aW9uJTIwY29kaW5nJTIwaGFja2F0aG9ufGVufDF8fHx8MTc1NjAzMTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 85
  },
  {
    id: "2",
    title: "Teacher's Day Celebration",
    description: "We celebrated our mentors with gratitude and joy on this special occasion dedicated to teachers. A heartfelt tribute to those who guide our learning journey.",
    date: "September 5, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Main Auditorium",
    category: "Celebration",
    status: "completed",
    image: "https://images.unsplash.com/photo-1654968327615-927c8e67a8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwYXBwcmVjaWF0aW9uJTIwYWNhZGVtaWMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTYwMzE1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 150
  },
  {
    id: "3",
    title: "Code Fiesta 2025",
    description: "A celebration of all that fills the world of coding into one filled with excitement and learning. Join us for an amazing coding experience with prizes and recognition.",
    date: "January 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Tech Building - Multiple Labs",
    category: "Competition",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1634464660153-468d44306ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3Nob3AlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjAzMTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 0
  },
  {
    id: "4",
    title: "Web Development Workshop",
    description: "Master modern web development with React, Node.js, and cloud deployment. A comprehensive hands-on workshop for beginners and intermediate developers.",
    date: "February 20, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Innovation Lab",
    category: "Workshop",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1634464660153-468d44306ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3Nob3AlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjAzMTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 0
  },
  {
    id: "5",
    title: "AI/ML Symposium",
    description: "Explore the latest trends in Artificial Intelligence and Machine Learning. Industry experts will share insights on emerging technologies and career opportunities.",
    date: "March 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Conference Hall",
    category: "Workshop",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvbXBldGl0aW9uJTIwY29kaW5nJTIwaGFja2F0aG9ufGVufDF8fHx8MTc1NjAzMTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 0
  },
  {
    id: "6",
    title: "Open Source Hackathon",
    description: "Join the global open source celebration! Contribute to open source projects, learn about version control, and earn exclusive swag and recognition.",
    date: "December 20, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Virtual & On-Campus",
    category: "Competition",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvbXBldGl0aW9uJTIwY29kaW5nJTIwaGFja2F0aG9ufGVufDF8fHx8MTc1NjAzMTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 45
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<"current" | "past">("current");

  const handleViewPastEvents = () => {
    setCurrentView("past");
  };

  const handleBackToCurrentEvents = () => {
    setCurrentView("current");
  };

  return (
    <div className="min-h-screen bg-sky-100">
      {currentView === "current" ? (
        <EventsSection 
          events={sampleEvents} 
          onViewPastEvents={handleViewPastEvents}
        />
      ) : (
        <PastEventsSection 
          events={sampleEvents}
          onBackToCurrentEvents={handleBackToCurrentEvents}
        />
      )}
    </div>
  );
}