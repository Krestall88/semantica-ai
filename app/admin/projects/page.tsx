export default function AdminProjectsPage() {
  return (
    <div className="h-full flex flex-col px-4 md:px-8 py-4 md:py-6">
      <h1 className="text-lg md:text-xl font-semibold tracking-tight mb-2">Проекты</h1>
      <p className="text-sm text-slate-400 mb-4">
        Здесь будет канбан и список активных проектов. Пока используется заглушка.
      </p>
      <div className="flex-1 rounded-2xl border border-dashed border-slate-700/60 bg-slate-950/60 flex items-center justify-center text-sm text-slate-500">
        Канбан по проектам появится после подключения реальной базы.
      </div>
    </div>
  );
}
