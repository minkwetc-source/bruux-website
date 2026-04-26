"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/utils";

// Numéro ticketing BRUUX (cf. docs/INFOS-BRUUX.md §3).
const DEFAULT_PHONE = "24165467224";
const DEFAULT_MESSAGE = "Bonjour BRUUX, j'aimerais en savoir plus.";

type Props = {
  phone?: string;
  message?: string;
};

/**
 * Bouton flottant WhatsApp — toujours visible, pulse animé.
 * Essentiel au Gabon (cf. DESIGN.md §7 Mobile-Specific Rules).
 */
export function WhatsAppFloat({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
}: Props) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      <div className="relative">
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-[#25D366]"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.a
          href={whatsappLink(phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter BRUUX sur WhatsApp"
          className="pointer-events-auto relative flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] md:h-16 md:w-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
        </motion.a>
      </div>
    </div>
  );
}
