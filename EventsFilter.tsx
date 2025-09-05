import { useState } from "react";
import { Search, Filter, Calendar, Grid, List, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "motion/react";

interface EventsFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onLayoutChange: (layout: "timeline" | "grid" | "featured") => void;
  currentLayout: "timeline" | "grid" | "featured";
  categories: string[];
  activeFilters: {
    search: string;
    category: string;
    status: string;
  };
}

export function EventsFilter({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onLayoutChange,
  currentLayout,
  categories,
  activeFilters
}: EventsFilterProps) {
  const [searchTerm, setSearchTerm] = useState(activeFilters.search);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    onSearchChange("");
    onCategoryChange("all");
    onStatusChange("all");
  };

  const hasActiveFilters = activeFilters.search || activeFilters.category !== "all" || activeFilters.status !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-lg p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3>Filter Events</h3>
          </div>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              Filters Active
            </Badge>
          )}
        </div>
        
        {/* Layout Toggle */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={currentLayout === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onLayoutChange("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={currentLayout === "timeline" ? "default" : "ghost"}
            size="sm"
            onClick={() => onLayoutChange("timeline")}
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={currentLayout === "featured" ? "default" : "ghost"}
            size="sm"
            onClick={() => onLayoutChange("featured")}
            className="h-8 w-8 p-0"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={activeFilters.category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={activeFilters.status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="flex items-center gap-2"
        >
          Clear Filters
        </Button>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50"
        >
          {activeFilters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{activeFilters.search}"
              <button
                onClick={() => handleSearchChange("")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {activeFilters.category !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {activeFilters.category}
              <button
                onClick={() => onCategoryChange("all")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {activeFilters.status !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {activeFilters.status}
              <button
                onClick={() => onStatusChange("all")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}