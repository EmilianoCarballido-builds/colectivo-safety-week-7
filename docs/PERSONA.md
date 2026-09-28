# PERSONA — Emiliano Carballido
## Method
A fresh-context agent read four screenshots from the working app in order and role-played Rosa, a fictional dispatcher. This is a screenshot-based synthetic walkthrough, not a real interview or measured usability study. No actual clicks were performed by the persona. Full unedited response: PERSONA_RAW.md.

The Operator brief provides Spanish explanations, limited dispatcher time, shared vehicles, driver context and second-review needs. Rosa's name, age 46 and WhatsApp familiarity were invented assumptions. The task: generate a reading, receive as owner, share, review with context, obtain independent review.

## Findings and changes
| Confusion | Severity | Change |
|---|---|---|
| Disabled second-review buttons do not explain the next actor or how to continue | High; primary fix | Prominent handoff message and “Continuar como Despacho B (simulación)” preserves the selected event; distinct-review domain check stays enforced |
| New reading does not enter dispatcher queue, could look lost | High | Generate opens the owner's new record directly and explains sharing |
| Owner list does not reveal how to share | High | Visible “Abrir y compartir este registro” affordance and per-record recipient/scope explanation |
| “Titular” ambiguous for shared vehicles | High | Define as conductor or association that owns measurement |
| “100% confidence” may look like proof of wrongdoing | High | Queue says synthetic model agreement and immediately states it does not determine a fault |
| Map/metrics precede work queue, technical numbers, meaning of confirming support | Medium | Retained as follow-up hypotheses; warning and handoff clarify support is pending, not equipment resolved |

## Interpretation
These improvements address predicted friction, not validated real-user outcomes. Persona did not establish completion rates, timing or satisfaction. Mechanical browser checks independently establish functional behavior. A real dispatcher/driver study is still required before any pilot.
