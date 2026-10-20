import { Reveal, FoxChip, AvatarCluster } from "./Bits";
import { motion } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";

const Chip = ({ children, bg }) => (
  <span className={`mx-1 inline-grid h-[1.5em] w-[1.5em] place-items-center rounded-[10px] align-middle ${bg}`}>
    {children}
  </span>
);

export const Statement = () => (
  <section className="px-5 py-16 md:py-24" data-testid="statement">
    <Reveal className="mx-auto max-w-[62rem] text-center">
      <h2 className="font-display text-[1.75rem] leading-[1.28] text-ink sm:text-[2.3rem] lg:text-[2.7rem]">
        <span className="text-[#3B6FE0]">ApplyScout reads the postings</span> that went live while you slept
        <Chip bg="bg-mint"><FileText size={16} className="text-[#1F7A52]" /></Chip>
        writes the first draft from <span className="text-fox">facts you confirmed yourself</span>
        <FoxChip w={62} className="mx-1.5 -mt-1" />
        and then stops, because the part that decides whether you get the interview
        <AvatarCluster size={34} count={3} className="mx-1.5 -mt-1" />
        is still <span className="text-[#E1457B]">yours to press</span>.
        <Chip bg="bg-lilac"><ShieldCheck size={16} className="text-[#5A33B0]" /></Chip>
      </h2>
    </Reveal>

    <motion.p
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mx-auto mt-8 max-w-[34rem] text-center text-base leading-relaxed text-slate"
    >
      No blind auto-apply. No invented experience. No hundred applications you never read going out under
      your name.
    </motion.p>
  </section>
);
