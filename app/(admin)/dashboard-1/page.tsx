import {
  Search,
  ShieldBan,
  ShieldCheck,
  Trash2,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { MOCK_USERS } from "@/app/(admin)/dashboard-1/data";
import KpiCard from "@/app/(admin)/dashboard-1/KpiCard";
import Th from "./Th";
import Td from "./Td";
import { ConfirmModal } from "@/app/(admin)/dashboard-1/ConfirmModal";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[--color-light-mint] text-[--color-grass]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[--color-lime]/40 backdrop-blur bg-[--color-light-mint]/80">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[--color-olive] grid place-items-center text-[--color-white] font-bold">
              A
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[--color-olive]">
                Admin Panel
              </h1>
              <p className="text-xs text-[--color-grayish-teal]">
                Управление интернет-магазином
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                className="h-10 w-72 rounded-xl bg-white/70 placeholder-[--color-light-grey] pl-10 pr-3 text-sm outline-none ring-1 ring-[--color-lime]/50 focus:ring-2 focus:ring-[--color-olive]"
                placeholder="Поиск пользователей / заказов…"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--color-grayish-teal]" />
            </div>
            <button className="nav-link flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-[--color-lime]/40 bg-white/70 p-4">
          <nav className="space-y-1">
            <a
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[--color-lime]/30 text-[--color-olive] font-semibold"
              href="#"
            >
              <Users className="h-4 w-4" /> Пользователи
            </a>
            <a
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
              href="#"
            >
              <Package className="h-4 w-4" /> Заказы
            </a>
            <a
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
              href="#"
            >
              <DollarSign className="h-4 w-4" /> Транзакции
            </a>
            <a
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-lime]/20"
              href="#"
            >
              <AlertTriangle className="h-4 w-4" /> Споры
            </a>
          </nav>

          <div className="mt-6 text-xs text-[--color-grayish-teal]">
            Версия панели:{" "}
            <span className="font-semibold text-[--color-olive]">v1.0</span>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          {/* KPI cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Всего пользователей" value="12,480" delta="+2.1%" />
            <KpiCard title="Активные сегодня" value="1,042" delta="+0.6%" />
            <KpiCard title="Заказов за 24ч" value="384" delta="+4.3%" />
            <KpiCard title="Выручка, $ " value="15,210" delta="+3.8%" />
          </section>

          {/* Filters */}
          <section className="card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[--color-grayish-teal]">
                  Фильтр:
                </span>
                <button className="badge border-[--color-lime]/60 bg-white/70 hover:bg-[--color-lime]/20">
                  Все
                </button>
                <button className="badge border-[--color-lime]/60 bg-white/70 hover:bg-[--color-lime]/20">
                  Заблокированные
                </button>
                <button className="badge border-[--color-lime]/60 bg-white/70 hover:bg-[--color-lime]/20">
                  Подтверждённые
                </button>
              </div>

              <div className="relative">
                <input
                  className="h-10 w-full md:w-72 rounded-xl bg-white placeholder-[--color-light-grey] pl-10 pr-3 text-sm outline-none ring-1 ring-[--color-lime]/50 focus:ring-2 focus:ring-[--color-olive]"
                  placeholder="Поиск по email / имени…"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--color-grayish-teal]" />
              </div>
            </div>
          </section>

          {/* Users table */}
          <section className="rounded-2xl overflow-hidden border border-[--color-lime]/40 bg-white">
            <div className="px-4 py-3 bg-[--color-light-mint] border-b border-[--color-lime]/40 flex items-center justify-between">
              <h2 className="font-semibold text-[--color-olive]">
                Пользователи
              </h2>
              <span className="text-xs text-[--color-grayish-teal]">
                Последнее обновление: 2 мин назад
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[--color-lime]/30 text-[--color-grass]">
                  <tr>
                    <Th>Имя</Th>
                    <Th>Email</Th>
                    <Th>Роль</Th>
                    <Th>Статус</Th>
                    <Th>Заказы</Th>
                    <Th className="text-right pr-4">Действия</Th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-[--color-lime]/20 hover:bg-[--color-light-mint]/60"
                    >
                      <Td>
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            className="h-9 w-9 rounded-full object-cover"
                            alt={u.name}
                          />
                          <div>
                            <div className="font-medium">{u.name}</div>
                            <div className="text-xs text-[--color-grayish-teal]">
                              ID: {u.id}
                            </div>
                          </div>
                        </div>
                      </Td>
                      <Td>{u.email}</Td>
                      <Td>
                        <span className="badge border-[--color-lime]/50 bg-[--color-lime]/20 text-[--color-olive]">
                          {u.role}
                        </span>
                      </Td>
                      <Td>
                        <span
                          className={`badge ${u.blocked ? "border-red-200 bg-red-100 text-red-700" : "border-emerald-200 bg-emerald-100 text-emerald-700"}`}
                        >
                          {u.blocked ? "Заблокирован" : "Активен"}
                        </span>
                      </Td>
                      <Td>{u.orders}</Td>
                      <Td className="text-right pr-4">
                        <div className="inline-flex gap-2">
                          {u.blocked ? (
                            <button className="px-2 py-1 rounded-md bg-emerald-600/90 text-white hover:bg-emerald-700/90 inline-flex items-center gap-1">
                              <ShieldCheck className="h-4 w-4" /> Unban
                            </button>
                          ) : (
                            <button className="px-2 py-1 rounded-md bg-amber-600/90 text-white hover:bg-amber-700/90 inline-flex items-center gap-1">
                              <ShieldBan className="h-4 w-4" /> Ban
                            </button>
                          )}
                          <button className="px-2 py-1 rounded-md bg-rose-600/90 text-white hover:bg-rose-700/90 inline-flex items-center gap-1">
                            <Trash2 className="h-4 w-4" /> Delete
                          </button>
                          <button className="px-2 py-1 rounded-md bg-[--color-olive] text-[--color-white] hover:opacity-90">
                            View
                          </button>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Modal skeleton (скрыта, подключи состояние при необходимости) */}
      <ConfirmModal />
    </div>
  );
}
