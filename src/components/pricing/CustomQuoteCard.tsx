import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomQuoteCard({
  categoryId,
  title,
  description,
  startingPriceNPR,
  includedFeatures,
  className = "bg-background border border-border rounded-xl overflow-hidden",
  contentClassName = "p-8 md:p-12",
}: {
  categoryId: string;
  title: string;
  description: string;
  startingPriceNPR: number;
  includedFeatures: string[];
  className?: string;
  contentClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className={className}>
      <div className={contentClassName}>
        <h3 className="font-display text-3xl md:text-4xl mb-4">{title}</h3>
        <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl mb-12">
          {description}
        </p>

        <div className="flex flex-wrap items-end justify-between gap-6 pb-10 border-b border-border">
          <div>
            <div className="font-mono-tech text-muted-foreground text-sm mb-2">Starting at</div>
            <div className="font-display text-4xl">{formatCurrency(startingPriceNPR)}+</div>
            <p className="text-sm text-foreground/50 italic mt-2">
              Indicative only. Final pricing is confirmed after a short discovery call.
            </p>
          </div>
          <Link
            to="/contact"
            search={{ service: categoryId }}
            className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
          >
            Request a Custom Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium hover:text-foreground/80 transition-colors"
          >
            See what's typically included
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm text-foreground/70">
                    {includedFeatures.map((f, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-muted-foreground">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
