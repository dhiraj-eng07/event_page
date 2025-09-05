import { useState } from "react";
import { EventCard, type Event } from "./EventCard";
import { SimpleEventsFilter } from "./SimpleEventsFilter";
import { EventsStats } from "./EventsStats";
import { EmptyState } from "./EmptyState";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface PastEventsSectionProps {
  events: Event[];
  onBackToCurrentEvents: () => void;
}

export function PastEventsSection({ events, onBackToCurrentEvents }: PastEventsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter only past events
  const pastEvents = events.filter(event => event.status === "completed");

  const filteredEvents = pastEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === "all" || event.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(pastEvents.map(event => event.category)));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={onBackToCurrentEvents}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Current Events
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Past Events
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our previous events and see what we've accomplished together as the ACM PCCOER community.
        </p>
      </div>

      {/* Stats */}
      <EventsStats events={pastEvents} />

      {/* Filter */}
      <SimpleEventsFilter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Events Grid/List */}
      {filteredEvents.length === 0 ? (
        <EmptyState 
          title="No past events found"
          description="We haven't completed any events in this category yet."
        />
      ) : (
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
        }>
          {filteredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}