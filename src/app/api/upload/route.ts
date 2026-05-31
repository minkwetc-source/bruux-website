import { NextResponse } from "next/server";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { getAdminUser } from "@/lib/supabase/admin";

// Cloudinary uploads stream files in memory — keep this on the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_FOLDERS = [
  "bruux/galerie",
  "bruux/events",
  "bruux/blog",
  "bruux/famille",
];

type UploadedImage = {
  url: string;
  public_id: string;
  width: number;
  height: number;
};

let configured = false;

/**
 * Configure le SDK Cloudinary à la première requête.
 * Lève une erreur explicite si une variable serveur manque.
 */
function configureCloudinary() {
  if (configured) return;

  const cloud_name =
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Configuration Cloudinary incomplète : CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET sont requis dans .env.local.",
    );
  }

  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
  configured = true;
}

/**
 * Insère f_auto,q_auto dans l'URL de livraison pour servir un format et une
 * qualité optimisés (WebP/AVIF selon le navigateur) sans retoucher l'original.
 */
function optimizedUrl(secureUrl: string): string {
  return secureUrl.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

function uploadBuffer(
  buffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload Cloudinary échoué."));
          return;
        }
        resolve(result);
      },
    );
    stream.end(buffer);
  });
}

export async function POST(request: Request) {
  // Seul un admin connecté peut téléverser.
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    configureCloudinary();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Configuration Cloudinary invalide.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Requête invalide (FormData attendu)." },
      { status: 400 },
    );
  }

  const folderRaw = String(formData.get("folder") ?? "bruux/galerie").trim();
  const folder = ALLOWED_FOLDERS.includes(folderRaw)
    ? folderRaw
    : "bruux/galerie";

  // Accepte un champ unique « file » ou multiple « files ».
  const files = [
    ...formData.getAll("files"),
    ...formData.getAll("file"),
  ].filter((entry): entry is File => entry instanceof File);

  if (files.length === 0) {
    return NextResponse.json(
      { error: "Aucun fichier reçu." },
      { status: 400 },
    );
  }

  // Validation avant tout upload : on rejette le lot entier si un fichier est invalide.
  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Format non supporté : « ${file.name} ». Formats acceptés : JPG, PNG, WebP, GIF.`,
        },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `Fichier trop volumineux : « ${file.name} » dépasse 10 Mo.`,
        },
        { status: 400 },
      );
    }
  }

  try {
    const results: UploadedImage[] = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadBuffer(buffer, folder);
        return {
          url: optimizedUrl(res.secure_url),
          public_id: res.public_id,
          width: res.width,
          height: res.height,
        };
      }),
    );

    return NextResponse.json({ results });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Échec de l'upload Cloudinary.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
