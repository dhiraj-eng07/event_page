import { motion } from "motion/react";
import { Calendar, Users, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import type { Event } from "./EventCard";

interface EventsStatsProps {
  events: Event[];
}

export function EventsStats({ events }: EventsStatsProps) {
  const upcomingEvents = events.filter(event => event.status === "upcoming").length;
  const ongoingEvents = events.filter(event => event.status === "ongoing").length;
  const completedEvents = events.filter(event => event.status === "completed").length;
  const totalAttendees = events.reduce((sum, event) => sum + (event.attendees || 0), 0);

  const stats = [
    {
      title: "Upcoming Events",
      value: upcomingEvents,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      title: "Ongoing Events",
      value: ongoingEvents,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      title: "Completed Events",
      value: completedEvents,
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      title: "Total Attendees",
      value: totalAttendees,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border border-white/60 hover:border-blue-300/50 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                    <p className={`text-2xl font-semibold ${stat.color}`}>
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}