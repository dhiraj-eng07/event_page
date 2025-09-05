import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Event } from "./EventCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeaturedEventCardProps {
  event: Event;
}

export function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "ongoing": return "bg-amber-100 text-amber-800 border-amber-200";
      case "completed": return "bg-slate-100 text-slate-800 border-slate-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "workshop": return "bg-blue-100 text-blue-800 border-blue-200";
      case "competition": return "bg-purple-100 text-purple-800 border-purple-200";
      case "guidance": return "bg-green-100 text-green-800 border-green-200";
      case "celebration": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="relative mb-8">
      {/* Featured Badge */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full border border-amber-200">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium">Next Upcoming Event</span>
        </div>
      </div>

      <Card className="overflow-hidden bg-gradient-to-br from-white to-sky-50 border-2 border-sky-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2 relative">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={getStatusColor(event.status)} variant="outline">
                {event.status}
              </Badge>
              <Badge className={getCategoryColor(event.category)} variant="outline">
                {event.category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {event.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="h-4 w-4 text-sky-600" />
                <span className="font-medium">{event.date}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="h-4 w-4 text-sky-600" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-4 w-4 text-sky-600" />
                <span>{event.location}</span>
              </div>
              
              {event.attendees > 0 && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="h-4 w-4 text-sky-600" />
                  <span>{event.attendees} attendees</span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-md">
                {event.status === "upcoming" ? "Register Now" : 
                 event.status === "ongoing" ? "Join Now" : "View Details"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}