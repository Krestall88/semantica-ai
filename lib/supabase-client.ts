"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Offline-first Supabase client.
// Если env-переменные не заданы, возвращаем мок-клиент с тем же интерфейсом,
// чтобы код приложения продолжал работать на локальном состоянии.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Очень упрощённый тип для мок-клиента
export type AnySupabaseClient = SupabaseClient | ReturnType<typeof createMockClient>;

function createMockClient() {
  return {
    from() {
      // Моки можно заменить на реальные вызовы после подключения Supabase
      return {
        select: async () => ({ data: null, error: null }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
        upsert: async () => ({ data: null, error: null }),
      } as const;
    },
    storage: {
      from() {
        return {
          upload: async () => ({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        };
      },
    },
  } as const;
}

let client: AnySupabaseClient | null = null;

export function getSupabaseClient(): AnySupabaseClient {
  if (client) return client;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    client = createMockClient();
    return client;
  }

  client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
    },
  });

  return client;
}
