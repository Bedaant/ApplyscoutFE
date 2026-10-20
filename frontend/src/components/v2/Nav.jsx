import { Wordmark } from "./Brand";

const LINKS = [
  ["How it works", "#how"],
  ["What it won't do", "#limits"],
  ["FAQ", "#faq"],
];

export const Nav = ({ onStart }) => (
  <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md" data-testid="nav">
    <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-8 px-5 lg:px-8">
      <a href="#top" data-testid="nav-logo-link" className="shrink-0"><Wordmark /></a>
      <nav className="hidden items-center gap-7 md:flex">
        {LINKS.map(([t, h]) => (
          <a key={h} href={h} data-testid={`nav-link-${h.slice(1)}`}
            className="text-[0.9rem] text-ash transition-colors hover:text-coal">{t}</a>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <button data-testid="nav-login-btn" className="hidden text-[0.9rem] text-ash transition-colors hover:text-coal sm:block">Log in</button>
        <button onClick={onStart} data-testid="nav-cta-btn"
          className="btn-o rounded-full px-4 py-2 text-[0.88rem] font-semibold">Get early access</button>
      </div>
    </div>
  </header>
);
