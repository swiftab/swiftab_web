import HeaderDashboard from "./dashboard/Header";

interface HeaderProps {
  currentTab: string;
}

export function Header({ currentTab }: HeaderProps) {
  return currentTab == "Dash" ? (
    <HeaderDashboard />
  ) : (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-[#fff] px-4 shadow-sm">
      {/* Left side - Brand and mobile menu */}
      <div className="flex items-center gap-4">
        <h1>{currentTab}</h1>
      </div>
    </header>
  );
}
