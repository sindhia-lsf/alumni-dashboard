import { cn } from "@/lib/utils";

export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="Lightship Alumni">
      <div className={cn("relative grid h-9 w-9 place-items-center rounded-[11px]", inverse ? "bg-[#FDE9A4]" : "bg-[#2E477D]")}>
        <span className={cn("font-display text-xl leading-none", inverse ? "text-[#243B6B]" : "text-[#FDE9A4]")}>L</span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-current bg-[#DE3038]" />
      </div>
      {!compact && (
        <div className="leading-none">
          <div className={cn("text-[15px] font-bold tracking-[0.14em]", inverse ? "text-white" : "text-[#21345E]")}>LIGHTSHIP</div>
          <div className={cn("mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]", inverse ? "text-white/60" : "text-[#21345E]/50")}>Alumni network</div>
        </div>
      )}
    </div>
  );
}
