import { motion } from "motion/react";
import { Search, Calendar, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({ title, description, hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-100/70 rounded-full flex items-center justify-center backdrop-blur-sm">
            {hasFilters ? (
              <Search className="w-12 h-12 text-blue-600" />
            ) : (
              <Calendar className="w-12 h-12 text-blue-600" />
            )}
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Search className="w-4 h-4 text-blue-700" />
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
      
      {hasFilters && onClearFilters && (
        <Button onClick={onClearFilters} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Clear all filters
        </Button>
      )}
    </motion.div>
  );
}