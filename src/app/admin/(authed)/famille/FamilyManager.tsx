"use client";

import { useState } from "react";
import { Instagram, Pencil, Plus, Trash2 } from "lucide-react";
import type { MemberRow, MemberSection } from "@/lib/supabase/types";
import { Modal } from "../Modal";
import { AdminButton } from "../ui";
import { MemberForm } from "./MemberForm";
import { deleteMember } from "./actions";

const SECTION_LABELS: Record<MemberSection, string> = {
  direction: "Direction",
  "division-artistique": "Division Artistique",
  mannequins: "Mannequins",
  influenceurs: "Influenceurs",
  "section-a": "Section A",
};

type Props = {
  members: MemberRow[];
};

export function FamilyManager({ members }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MemberRow | null>(null);

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (m: MemberRow) => {
    setEditing(m);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (
    e: React.FormEvent<HTMLFormElement>,
    name: string,
  ) => {
    if (!window.confirm(`Retirer ${name} de la famille BRUUX ?`)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-label text-text-secondary">
          {members.length} membre{members.length > 1 ? "s" : ""}
        </p>
        <AdminButton onClick={startCreate}>
          <Plus size={14} />
          Nouveau membre
        </AdminButton>
      </div>

      {members.length === 0 ? (
        <div className="border border-border-subtle bg-bg-surface px-8 py-16 text-center">
          <p className="font-heading text-xl uppercase tracking-wide text-text-primary">
            Aucun membre.
          </p>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Ajoute le premier — il apparaîtra sur /famille.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border-subtle bg-bg-surface">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-border-subtle bg-bg-elevated">
              <tr>
                <Th>Membre</Th>
                <Th>Section</Th>
                <Th>Instagram</Th>
                <Th>Ordre</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-border-subtle last:border-b-0 hover:bg-bg-elevated/50"
                >
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar member={m} />
                      <div>
                        <p className="font-heading text-base uppercase tracking-wide text-text-primary">
                          {m.name}
                        </p>
                        {m.role && (
                          <p className="mt-0.5 font-body text-xs text-text-secondary">
                            {m.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td>
                    {m.section ? (
                      <span className="font-body text-sm text-text-secondary">
                        {SECTION_LABELS[m.section]}
                      </span>
                    ) : (
                      <span className="font-body text-sm text-text-tertiary">—</span>
                    )}
                  </Td>
                  <Td>
                    {m.instagram ? (
                      <a
                        href={`https://instagram.com/${m.instagram.replace(/^@/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors hover:text-accent"
                      >
                        <Instagram size={13} />
                        {m.instagram}
                      </a>
                    ) : (
                      <span className="font-body text-sm text-text-tertiary">—</span>
                    )}
                  </Td>
                  <Td>
                    <span className="font-body text-sm text-text-secondary">
                      {m.display_order}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <AdminButton variant="outline" onClick={() => startEdit(m)}>
                        <Pencil size={13} />
                      </AdminButton>
                      <form
                        action={deleteMember}
                        onSubmit={(e) => handleDelete(e, m.name)}
                      >
                        <input type="hidden" name="id" value={m.id} />
                        <AdminButton type="submit" variant="danger">
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
        title={editing ? `Modifier · ${editing.name}` : "Nouveau membre"}
        size="lg"
      >
        <MemberForm member={editing ?? undefined} onSuccess={close} />
      </Modal>
    </>
  );
}

function Avatar({ member }: { member: MemberRow }) {
  if (member.photo_url) {
    return (
      <img
        src={member.photo_url}
        alt={member.name}
        className="h-10 w-10 rounded-full border border-border-subtle object-cover"
      />
    );
  }
  const initials = member.name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated font-heading text-sm uppercase tracking-wider text-text-secondary">
      {initials}
    </span>
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
