import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { EventCard, type Event } from "./EventCard";
import { EventsFilter } from "./EventsFilter";
import { EventsStats } from "./EventsStats";
import { EmptyState } from "./EmptyState";
import { FeaturedEventCard } from "./FeaturedEventCard";
import { Button } from "./ui/button";
import { History } from "lucide-react";

interface EventsSectionProps {
  events: Event[];
  onViewPastEvents?: () => void;
}

export function EventsSection({ events, onViewPastEvents }: EventsSectionProps) {
  const [layout, setLayout] = useState<"timeline" | "grid" | "featured">("grid");
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all"
  });

  // Filter to only show current events (upcoming/ongoing)
  const currentEvents = useMemo(() => {
    return events.filter(event => event.status === "upcoming" || event.status === "ongoing");
  }, [events]);

  // Get unique categories from current events
  const categories = useMemo(() => {
    const cats = currentEvents.map(event => event.category);
    return [...new Set(cats)];
  }, [currentEvents]);

  // Find the nearest upcoming event
  const featuredEvent = useMemo(() => {
    const upcomingEvents = currentEvents.filter(event => event.status === "upcoming");
    // Sort by date (assuming dates are comparable strings or you could parse them)
    return upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  }, [currentEvents]);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return currentEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           event.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === "all" || event.category === filters.category;
      const matchesStatus = filters.status === "all" || event.status === filters.status;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [currentEvents, filters]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "timeline":
        return "space-y-12";
      case "featured":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1" />
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Current Events
            </h1>
            <p className="text-slate-700 max-w-2xl mx-auto">
              Discover exciting upcoming events, workshops, and competitions organized by ACM PCCOER. 
              Join us in our journey of learning, innovation, and community building.
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            {onViewPastEvents && (
              <Button
                onClick={onViewPastEvents}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                Past Events
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Featured Event */}
      {featuredEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FeaturedEventCard event={featuredEvent} />
        </motion.div>
      )}

      {/* Stats */}
      <EventsStats events={currentEvents} />

      {/* Filters */}
      <EventsFilter
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onLayoutChange={setLayout}
        currentLayout={layout}
        categories={categories}
        activeFilters={filters}
      />

      {/* Events Display */}
      <div className="mt-8">
        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No events found"
            description="Try adjusting your filters or search terms to find more events."
            hasFilters={filters.search !== "" || filters.category !== "all" || filters.status !== "all"}
            onClearFilters={() => setFilters({ search: "", category: "all", status: "all" })}
          />
        ) : (
          <motion.div
            key={layout} // Force re-render when layout changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={getLayoutClasses()}
          >
            {layout === "timeline" && (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-600 via-blue-400/50 to-transparent"></div>
                {filteredEvents
                  .filter(event => event.id !== featuredEvent?.id) // Exclude featured event from timeline
                  .map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      layout="timeline"
                    />
                  ))}
              </div>
            )}
            
            {(layout === "grid" || layout === "featured") && (
              <>
                {filteredEvents
                  .filter(event => event.id !== featuredEvent?.id) // Exclude featured event from regular list
                  .map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      layout={layout}
                    />
                  ))}
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Results count */}
      {filteredEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-slate-600"
        >
          Showing {filteredEvents.length} of {currentEvents.length} current events
        </motion.div>
      )}
    </div>
  );
}