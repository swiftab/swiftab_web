import { Clock, Bell, Heart, Utensils, MessageCircle, Calendar } from "lucide-react"

const services = [
    {
      title: "Instant Reservations",
      description: "Allow users to make instant reservations at their favorite restaurants with just a few taps.",
      icon: Calendar
    },
    {
      title: "Real-Time Availability",
      description: "Provide real-time availability updates to help users find open tables quickly.",
      icon: Clock
    },
    {
      title: "Restaurant Profiles",
      description: "Create detailed profiles for each restaurant, including photos, cuisine descriptions, and hours of operation.",
      icon: Utensils
    },
    {
      title: "Favorites",
      description: "Allow users to mark favorite restaurants for quick and easy future reservations.",
      icon: Heart
    },
    {
      title: "Notifications and Reminders",
      description: "Send push notifications and reminders for upcoming reservations, special events.",
      icon: Bell
    },
    {
      title: "User Reviews and Ratings",
      description: "Include a feature for users to leave reviews and ratings, helping others make informed dining choices.",
      icon: MessageCircle
    }
  ];
  export default services;