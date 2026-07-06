"use client";

import { useEffect, useState, useCallback } from "react";
import { useStore } from "@/store/useStore";
import CalendarView from "@/components/CalendarView";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const tripId = useStore((s) => s.tripId);
  const setTripId = useStore((s) => s.setTripId);
  const openAdd = useStore((s) => s.openAdd);

  const load = useCallback(async () => {
    const res = await fetch("/api/trips");
    const data = await res.json();
    setTrips(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (trips.length > 0 && !tripId) setTripId(trips[0].id);
  }, [trips, tripId, setTripId]);

  const trip = trips.find((t) => t.id === tripId);

  async function createTask(values) {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    load();
  }

  async function updateTask(id, values) {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    load();
  }

  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    load();
  }

  async function rescheduleTask(id, date) {
    await updateTask(id, { date });
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">🧳 Tour Planner</h1>

      <div className="flex gap-2 mb-4">
        {trips.map((t) => (
          <button
            key={t.id}
            onClick={() => setTripId(t.id)}
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: tripId === t.id ? t.color : "#e5e7eb",
              color: tripId === t.id ? "white" : "#374151",
            }}
          >
            {t.name}
          </button>
        ))}
        {trip && (
          <button onClick={() => openAdd(new Date().toISOString())} className="ml-auto px-4 py-2 rounded bg-black text-white text-sm font-medium">
            + Add Task
          </button>
        )}
      </div>

      {trip && <CalendarView trip={trip} onReschedule={rescheduleTask} />}

      <p className="text-sm text-gray-500 mt-3">
        Click a day to add a task, click a task to edit or delete it, or drag it to another day.
      </p>

      {trip && (
        <TaskModal tripId={trip.id} onCreate={createTask} onUpdate={updateTask} onDelete={deleteTask} />
      )}
    </main>
  );
}
