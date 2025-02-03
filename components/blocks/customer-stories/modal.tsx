import { useEffect } from "react";
import DirectusImageClient from "@/components/shared/directus-image-client";
import { ModalProps } from "./types";

export default function Modal({
  isOpen,
  onClose,
  logo,
  modalCloseIcon,
  content,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        aria-label="Close Modal"
        className="absolute inset-0 bg-mistral-beige-deep/30 backdrop-blur-md"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") {
            onClose();
          }
        }}
      />

      <div className="relative z-50 max-h-[502px] w-[90%] max-w-2xl overflow-y-hidden rounded-md bg-white xl:max-h-max">
        <div className="flex items-center justify-between border-b border-mistral-beige-deep px-8 pb-6 pt-8">
          <div>
            {logo?.file && (
              <DirectusImageClient
                width={118}
                height={40}
                className="order-1 h-2xl-2 w-[118px] object-contain object-left md:order-2"
                asset={logo?.file}
              />
            )}
          </div>
          <button onClick={onClose} className="size-4">
            {modalCloseIcon?.image && (
              <DirectusImageClient
                width={16}
                height={16}
                className="size-4 object-cover"
                asset={modalCloseIcon?.image}
              />
            )}
          </button>
        </div>

        <div className="max-h-[438px] overflow-y-scroll px-8 py-4 pb-10 pt-6 text-[20px]/[24px] text-foreground xl:max-h-max xl:text-[20px]/[27px]">
          <div
            dangerouslySetInnerHTML={{ __html: content || "" }}
            className="pb-4 xl:pb-0"
          />
        </div>
      </div>
    </div>
  );
}
