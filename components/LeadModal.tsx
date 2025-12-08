"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLeadsStore } from "../lib/leads-store";
import { X, CalendarDays, Phone, Mail, CheckCircle2, Clock3, Banknote } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const LeadModal: React.FC = () => {
  const { leads, tasks, activeLeadId, setActiveLead } = useLeadsStore();
  const lead = leads.find((l) => l.id === activeLeadId) ?? null;
  const leadTasks = tasks.filter((t) => t.lead_id === activeLeadId);

  const open = !!lead;

  return (
    <Dialog.Root open={open} onOpenChange={(value) => !value && setActiveLead(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed inset-y-0 right-0 w-full max-w-xl bg-slate-950 border-l border-white/10 z-50 shadow-xl flex flex-col">
          {lead && (
            <>
              <header className="px-4 md:px-6 py-3 md:py-4 border-b border-white/10 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Dialog.Title className="text-base md:text-lg font-semibold truncate">
                    {lead.name}
                  </Dialog.Title>
                  {lead.company && (
                    <p className="text-xs md:text-sm text-slate-400 truncate">{lead.company}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      <span>
                        с {format(new Date(lead.created_at), "d MMM yyyy", { locale: ru })}
                      </span>
                    </span>
                    {lead.potential_amount && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-300 px-2 py-0.5">
                        <Banknote className="w-3 h-3" />
                        {lead.potential_amount.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
                      </span>
                    )}
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-md p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Dialog.Close>
              </header>

              <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-3 md:py-4 space-y-6 text-sm">
                {/* Инфо */}
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                    Инфо
                  </h3>
                  <div className="space-y-1.5 text-xs md:text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{lead.email}</span>
                      </div>
                    )}
                    {lead.notes && (
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                        {lead.notes}
                      </p>
                    )}
                  </div>
                </section>

                {/* Задачи */}
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                    Задачи
                  </h3>
                  <div className="space-y-1.5 text-xs md:text-sm">
                    {leadTasks.length === 0 && (
                      <p className="text-slate-500">Пока нет задач. Добавление задач подключим на следующем шаге.</p>
                    )}
                    {leadTasks.map((task) => {
                      const overdue = task.due_date && !task.completed && new Date(task.due_date) < new Date();
                      return (
                        <div
                          key={task.id}
                          className="flex items-center justify-between gap-2 rounded-md border border-white/5 bg-slate-900/60 px-2.5 py-1.5"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {task.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Clock3 className={`w-3.5 h-3.5 ${overdue ? "text-red-400" : "text-slate-500"}`} />
                            )}
                            <span className="truncate text-[11px] md:text-[12px] text-slate-200">
                              {task.title}
                            </span>
                          </div>
                          {task.due_date && (
                            <span
                              className={`text-[10px] ${
                                overdue ? "text-red-300" : "text-slate-400"
                              }`}
                            >
                              до {format(new Date(task.due_date), "d MMM", { locale: ru })}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* История / Чат / Документы / Финансы пока заглушки */}
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                    История, чат, документы, финансы
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    На этом этапе данные берутся из моков и локального состояния. После подключения Supabase здесь
                    появятся реальные события, сообщения, файлы и платежи по лиду.
                  </p>
                </section>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
