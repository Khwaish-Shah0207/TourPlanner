"use client";
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/store/useStore";
import { taskSchema } from "@/lib/validations";

type TaskForm = z.infer<typeof taskSchema>;
export default function TaskModal({ tripId, onCreate, onUpdate, onDelete }) {
  const { modal, editingTask, prefillDate, closeModal } = useStore();
  const isEdit = modal === "edit" && editingTask;
  const isOpen = modal !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (!isOpen) return;
    if (isEdit) {
      reset({ title: editingTask.title, date: editingTask.date.slice(0, 10), tripId });
    } else {
      reset({ title: "", date: (prefillDate || "").slice(0, 10), tripId });
    }
  }, [isOpen, isEdit, editingTask, prefillDate, tripId, reset]);

  if (!isOpen) return null;

  const onSubmit = async (values) => {
    if (isEdit) await onUpdate(editingTask.id, values);
    else await onCreate(values);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{isEdit ? "Edit Task" : "Add Task"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              {...register("title")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              placeholder="e.g. Shikara ride on Dal Lake"
            />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              {...register("date")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
            {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date.message}</p>}
          </div>

          <div className="flex justify-between pt-2">
            {isEdit ? (
              <button
                type="button"
                onClick={async () => { await onDelete(editingTask.id); closeModal(); }}
                className="text-sm text-red-600 font-medium"
              >
                Delete
              </button>
            ) : <span />}

            <div className="flex gap-2">
              <button type="button" onClick={closeModal} className="px-3 py-1.5 text-sm rounded border">
                Cancel
              </button>
              <button type="submit" className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


