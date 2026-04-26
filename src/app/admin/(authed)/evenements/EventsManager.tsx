"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { EventRow } from "@/lib/supabase/types";
import { formatDate, formatTime } from "@/lib/utils";
import { Modal } from "../Modal";
import { AdminButton } from "../ui";
import { EventForm } from "./EventForm";
import { deleteEvent } from "./actions";

type Props = {
  events: EventRow[];
};

const STATUS_LABEL: Record<EventRow["status"], { label: string; tone: string }> = {
  upcoming: {
    label: "À venir",
    tone: "border-accent-border bg-accent-subtle text-accent",
  },
  "sold-out": {
    label: "Sold-out",
    tone: "border-red-900/40 bg-red-950/30 text-red-300",
  },
  completed: {
    label: "Terminé",
    tone: "border-border-medium bg-bg-elevated text-text-secondary",
  },
};

const TYPE_LABEL: Record<NonNullable<EventRow["type"]>, string> = {
  "night-class": "Night Class",
  "pool-party": "Pool Party",
  "soiree-speciale": "Soirée spéciale",
};

export function EventsManager({ events }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventRow | null>(null);

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const startEdit = (event: EventRow) => {
    setEditing(event);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (e: React.FormEvent<HTMLFormElement>, title: string) => {
    if (!window.confirm(`Supprimer définitivement « ${title} » ?`)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-label text-text-secondary">
          {events.length} événement{events.length > 1 ? "s" : ""}
        </p>
        <AdminButton onClick={startCreate}>
          <Plus size={14} />
          Nouvel événement
        </AdminButton>
      </div>

      {events.length === 0 ? (
        <div className="border border-border-subtle bg-bg-surface px-8 py-16 text-center">
          <p className="font-heading text-xl uppercase tracking-wide text-text-primary">
            Aucun événement.
          </p>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Crée le premier — il apparaîtra immédiatement sur le site.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border-subtle bg-bg-surface">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-border-subtle bg-bg-elevated">
              <tr>
                <Th>Titre</Th>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Statut</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-border-subtle last:border-b-0 hover:bg-bg-elevated/50"
                >
                  <Td>
                    <p className="font-heading text-base uppercase tracking-wide text-text-primary">
                      {event.title}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-text-tertiary">
                      /{event.slug}
                    </p>
                  </Td>
                  <Td>
                    <p className="font-body text-sm text-text-primary">
                      {formatDate(event.date)}
                    </p>
                    <p className="mt-0.5 font-ui text-[10px] uppercase tracking-label text-text-secondary">
                      {formatTime(event.date)}
                    </p>
                  </Td>
                  <Td>
                    {event.type ? (
                      <span className="font-body text-sm text-text-secondary">
                        {TYPE_LABEL[event.type]}
                      </span>
                    ) : (
                      <span className="font-body text-sm text-text-tertiary">—</span>
                    )}
                  </Td>
                  <Td>
                    <span
                      className={`inline-flex border px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-label ${STATUS_LABEL[event.status].tone}`}
                    >
                      {STATUS_LABEL[event.status].label}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <AdminButton
                        variant="outline"
                        onClick={() => startEdit(event)}
                        aria-label="Modifier"
                      >
                        <Pencil size={13} />
                      </AdminButton>
                      <form
                        action={deleteEvent}
                        onSubmit={(e) => handleDelete(e, event.title)}
                      >
                        <input type="hidden" name="id" value={event.id} />
                        <AdminButton type="submit" variant="danger" aria-label="Supprimer">
                          <Trash2 size={13} />
                        </AdminButton>
                      </form>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={open}
        onClose={close}
        title={editing ? `Modifier · ${editing.title}` : "Nouvel événement"}
        size="lg"
      >
        <EventForm event={editing ?? undefined} onSuccess={close} />
      </Modal>
    </>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3.5 font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-5 py-4 align-top ${className}`}>{children}</td>;
}
