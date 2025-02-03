import { cn } from "@/lib/utils";

export default function VideoComponent({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <iframe
      title={"Video from " + src}
      src={src}
      className={cn("", className)}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
