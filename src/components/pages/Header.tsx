import HeaderDashboard from "./dashboard/Header";

interface HeaderProps {
  currentTab: string;
}

export function Header({ currentTab }: HeaderProps) {
  return(
    <HeaderDashboard currentTab={currentTab}/>
  )
}
