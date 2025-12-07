"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { LayoutDashboard, Users, FolderKanban, LineChart, Archive, LogOut } from "lucide-react";

const queryClient = new QueryClient();

const navItems = [
  { href: "/admin/leads", label: "Лиды", icon: Users },
  { href: "/admin/projects", label: "Проекты", icon: FolderKanban },
  { href: "/admin/finance", label: "Финансы", icon: LineChart },
  { href: "/admin/archive", label: "Архив", icon: Archive },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Простая заглушка защиты: позже можно заменить на реальную аутентификацию
  // Сейчас всё доступно без логина, чтобы не мешать разработке.

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex bg-[#050509] text-slate-100">
        <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-gradient-to-b from-slate-950 to-slate-900/80">
          <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
            <LayoutDashboard className="w-5 h-5 text-sky-400" />
            <div>
              <div className="text-sm font-semibold tracking-tight">Semantica CRM</div>
              <div className="text-xs text-slate-400">Личная админ-панель</div>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? "bg-sky-500/15 text-sky-300 border border-sky-500/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-4 border-t border-white/10 text-xs text-slate-500 flex items-center justify-between">
            <span>v0.1 • Offline</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800/80 text-[11px]"
              onClick={() => router.push("/")}
            >
              <LogOut className="w-3 h-3" />
              <span>На сайт</span>
            </button>
          </div>
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="md:hidden sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-2 text-sm">
              <LayoutDashboard className="w-4 h-4 text-sky-400" />
              <span className="font-medium">Semantica CRM</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-xs text-slate-400 border border-slate-700 rounded-md px-2 py-1"
            >
              На сайт
            </button>
          </header>
          <main className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/80">
            {children}
          </main>
        </div>
        <Toaster richColors position="top-right" />
      </div>
    </QueryClientProvider>
  );
}
