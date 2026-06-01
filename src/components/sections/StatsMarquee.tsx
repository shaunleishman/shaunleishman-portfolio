import { companies } from "@/content/projects";

export function StatsMarquee() {
  const stats = [
    { value: "3", label: "In-depth case studies" },
    { value: "Healthcare", label: "OMRON & NHS experience" },
    { value: "Co-design", label: "Workshop facilitation" },
    { value: "Mixed methods", label: "Research & testing" },
    { value: "6 weeks", label: "Longest project delivery" },
    { value: "Public sector", label: "NHS 111 research" },
  ];

  const doubled = [...stats, ...stats];

  return (
    <section
      aria-label="Career highlights"
      data-analytics-section="stats"
      className="py-12 bg-[var(--color-bg-dark)] text-white overflow-hidden border-y border-white/10"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((stat, i) => (
          <div
            key={`${stat.label}-${i}`}
            className="inline-flex flex-col px-12 min-w-[240px] border-r border-white/10"
          >
            <span className="text-h3 font-semibold tabular-nums">{stat.value}</span>
            <span className="text-body-sm text-neutral-400 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="container-site mt-8 pt-8 border-t border-white/10">
        <p className="text-label text-neutral-500 text-center mb-6">Companies worked with</p>
        <ul className="flex flex-wrap justify-center gap-8 md:gap-16" aria-label="Companies">
          {companies.map((company) => (
            <li
              key={company}
              className="text-body-lg font-semibold text-neutral-400"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
