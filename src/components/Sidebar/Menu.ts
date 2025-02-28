import {
  LucideIcon,
  LayoutDashboard,
  ListOrdered,
  Table2,
  Utensils,
  Users,
  ChartNetwork,
  Grid3x3,
  CalendarRange
} from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  title: string;
  url: string;
  children?: SidebarItem[];
}

const menuItems: SidebarItem[] = [
  { icon: LayoutDashboard, title: "Dashboard", url: "/dash" },
  { icon: ChartNetwork, title: "Report", url: "/analytics" },
  {icon:CalendarRange,title:"Reservations",url:'/reservations'},
  { icon: ListOrdered, title: "Orders", url: "/order-line" },

  {
    icon: Utensils,
    title: "Manage Dishes",
    url: "/dishes",
  },
  {
    icon: Table2,
    title: "Manage Tables",
    url: "#",
    children: [
      { icon: Grid3x3, title: "Floor Plan", url: "/tables/floorplan" },
      { icon: Table2, title: "Grid", url: "/tables/grid" },
    ],
  },
  {
    icon: Users,
    title: "Customers",
    url: "/customers",
    // children: [
    //   { icon: Users, title: "Review", url: "/customers/review" },
    //   { icon: Users, title: "Reservation List", url: "/customers/reservation" },
    //   { icon: Users, title: "Customers", url: "/customers/loyal" },
    // ],
  },
];

export default menuItems;
