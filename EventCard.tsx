import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: "upcoming" | "ongoing" | "completed";
  image: string;
  attendees?: number;
  registrationUrl?: string;
}

interface EventCardProps {
  event: Event;
  index: number;
  layout?: "timeline" | "grid" | "featured";
}

export function EventCard({ event, index, layout = "grid" }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ongoing": return "bg-amber-50 text-amber-700 border-amber-200";
      case "completed": return "bg-slate-50 text-slate-600 border-slate-200";
      default: return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "competition": return "bg-violet-50 text-violet-700 border-violet-200";
      case "workshop": return "bg-orange-50 text-orange-700 border-orange-200";
      case "celebration": return "bg-rose-50 text-rose-700 border-rose-200";
      case "guidance": return "bg-teal-50 text-teal-700 border-teal-200";
      default: return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  if (layout === "timeline") {
    return (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
      >
        <div className="flex-1">
          <Card className="group hover:shadow-xl transition-all duration-300 border border-white/60 hover:border-blue-300/50 overflow-hidden bg-white/90 backdrop-blur-sm">
            <div className="relative">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
            <CardContent className="p-6">
              <h3 className="mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                {event.attendees && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attendees</span>
                  </div>
                )}
              </div>

              <Button 
                className="w-full group/btn" 
                variant={event.status === "upcoming" ? "default" : "outline"}
                disabled={event.status === "completed"}
              >
                {event.status === "upcoming" ? "Register Now" : 
                 event.status === "ongoing" ? "Join Now" : "View Details"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>
          {index < 2 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-blue-600 to-transparent"></div>
          )}
        </div>
        
        <div className="flex-1"></div>
      </motion.div>
    );
  }

  if (layout === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="group hover:shadow-2xl transition-all duration-500 border border-white/60 hover:border-blue-300/50 overflow-hidden bg-white/95 backdrop-blur-sm">
          <div className="relative">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white mb-1 text-xl">{event.title}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(event.status)} variant="outline">
                    {event.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">{event.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>

            <Button 
              className="w-full group/btn" 
              variant={event.status === "upcoming" ? "default" : "outline"}
              disabled={event.status === "completed"}
            >
              {event.status === "upcoming" ? "Register Now" : 
               event.status === "ongoing" ? "Join Now" : "View Details"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Default grid layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border border-white/60 hover:border-blue-300/50 overflow-hidden h-full bg-white/90 backdrop-blur-sm">
        <div className="relative">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <Button 
            className="w-full group/btn mt-auto" 
            variant={event.status === "upcoming" ? "default" : "outline"}
            disabled={event.status === "completed"}
          >
            {event.status === "upcoming" ? "Register Now" : 
             event.status === "ongoing" ? "Join Now" : "View Details"}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}