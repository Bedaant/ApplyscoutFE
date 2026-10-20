import { motion } from "framer-motion";
import { Phone } from "./Phone";
import { JobCard, FactsCard, ApprovalCard } from "./StageCards";
import { HandArrow } from "./Hand";
import { EASE } from "./Motion";

const Settle = ({ children, delay, className = "", rotate = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: rotate - 1.5 }}
    whileInView={{ opacity: 1, y: 0, rotate }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Stage = () => (
  <div data-testid="product-stage">
    {/* mobile / tablet: phone then two cards */}
    <div className="flex flex-col items-center gap-5 lg:hidden">
      <Settle delay={0.1}><Phone /></Settle>
      <Settle delay={0.25} rotate={-0.6}><JobCard /></Settle>
      <Settle delay={0.4} rotate={0.5}><ApprovalCard /></Settle>
    </div>

    {/* desktop: floating composition joined by drawn arrows */}
    <div className="relative hidden h-[620px] lg:block">
      <Settle delay={0.15} className="absolute left-[36%] top-2 z-10"><Phone /></Settle>

      <Settle delay={0.4} rotate={-1.2} className="absolute left-0 top-12 z-20"><JobCard /></Settle>
      <Settle delay={0.6} rotate={1} className="absolute bottom-10 left-[6%] z-20"><FactsCard /></Settle>
      <Settle delay={0.8} rotate={-0.8} className="absolute right-0 top-[44%] z-20 xl:-right-10"><ApprovalCard /></Settle>

      <HandArrow
        className="absolute left-[46%] top-[20px] h-[52px] w-[70px] -translate-x-[150%]"
        viewBox="0 0 70 52"
        d="M2 40 C 14 38, 26 30, 36 20 C 44 12, 54 8, 66 9"
        head="M58 4 L 66.5 9.2 L 58.5 15"
        delay={0.9}
      />
      <HandArrow
        className="absolute bottom-[112px] left-[14%] h-[90px] w-[150px]"
        viewBox="0 0 150 90"
        d="M4 6 C 10 30, 24 54, 52 70 C 80 86, 118 84, 144 72"
        head="M136 64 L 145.5 71.8 L 134 79"
        delay={1.05}
      />
      <HandArrow
        className="absolute right-[26%] top-[40%] h-[64px] w-[86px]"
        viewBox="0 0 86 64"
        d="M84 54 C 70 56, 54 50, 40 38 C 28 28, 16 18, 4 14"
        head="M12 6 L 3.2 13.6 L 13 21"
        delay={1.2}
      />
    </div>
  </div>
);
