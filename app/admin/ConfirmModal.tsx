import React from "react";

export const ConfirmModal = () => {
  return (
    <div className="hidden fixed inset-0 bg-black/20 backdrop-blur-sm grid place-items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-[--color-lime]/40">
        <h3 className="text-lg font-semibold text-[--color-olive]">
          Заголовок модалки
        </h3>
        <p className="mt-2 text-sm text-[--color-grayish-teal]">Текст…</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 rounded-md bg-[--color-light-mint]">
            Отмена
          </button>
          <button className="px-3 py-2 rounded-md bg-[--color-olive] text-[--color-white]">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};
