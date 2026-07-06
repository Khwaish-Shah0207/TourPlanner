"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useStore } from "@/store/useStore";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function CalendarView({ trip, onReschedule }) {
  const openAdd = useStore((s) => s.openAdd);
  const openEdit = useStore((s) => s.openEdit);

  const events = trip.tasks.map((t) => ({
    id: t.id,
    title: t.title,
    start: t.date,
    allDay: true,
    backgroundColor: trip.color,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate={trip.tasks[0]?.date ?? new Date().toISOString()}
      height="auto"
      editable
      events={events}
      validRange={{ start: todayStr() }}
      dateClick={(info) => {
        if (info.dateStr < todayStr()) return;
        openAdd(info.dateStr);
      }}
      eventClick={(info) => {
        const task = trip.tasks.find((t) => t.id === info.event.id);
        if (task) openEdit(task);
      }}
      eventDrop={(info) => {
        if (info.event.startStr < todayStr()) {
          alert("You can't move a task to a past date.");
          info.revert();
          return;
        }
        onReschedule(info.event.id, info.event.startStr);
      }}
    />
  );
}
