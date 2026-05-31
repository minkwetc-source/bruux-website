"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
} from "react";
import { ImagePlus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageThumbnail, type UploadItem } from "./ImageThumbnail";
import { uploadFile, validateImageFile } from "./uploadFile";

type Props = {
  folder: string;
  onUpload: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  /** Hidden input name so the URL(s) are submitted with the form. */
  name?: string;
  /** Existing URLs to pre-fill (edit mode). */
  initialUrls?: string[];
  /** Circular preview (member photos). */
  shape?: "square" | "circle";
};

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const seed = (urls: string[] | undefined): UploadItem[] =>
  (urls ?? [])
    .filter(Boolean)
    .map((url) => ({
      id: uid(),
      name: "image",
      previewUrl: url,
      status: "done" as const,
      progress: 100,
      url,
    }));

export function ImageUploader({
  folder,
  onUpload,
  multiple = false,
  maxFiles,
  name,
  initialUrls,
  shape = "square",
}: Props) {
  const [items, setItems] = useState<UploadItem[]>(() => seed(initialUrls));
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveMax = multiple ? maxFiles ?? 20 : 1;

  // Keep latest items + callback in refs for cleanup and change notifications.
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const onUploadRef = useRef(onUpload);
  onUploadRef.current = onUpload;

  const doneUrls = items
    .filter((i) => i.status === "done" && i.url)
    .map((i) => i.url as string);
  const doneKey = doneUrls.join("|");

  useEffect(() => {
    onUploadRef.current(doneKey ? doneKey.split("|") : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneKey]);

  useEffect(
    () => () => {
      itemsRef.current.forEach((i) => {
        if (i.previewUrl.startsWith("blob:")) URL.revokeObjectURL(i.previewUrl);
      });
    },
    [],
  );

  const runUpload = useCallback(
    async (item: UploadItem, file: File) => {
      try {
        const res = await uploadFile(file, folder, (p) =>
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, progress: p } : i)),
          ),
        );
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "done", progress: 100, url: res.url }
              : i,
          ),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Échec de l'upload.";
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: "error", error: message } : i,
          ),
        );
      }
    },
    [folder],
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      setError(null);
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      const valid: File[] = [];
      for (const file of incoming) {
        const validationError = validateImageFile(file);
        if (validationError) setError(validationError);
        else valid.push(file);
      }
      if (valid.length === 0) return;

      const makeItem = (file: File): UploadItem => ({
        id: uid(),
        name: file.name,
        previewUrl: URL.createObjectURL(file),
        status: "uploading",
        progress: 0,
      });

      if (!multiple) {
        const file = valid[0];
        if (!file) return;
        items.forEach((i) => {
          if (i.previewUrl.startsWith("blob:")) URL.revokeObjectURL(i.previewUrl);
        });
        const item = makeItem(file);
        setItems([item]);
        void runUpload(item, file);
        return;
      }

      const available = effectiveMax - items.length;
      if (available <= 0) {
        setError(`Maximum ${effectiveMax} images.`);
        return;
      }
      const accepted = valid.slice(0, available);
      if (accepted.length < valid.length) {
        setError(`Maximum ${effectiveMax} images — surplus ignoré.`);
      }
      const pairs = accepted.map((file) => ({ item: makeItem(file), file }));
      setItems((prev) => [...prev, ...pairs.map((p) => p.item)]);
      pairs.forEach(({ item, file }) => void runUpload(item, file));
    },
    [multiple, items, effectiveMax, runUpload],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const openPicker = () => inputRef.current?.click();

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const hiddenValue = multiple ? JSON.stringify(doneUrls) : doneUrls[0] ?? "";
  const canAddMore = multiple && items.length < effectiveMax;
  const label = multiple ? "Ajouter des photos" : "Ajouter une photo";

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
    >
      {name && (
        <input type="hidden" name={name} value={hiddenValue} readOnly />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {items.length === 0 ? (
        <button
          type="button"
          onClick={openPicker}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 border border-dashed px-6 py-12 text-center transition-colors",
            "bg-bg-surface hover:border-accent",
            isDragging ? "border-accent bg-accent-subtle" : "border-border-medium",
          )}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border-medium bg-bg-elevated text-accent">
            <Plus size={26} />
          </span>
          <span className="font-ui text-[12px] font-semibold uppercase tracking-button text-text-primary">
            {label}
          </span>
          <span className="font-body text-xs text-text-tertiary">
            Glisse-dépose ou clique · JPG, PNG, WebP, GIF · 10 Mo max
          </span>
        </button>
      ) : (
        <div
          className={cn(
            "rounded-none border border-dashed p-3 transition-colors",
            isDragging ? "border-accent bg-accent-subtle" : "border-border-subtle",
          )}
        >
          <div
            className={cn(
              multiple
                ? "grid grid-cols-3 gap-3 sm:grid-cols-4"
                : shape === "circle"
                  ? "mx-auto w-32"
                  : "w-full max-w-[220px]",
            )}
          >
            {items.map((item) => (
              <ImageThumbnail
                key={item.id}
                item={item}
                shape={shape}
                onRemove={removeItem}
              />
            ))}
            {canAddMore && (
              <button
                type="button"
                onClick={openPicker}
                className="flex aspect-square flex-col items-center justify-center gap-2 border border-dashed border-border-medium bg-bg-surface text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <ImagePlus size={22} />
                <span className="font-ui text-[9px] font-semibold uppercase tracking-label">
                  Ajouter
                </span>
              </button>
            )}
          </div>
          {multiple && (
            <p className="mt-3 font-body text-xs text-text-tertiary">
              {doneUrls.length} / {effectiveMax} prête
              {doneUrls.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 border border-red-900/50 bg-red-950/30 px-3 py-2 font-body text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
