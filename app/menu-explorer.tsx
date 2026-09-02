"use client";

import { useId, useState } from "react";
import type { SiteLocale } from "./content";
import { getMenuDays, type MenuDay, type MenuItem } from "./hotel-data";

type MealKey = "breakfast" | "lunch" | "dinner";

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <div className="menu-list">
      {items.map(([name, portion], index) => (
        <div className="menu-list-row" key={`${name}-${portion}-${index}`}>
          <span>{name}</span>
          {portion && <strong>{portion}</strong>}
        </div>
      ))}
    </div>
  );
}

export default function MenuExplorer({ locale }: { locale: SiteLocale }) {
  const [dayIndex, setDayIndex] = useState(0);
  const [mealKey, setMealKey] = useState<MealKey>("breakfast");
  const panelId = useId();
  const menuDays = getMenuDays(locale);
  const labels = locale === "kk"
    ? {
        meals: [
          { key: "breakfast" as const, label: "Таңғы ас" },
          { key: "lunch" as const, label: "Түскі ас" },
          { key: "dinner" as const, label: "Кешкі ас" },
        ],
        dayPicker: "Ойын күнін таңдау",
        mealPicker: "Тамақтану уақытын таңдау",
        day: "Күн",
        positions: "тағам",
        portion: "Бір адамға арналған рацион",
      }
    : {
        meals: [
          { key: "breakfast" as const, label: "Завтрак" },
          { key: "lunch" as const, label: "Обед" },
          { key: "dinner" as const, label: "Ужин" },
        ],
        dayPicker: "Выбор игрового дня",
        mealPicker: "Выбор приёма пищи",
        day: "День",
        positions: "позиций",
        portion: "Рацион на одного человека",
      };
  const meals = labels.meals;
  const activeDay: MenuDay = menuDays[dayIndex];
  const activeMeal = meals.find((meal) => meal.key === mealKey) ?? meals[0];
  const items = activeDay[activeMeal.key];

  return (
    <div className="menu-explorer">
      <div className="menu-explorer-toolbar">
        <div className="menu-current-day" aria-live="polite">
          <span>{activeDay.card}</span>
          <h3>{activeDay.day}</h3>
        </div>

        <div className="menu-day-picker" role="tablist" aria-label={labels.dayPicker}>
          {menuDays.map((day, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={dayIndex === index}
              className={dayIndex === index ? "is-active" : ""}
              key={day.day}
              onClick={() => setDayIndex(index)}
            >
              {labels.day} {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-meal-picker" role="tablist" aria-label={labels.mealPicker}>
        {meals.map((meal) => (
          <button
            type="button"
            role="tab"
            aria-selected={mealKey === meal.key}
            aria-controls={panelId}
            className={mealKey === meal.key ? "is-active" : ""}
            key={meal.key}
            onClick={() => setMealKey(meal.key)}
          >
            <span>{meal.label}</span>
            <small>{activeDay[meal.key].length} {labels.positions}</small>
          </button>
        ))}
      </div>

      <div className="menu-panel" id={panelId} role="tabpanel">
        <div className="menu-panel-heading">
          <div>
            <span>{labels.portion}</span>
            <h4>{activeMeal.label}</h4>
          </div>
          <strong>{items.length} {labels.positions}</strong>
        </div>
        <MenuList items={items} />
      </div>
    </div>
  );
}
