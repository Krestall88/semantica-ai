import { Lead, LeadStageId, LeadTask } from "../types/supabase";
import { v4 as uuid } from "uuid";
import { addDays, subDays } from "date-fns";

function iso(date: Date) {
  return date.toISOString();
}

const now = new Date();

const lead = (
  overrides: Partial<Lead> & Pick<Lead, "name" | "phone" | "stage">,
): Lead => {
  const id = overrides.id ?? uuid();
  const created_at = overrides.created_at ?? iso(subDays(now, 7));
  const updated_at = overrides.updated_at ?? created_at;

  return {
    id,
    name: overrides.name,
    phone: overrides.phone,
    email: overrides.email ?? null,
    company: overrides.company ?? null,
    telegram_id: overrides.telegram_id ?? null,
    telegram_username: overrides.telegram_username ?? null,
    category: overrides.category ?? null,
    potential_amount: overrides.potential_amount ?? null,
    stage: overrides.stage,
    tags: overrides.tags ?? [],
    notes: overrides.notes ?? null,
    created_at,
    updated_at,
  };
};

export const mockLeads: Lead[] = [
  lead({
    name: "Иван Петров",
    phone: "+7 999 111-22-33",
    email: "ivan@example.com",
    company: "ЛогистикПро",
    stage: "new",
    potential_amount: 250000,
    tags: ["срочно", "логистика"],
    notes: "Нужна система учёта заявок и водителей.",
  }),
  lead({
    name: "Анна Смирнова",
    phone: "+7 999 444-55-66",
    email: "anna@cleaning.ru",
    company: "ЧистоСити",
    stage: "qualification",
    potential_amount: 180000,
    tags: ["клининг"],
    notes: "Сложный график смен, много филиалов.",
  }),
  lead({
    name: "ООО Хлебный Дом",
    phone: "+7 812 123-45-67",
    email: "it@breadhouse.ru",
    company: "Хлебный Дом",
    stage: "proposal",
    potential_amount: 420000,
    tags: ["производство", "ERP"],
  }),
  lead({
    name: "Digital-агентство Rocket",
    phone: "+7 495 555-66-77",
    email: "ceo@rocket.digital",
    company: "Rocket Digital",
    stage: "negotiation",
    potential_amount: 320000,
    tags: ["агентство"],
  }),
  lead({
    name: "СкладМаркет",
    phone: "+7 921 000-11-22",
    email: "owner@skladmarket.ru",
    company: "СкладМаркет",
    stage: "in_work",
    potential_amount: 270000,
    tags: ["склады", "маркетплейсы"],
  }),
  lead({
    name: "Транспортная компания Север",
    phone: "+7 923 555-11-22",
    email: "cto@severlog.ru",
    company: "СеверЛог",
    stage: "won",
    potential_amount: 380000,
    tags: ["транспорт"],
  }),
  lead({
    name: "Студия дизайна Pixel",
    phone: "+7 905 777-88-99",
    email: "hello@pixel.studio",
    company: "Pixel Studio",
    stage: "lost",
    potential_amount: 150000,
    tags: ["дизайн"],
    notes: "Ушли к конкурентам, вернуться через 3 мес.",
  }),
];

const task = (
  overrides: Partial<LeadTask> & Pick<LeadTask, "lead_id" | "title">,
): LeadTask => {
  const id = overrides.id ?? uuid();
  const created_at = overrides.created_at ?? iso(subDays(now, 3));
  const updated_at = overrides.updated_at ?? created_at;

  return {
    id,
    lead_id: overrides.lead_id,
    title: overrides.title,
    description: overrides.description ?? null,
    due_date: overrides.due_date ?? iso(addDays(now, 1)),
    completed: overrides.completed ?? false,
    created_at,
    updated_at,
  };
};

export const mockLeadTasks: LeadTask[] = [
  task({
    lead_id: mockLeads[0].id,
    title: "Созвон по требованиям",
    description: "Уточнить процессы и ответственных.",
    due_date: iso(addDays(now, 1)),
  }),
  task({
    lead_id: mockLeads[1].id,
    title: "Подготовить КП",
    due_date: iso(addDays(now, 2)),
  }),
  task({
    lead_id: mockLeads[2].id,
    title: "Отправить прототип экрана цеха",
    due_date: iso(subDays(now, 1)),
  }),
];
