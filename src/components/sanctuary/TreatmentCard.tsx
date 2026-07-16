import { Button } from "@/components/ui/button";

interface TreatmentProps {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceIdr: number;
  onBook: (id: string) => void;
}

export function TreatmentCard({ id, name, description, durationMinutes, priceIdr, onBook }: TreatmentProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(priceIdr);

  return (
    <div className="card-treatment group bg-surface-1 border border-border p-6 rounded-md hover:border-primary/40 hover:bg-surface-2 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-serif text-2xl text-text-main group-hover:text-primary transition-colors">{name}</h3>
        <div className="text-right">
          <div className="text-base font-semibold text-text-main">{formattedPrice}</div>
          <div className="text-xs text-text-muted">{durationMinutes} mins</div>
        </div>
      </div>
      <p className="text-base text-text-mid mb-8 min-h-[80px]">
        {description}
      </p>
      <Button 
        onClick={() => onBook(id)} 
        variant="outline" 
        className="w-full border-border text-text-main hover:bg-white/5 hover:text-text-main hover:border-text-main rounded-sm"
      >
        Select Treatment
      </Button>
    </div>
  );
}
