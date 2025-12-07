export default function AdminFinancePage() {
  return (
    <div className="h-full flex flex-col px-4 md:px-8 py-4 md:py-6">
      <h1 className="text-lg md:text-xl font-semibold tracking-tight mb-2">Финансы</h1>
      <p className="text-sm text-slate-400 mb-4">
        Здесь появится аналитика по воронке, конверсии, среднему чеку и прибыли. Сейчас экран работает на мок-данных.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
          <div className="text-xs text-slate-400 mb-1">Выручка за месяц</div>
          <div className="text-xl font-semibold">1 250 000 ₽</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
          <div className="text-xs text-slate-400 mb-1">Прибыль</div>
          <div className="text-xl font-semibold">780 000 ₽</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
          <div className="text-xs text-slate-400 mb-1">Конверсия</div>
          <div className="text-xl font-semibold">34%</div>
        </div>
      </div>
    </div>
  );
}
