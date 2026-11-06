import { useEffect, useRef, useState } from "react";
import { ImagePlus, Eraser, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fileToDataUrl } from "@/lib/store";

export function PhotoUploader({
  photos,
  onChange,
  max = 8,
  label = "Add photos",
}: {
  photos: string[];
  onChange: (p: string[]) => void;
  max?: number;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const add = async (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (photos.length + list.length > max) {
      toast.error(`Maximum ${max} photos`);
      return;
    }
    const urls = await Promise.all(list.map((f) => fileToDataUrl(f)));
    onChange([...photos, ...urls]);
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {photos.map((p, i) => (
          <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-md border bg-muted">
            <img src={p} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => onChange(photos.filter((_, j) => j !== i))}
              className="absolute right-1 top-1 rounded-full bg-card/90 p-1 text-foreground shadow"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {photos.length < max && (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-md border border-dashed text-xs text-muted-foreground transition-colors hover:border-success hover:text-success"
          >
            <ImagePlus className="h-5 w-5" />
            {label}
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          add(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function SignaturePad({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange: (v?: string) => void;
  label: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(!value);

  useEffect(() => {
    const c = canvas.current!;
    const ratio = window.devicePixelRatio || 1;
    c.width = c.offsetWidth * ratio;
    c.height = c.offsetHeight * ratio;
    const ctx = c.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = getComputedStyle(c).color;
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, c.offsetWidth, c.offsetHeight);
      img.src = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const c = canvas.current!;
            c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
            setEmpty(true);
            onChange(undefined);
          }}
        >
          <Eraser /> Clear
        </Button>
      </div>
      <div className="relative">
        <canvas
          ref={canvas}
          aria-label={label}
          className="h-32 w-full touch-none rounded-md border border-dashed bg-card text-primary"
          onPointerDown={(e) => {
            drawing.current = true;
            const ctx = canvas.current!.getContext("2d")!;
            ctx.beginPath();
            ctx.moveTo(...pos(e));
            canvas.current!.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = canvas.current!.getContext("2d")!;
            ctx.lineTo(...pos(e));
            ctx.stroke();
            setEmpty(false);
          }}
          onPointerUp={() => {
            drawing.current = false;
            if (!empty || canvas.current) onChange(canvas.current!.toDataURL("image/png"));
          }}
        />
        {empty && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            Sign here
          </span>
        )}
      </div>
    </div>
  );
}
