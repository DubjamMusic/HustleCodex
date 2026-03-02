import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
