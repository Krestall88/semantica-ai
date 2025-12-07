"use client";

import { create } from "zustand";
import { Lead, LeadTask, LeadStageId, leadStageIds } from "../types/supabase";
import { mockLeads, mockLeadTasks } from "../mocks/leads";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { formatISO } from "date-fns";

export type LeadWithMeta = Lead & {
  tasks: LeadTask[];
};

export type LeadFilter = {
  search: string;
  stage: LeadStageId | "all";
};

type State = {
  leads: Lead[];
  tasks: LeadTask[];
  activeLeadId: string | null;
  filter: LeadFilter;
};

type Actions = {
  setActiveLead: (id: string | null) => void;
  moveLeadToStage: (id: string, stage: LeadStageId) => void;
  updateLead: (lead: Partial<Lead> & { id: string }) => void;
  createLead: (payload: Omit<Lead, "id" | "created_at" | "updated_at">) => Lead;
  deleteLead: (id: string) => void;
  addTask: (payload: Omit<LeadTask, "id" | "created_at" | "updated_at">) => LeadTask;
  toggleTask: (id: string) => void;
  setFilter: (patch: Partial<LeadFilter>) => void;
};

const initialState: State = {
  leads: mockLeads,
  tasks: mockLeadTasks,
  activeLeadId: null,
  filter: { search: "", stage: "all" },
};

export const useLeadsStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  setActiveLead: (id) => set({ activeLeadId: id }),

  moveLeadToStage: (id, stage) =>
    set(
      produce<State>((draft) => {
        const lead = draft.leads.find((l) => l.id === id);
        if (lead) {
          lead.stage = stage;
          lead.updated_at = formatISO(new Date());
        }
      }),
    ),

  updateLead: (payload) =>
    set(
      produce<State>((draft) => {
        const lead = draft.leads.find((l) => l.id === payload.id);
        if (lead) {
          Object.assign(lead, payload);
          lead.updated_at = formatISO(new Date());
        }
      }),
    ),

  createLead: (payload) => {
    const now = formatISO(new Date());
    const id = nanoid();
    const lead: Lead = {
      id,
      ...payload,
      created_at: now,
      updated_at: now,
    };
    set(
      produce<State>((draft) => {
        draft.leads.unshift(lead);
      }),
    );
    return lead;
  },

  deleteLead: (id) =>
    set(
      produce<State>((draft) => {
        draft.leads = draft.leads.filter((l) => l.id !== id);
        draft.tasks = draft.tasks.filter((t) => t.lead_id !== id);
        if (draft.activeLeadId === id) draft.activeLeadId = null;
      }),
    ),

  addTask: (payload) => {
    const now = formatISO(new Date());
    const task: LeadTask = {
      id: nanoid(),
      ...payload,
      created_at: now,
      updated_at: now,
    };
    set(
      produce<State>((draft) => {
        draft.tasks.push(task);
      }),
    );
    return task;
  },

  toggleTask: (id) =>
    set(
      produce<State>((draft) => {
        const t = draft.tasks.find((task) => task.id === id);
        if (t) {
          t.completed = !t.completed;
          t.updated_at = formatISO(new Date());
        }
      }),
    ),

  setFilter: (patch) =>
    set(
      produce<State>((draft) => {
        draft.filter = { ...draft.filter, ...patch };
      }),
    ),
}));
