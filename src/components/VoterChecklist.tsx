import Link from "next/link";
import {
  VOTER_CHECKLIST,
  VOTER_CHECKLIST_STATES,
  type VoterChecklistLink,
} from "@/data/voterChecklist";

function ChecklistLink({ href, label }: VoterChecklistLink) {
  const className = "font-medium text-navy hover:underline";
  if (href.startsWith("#")) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {label}
      </Link>
    );
  }
  return (
    <a className={className} href={href} rel="noopener noreferrer">
      {label}
    </a>
  );
}

export function VoterChecklist() {
  return (
    <section
      id={VOTER_CHECKLIST.id}
      aria-labelledby="voter-checklist-heading"
      className="rounded-xl border border-line bg-paper-card p-5"
    >
      <h2 id="voter-checklist-heading" className="font-serif text-xl font-semibold">
        {VOTER_CHECKLIST.name}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{VOTER_CHECKLIST.description}</p>
      <ol className="mt-5 list-decimal space-y-5 pl-5 marker:font-semibold marker:text-navy">
        {VOTER_CHECKLIST.steps.map((step) => (
          <li key={step.id} id={step.id} className="pl-1">
            <h3 className="font-semibold">{step.name}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{step.text}</p>
            {step.links.length > 0 ? (
              <p className="mt-2 text-sm leading-6">
                <span className="text-ink-muted">Links: </span>
                {step.links.map((link, index) => (
                  <span key={`${step.id}-${link.href}`}>
                    {index > 0 ? <span className="text-ink-muted"> · </span> : null}
                    <ChecklistLink href={link.href} label={link.label} />
                  </span>
                ))}
              </p>
            ) : null}
            {step.starterStates ? (
              <div className="mt-3">
                <p className="text-sm font-medium">Starter state sketches and hubs</p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {VOTER_CHECKLIST_STATES.map((state) => (
                    <li key={state.code} className="text-sm">
                      <Link className="font-medium text-navy hover:underline" href={state.ballotHref}>
                        {state.name} sample ballot
                      </Link>
                      <span className="text-ink-muted"> · </span>
                      <Link className="text-navy hover:underline" href={state.hubHref}>
                        state hub
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm leading-6 text-ink-muted">
        Sources:{" "}
        {VOTER_CHECKLIST.sources.map((source, index) => (
          <span key={source.url}>
            {index > 0 ? " · " : null}
            <a className="font-medium text-navy hover:underline" href={source.url} rel="noopener noreferrer">
              {source.name}
            </a>
          </span>
        ))}
        . Official primary pages only.
      </p>
    </section>
  );
}
