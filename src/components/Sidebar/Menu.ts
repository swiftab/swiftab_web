import {
  LucideIcon,
  LayoutDashboard,
  ListOrdered,
  Table2,
  Utensils,
  Users,
  ChartNetwork,
  Grid3x3,
} from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  title: string;
  url: string;
  children?: SidebarItem[]; // Add children property for nested items
}

const menuItems: SidebarItem[] = [
  { icon: LayoutDashboard, title: "Dashboard", url: "/dash" },
  { icon: ChartNetwork, title: "Analytics", url: "/analytics" },
  { icon: ListOrdered, title: "Order Line", url: "/order-line" },
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
    icon: Utensils,
    title: "Manage Dishes",
    url: "/dishes",
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
