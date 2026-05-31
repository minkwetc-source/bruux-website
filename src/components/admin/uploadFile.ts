export type UploadedImage = {
  url: string;
  public_id: string;
  width: number;
  height: number;
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

/**
 * Valide un fichier côté client (miroir de la validation serveur).
 * Renvoie un message d'erreur français, ou null si le fichier est valide.
 */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return `« ${file.name} » : format non supporté (JPG, PNG, WebP ou GIF).`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `« ${file.name} » dépasse la limite de 10 Mo.`;
  }
  return null;
}

/**
 * Téléverse un fichier vers /api/upload via XHR pour suivre la progression.
 * Appelle onProgress(0-100) pendant l'envoi et résout avec l'image uploadée.
 */
export function uploadFile(
  file: File,
  folder: string,
  onProgress: (percent: number) => void,
): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText) as {
            results?: UploadedImage[];
          };
          const result = data.results?.[0];
          if (result) {
            onProgress(100);
            resolve(result);
          } else {
            reject(new Error("Réponse inattendue du serveur."));
          }
        } catch {
          reject(new Error("Réponse du serveur illisible."));
        }
        return;
      }

      let message = "Échec de l'upload.";
      try {
        message = (JSON.parse(xhr.responseText) as { error?: string }).error ?? message;
      } catch {
        /* garde le message par défaut */
      }
      reject(new Error(message));
    };

    xhr.onerror = () => reject(new Error("Erreur réseau pendant l'upload."));
    xhr.onabort = () => reject(new Error("Upload annulé."));

    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("file", file);
    xhr.send(formData);
  });
}
