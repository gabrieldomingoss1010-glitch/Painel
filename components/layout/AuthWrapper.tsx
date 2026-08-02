"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300"
        style={{ marginLeft: "240px" }}
      >
        <Navbar />
        <main
          className="flex-1 overflow-y-auto pt-16"
          style={{ background: "#0a0a0f" }}
        >
          <div className="p-6 page-enter">{children}</div>
        </main>
      </div>
    </>
  );
}
