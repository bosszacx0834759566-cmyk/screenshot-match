import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GodHeimer Technologies — Bridging Space and Earth" },
      { name: "description", content: "GodHeimer builds RobertCore, resilient space-to-ground communication infrastructure that adapts to hostile atmospheric conditions." },
      { property: "og:title", content: "GodHeimer Technologies — Bridging Space and Earth" },
      { property: "og:description", content: "RobertCore: reliable space-to-ground communication, engineered for real-world conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1105 1119" fill="none" className={className} role="img" aria-label="GodHeimer logo">
      <path d="M52.1687 18.9388L233.684 518.939C233.684 518.939 415.653 498.939 552.169 498.939C688.684 498.939 870.755 518.939 870.755 518.939L1052.17 18.9388" stroke="currentColor" strokeWidth="111" />
      <path d="M552.219 468.939L552.169 1118.94" stroke="currentColor" strokeWidth="111" />
    </svg>
  );
}

const nav = [
  ["RobertCore", "robertcore"],
  ["Challenge", "challenge"],
  ["Adaptive", "adaptive"],
  ["Leadership", "leadership"],
  ["Contact", "contact"],
];

function Label({ n, children }: { n: string; children: ReactNode }) {
  return <div className="section-label reveal"><span className="opacity-40">/{n}</span><span>{children}</span></div>;
}

function SectionLink({ href, children, className = "", down = false }: { href: string; children: ReactNode; className?: string; down?: boolean }) {
  return <Button asChild variant="editorial" className={`editorial-link text-xs ${className}`}><a href={href}>{children}{down ? <ArrowDown aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</a></Button>;
}

function Index() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("in"); reveal.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    const sections = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("section[id], footer[id]").forEach((el) => sections.observe(el));
    return () => { reveal.disconnect(); sections.disconnect(); };
  }, []);

  return (
    <main className="company-page bg-ink font-display text-paper">
      <a href="#challenge" className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:bg-paper focus:p-4 focus:text-ink">Skip to content</a>
      <header className="site-header sticky top-0 z-50 border-b border-line-light bg-paper text-ink">
        <div className="site-container flex h-20 items-center justify-between gap-6">
          <Button variant="editorial" asChild className="brand-link h-auto gap-3 p-0"><a href="#top" aria-label="GodHeimer home"><Logo className="brand-symbol" /><span className="text-sm font-bold">GODHEIMER<span className="mt-0.5 block text-[8px] font-normal">TECHNOLOGIES</span></span></a></Button>
          <nav aria-label="Main navigation" className="ml-auto hidden items-center gap-9 lg:flex">
            {nav.filter(([, id]) => ["robertcore", "leadership", "contact"].includes(id ?? "")).map(([label, id]) => <Button key={id} variant="editorial" asChild className={`nav-link h-auto p-0 text-[11px] uppercase ${active === id ? "opacity-100" : "opacity-70"}`}><a href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}{id === "contact" && <ArrowUpRight aria-hidden="true" />}</a></Button>)}
          </nav>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild><Button variant="editorial" className="ml-3 h-11 gap-4 p-0" aria-label="Open menu"><span className="hidden text-[10px] uppercase sm:inline">Menu</span><Menu /></Button></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink" />
              <Dialog.Content aria-describedby={undefined} className="site-container fixed inset-0 z-[61] flex max-w-none flex-col overflow-y-auto bg-ink pb-8 pt-6 font-display text-paper">
                <div className="flex items-center justify-between"><Dialog.Title className="flex items-center gap-3 text-sm font-bold"><Logo className="h-8 w-8" />GODHEIMER</Dialog.Title><Dialog.Close asChild><Button variant="editorial" size="icon" aria-label="Close menu"><X /></Button></Dialog.Close></div>
                <nav aria-label="Section navigation" className="menu-navigation my-auto flex flex-col gap-7 py-16">{nav.map(([label, id], i) => <Button variant="editorial" asChild key={id} className="editorial-link menu-link"><a href={`#${id}`} onClick={() => setOpen(false)}><span className="flex items-center gap-5"><span className="text-xs opacity-40">/0{i + 1}</span>{label}</span><ArrowUpRight /></a></Button>)}</nav>
                <a href="mailto:contact@godheimer.com" className="text-xs opacity-60">contact@godheimer.com</a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>

      <section id="top" className="hero-section bg-paper text-ink">
        <div className="site-container">
          <div className="reveal mb-12 flex items-center justify-between gap-6 text-[10px] uppercase"><span>Space-to-ground communication</span><span className="hidden opacity-60 sm:block">Engineered for the real world / 01</span></div>
          <h1 className="hero-title reveal">GodHeimer<span className="hero-title-secondary">Technologies.</span></h1>
        </div>
        <div className="site-container pb-10 pt-12">
          <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="hero-statement lg:col-span-7">Bridging Space and Earth.<br /><span className="text-ink/55">Reliably.</span></p>
            <div className="lg:col-span-4 lg:col-start-9"><p className="body-copy max-w-lg text-ink/70">We build resilient communication infrastructure between space and Earth — designed to perform even when the environment works against it.</p><SectionLink href="#robertcore" className="mt-7">Discover RobertCore</SectionLink></div>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-line-light pt-5 text-[10px]"><span className="text-ink/60">SPACE / EARTH / CONNECTION</span><SectionLink href="#robertcore" down>Explore the system</SectionLink></div>
        </div>
      </section>

      <section id="robertcore" className="section-space bg-ink">
        <div className="site-container">
          <Label n="01">RobertCore / The System</Label>
          <div className="product-layout mt-14 grid items-center gap-12 lg:grid-cols-12"><div className="min-w-0 lg:col-span-7"><p className="reveal mb-5 text-xs uppercase text-paper/60">Resilient by design.</p><h2 className="product-title reveal">RobertCore.</h2><p className="body-copy reveal mt-8 max-w-xl text-paper/70">RobertCore is a space-to-ground communication infrastructure developed by GodHeimer Technologies. It is designed to maintain reliable data transmission between space and Earth under changing and often hostile atmospheric conditions.</p><SectionLink href="#adaptive" className="reveal mt-9">Our adaptive approach</SectionLink></div><div className="reveal flex items-center justify-center py-8 lg:col-span-5"><Logo className="product-symbol" /></div></div>
        </div>
      </section>

      <section id="challenge" className="section-space bg-paper text-ink">
        <div className="site-container">
          <Label n="02">The Challenge</Label>
          <div className="mt-10 grid gap-10 lg:grid-cols-12"><h2 className="section-title reveal lg:col-span-7">The Challenge of<br className="hidden lg:block" /> Space-to-Earth Links</h2><div className="reveal lg:col-span-4 lg:col-start-9"><p className="body-copy text-ink/60">Traditional laser communication is highly efficient, yet extremely sensitive to weather. Clouds, rain, fog, and atmospheric turbulence can interrupt the link entirely.</p><p className="body-copy mt-7 font-semibold">In critical missions, any interruption is unacceptable.</p></div></div>
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">{["Clouds", "Rain", "Fog", "Turbulence"].map((t, i) => <div key={t} className="reveal min-w-0"><span className="text-[10px] text-ink/40">0{i + 1}</span><h3 className="mt-5 break-words text-sm font-medium sm:text-xl">{t}</h3><p className="mt-3 text-[10px] text-ink/50">Link disruption</p></div>)}</div>
        </div>
      </section>

      <section id="adaptive" className="section-space bg-ink text-paper">
        <div className="site-container">
          <Label n="03">Our Philosophy</Label>
          <h2 className="statement-title reveal mt-12 max-w-6xl">Communication Must Adapt to the Environment.</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">{[["Sense", "Understand changing atmospheric conditions in real time."], ["Decide", "No single method performs under every condition."], ["Adapt", "Respond intelligently to keep the link alive."]].map(([t, d], i) => <div key={t} className="reveal"><div className="flex items-center justify-between"><span className="text-[10px] text-paper/60">0{i + 1}</span><ArrowRight className="h-4 w-4 text-paper/60" aria-hidden="true" /></div><h3 className="mt-6 text-2xl sm:text-3xl">{t}</h3><p className="body-copy mt-5 max-w-xs text-paper/70">{d}</p></div>)}</div>
          <p className="body-copy reveal mt-16 max-w-2xl text-paper/70">A single communication method cannot always perform under every condition. The future requires systems that can understand changing environments and adapt intelligently.</p>
        </div>
      </section>

      <section className="section-space bg-paper text-ink">
        <div className="site-container"><Label n="04">Atmosphere</Label><div className="mt-10 grid gap-10 lg:grid-cols-12"><h2 className="section-title reveal lg:col-span-7">Weather Changes<br />Everything.</h2><p className="body-copy reveal text-ink/70 lg:col-span-4 lg:col-start-9">Clouds, rain, and atmospheric conditions can severely affect how information travels between space and Earth. These challenges demand communication systems specifically engineered to respond to real-world conditions — not ideal ones.</p></div></div>
      </section>

      <section id="leadership" className="section-space bg-paper text-ink">
        <div className="site-container"><Label n="05">Founder &amp; Leadership</Label><div className="mt-12 grid items-center gap-12 lg:grid-cols-12"><div className="reveal flex justify-start py-6 lg:col-span-4"><Logo className="h-32 w-32 sm:h-44 sm:w-44" /></div><div className="min-w-0 lg:col-span-8"><h2 className="section-title reveal">Natthakorn “Boss”<br />Mueangsangsri</h2><p className="reveal mt-6 text-[11px] leading-relaxed text-ink/50">Founder &amp; CEO, GodHeimer Technologies</p><p className="body-copy reveal mt-8 max-w-xl text-ink/60">Building adaptive and resilient space-to-ground communication systems for the most demanding environments.</p></div></div></div>
      </section>

      <footer id="contact" className="section-space bg-ink pb-8">
        <div className="site-container"><Label n="06">Contact &amp; Follow</Label><div className="mt-10 grid gap-12 lg:grid-cols-12"><div className="lg:col-span-7"><h2 className="section-title reveal">Get in Touch.</h2><div className="reveal mt-10 flex flex-col items-start gap-5">{["boss@godheimer.com", "contact@godheimer.com"].map((e) => <Button asChild variant="editorial" key={e} className="editorial-link max-w-full break-all text-sm sm:text-xl"><a href={`mailto:${e}`}>{e}<ArrowUpRight aria-hidden="true" /></a></Button>)}</div></div><div className="reveal lg:col-span-4 lg:col-start-9"><p className="mb-7 text-[10px] text-paper/50">Follow GodHeimer</p><div className="grid gap-6">{[["Facebook", "facebook.com/godheimer"], ["Instagram", "instagram.com/godheimerhj"], ["X", "x.com/godheimerhj"], ["LinkedIn", "linkedin.com/company/godheimer"]].map(([n, u]) => <Button asChild variant="editorial" key={n} className="editorial-link text-xs"><a href={`https://${u}`} target="_blank" rel="noreferrer">{n}<ArrowUpRight aria-hidden="true" /></a></Button>)}</div></div></div><div className="mt-24 flex flex-col justify-between gap-6 border-t border-line-dark pt-7 md:flex-row md:items-center"><a href="#top" aria-label="Back to GodHeimer home" className="flex items-center gap-3"><Logo className="h-7 w-7" /><span className="text-[10px] font-semibold">GODHEIMER TECHNOLOGIES</span></a><p className="text-[8px] leading-relaxed text-paper/40">© {new Date().getFullYear()} GODHEIMER TECHNOLOGIES. ALL RIGHTS RESERVED.</p><SectionLink href="#top">Back to top</SectionLink></div></div>
      </footer>
    </main>
  );
}
