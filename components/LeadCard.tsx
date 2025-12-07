"use client";

import React, { useMemo } from "react";
import { LeadWithMeta } from "../lib/leads-store";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { AlarmClock, CalendarDays, Phone, Tag, Banknote } from "lucide-react";

type Props = {
  lead: LeadWithMeta;
  onClick: () => void;
};

export const LeadCard: React.FC<Props> = ({ lead, onClick }) => {
  const overdue = useMemo(() => {
    const now = new Date();
    return lead.tasks.some((t) => t.due_date && !t.completed && new Date(t.due_date) < now);
  }, [lead.tasks]);

  const firstTag = lead.tags[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-xl border border-white/5 bg-slate-900/80 hover:bg-slate-800/80 transition-colors px-3 py-3 flex flex-col gap-2 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[13px] truncate">{lead.name}</span>
            {overdue && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-300 text-[10px] px-1.5 py-0.5">
                <AlarmClock className="w-3 h-3" />
                Просрочка
              </span>
            )}
          </div>
          {lead.company && (
            <span className="text-[11px] text-slate-400 truncate">{lead.company}</span>
          )}
        </div>
        {lead.potential_amount && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-0.5 shrink-0">
            <Banknote className="w-3 h-3" />
            {lead.potential_amount.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 min-w-0">
          {firstTag && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-300">
              <Tag className="w-3 h-3" />
              <span className="truncate max-w-[80px]">{firstTag}</span>
            </span>
          )}
          {lead.phone && (
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
              <Phone className="w-3 h-3" />
              {lead.phone}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
          <CalendarDays className="w-3 h-3" />
          <span>{format(new Date(lead.created_at), "d MMM", { locale: ru })}</span>
        </div>
      </div>
    </button>
  );
};
