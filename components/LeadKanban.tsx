"use client";

import React from "react";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useLeadsStore, LeadWithMeta } from "../lib/leads-store";
import { leadStageIds, LeadStageId } from "../types/supabase";
import { LeadCard } from "./LeadCard";
import { LeadModal } from "./LeadModal";

const stageLabels: Record<LeadStageId, string> = {
  new: "Новые",
  qualification: "Квалификация",
  proposal: "КП",
  negotiation: "Переговоры",
  in_work: "В работе",
  won: "Сделка",
  lost: "Отказ",
};

export const LeadKanban: React.FC = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const { leads, tasks, moveLeadToStage, setActiveLead } = useLeadsStore();

  const leadsByStage: Record<LeadStageId, LeadWithMeta[]> = {
    new: [],
    qualification: [],
    proposal: [],
    negotiation: [],
    in_work: [],
    won: [],
    lost: [],
  };

  for (const lead of leads) {
    const enriched: LeadWithMeta = {
      ...lead,
      tasks: tasks.filter((t) => t.lead_id === lead.id),
    };
    leadsByStage[lead.stage].push(enriched);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const leadId = active?.id as string | undefined;
    const newStage = over?.id as LeadStageId | undefined;
    if (!leadId || !newStage) return;

    moveLeadToStage(leadId, newStage);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between border-b border-white/10">
        <div>
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">Лиды</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Канбан по всей воронке продаж.</p>
        </div>
      </header>
      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden">
        <div className="h-full flex gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-4 min-w-max">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {leadStageIds.map((stage) => (
              <section
                key={stage}
                className="w-72 md:w-80 flex flex-col bg-slate-950/80 border border-white/5 rounded-2xl shadow-sm"
              >
                <header className="px-3 md:px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">{stageLabels[stage]}</span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {leadsByStage[stage].length} лид(ов)
                    </span>
                  </div>
                </header>
                <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-2">
                  <SortableContext items={leadsByStage[stage].map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    {leadsByStage[stage].map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onClick={() => setActiveLead(lead.id)}
                      />
                    ))}
                  </SortableContext>
                </div>
              </section>
            ))}
          </DndContext>
        </div>
      </div>
      <LeadModal />
    </div>
  );
};
