# Mechanical testing — actual execution
27 September 2026. Node built-in test runner against the application's domain module.

Initial run: 9 tests, 6 passed, 3 failed. Raw output in evidence/mechanical-before.txt.

| Real defect | Reproduction | Correction |
|---|---|---|
| Zero exposure permitted expansion | Both weeks have zero scheduled hours and zero priority records | Pause with “Sin evidencia suficiente” |
| Incomplete persisted object accepted | Stored object has version/arrays but no weeks or valid units | Validate complete state shape, enumerations, numeric ranges, event prediction and references; reset invalid state |
| Missing driver context permitted support proposal | Select “Sin contexto suficiente” and request equipment review | Reject support proposal until context is obtained |

Regression run: 9/9 passed, 0 failed. Raw output in evidence/mechanical-after.txt. Bugs were found while testing the original implementation; none were inserted for the assignment.

Browser walkthrough on localhost: generated C-05 record stayed absent from dispatcher queue; appeared as “Solo titular”; owner shared; Despacho A submitted driver context/equipment review; Confirmar apoyo disabled for A; Despacho B approved; status became Apoyo acordado. Screenshot evidence captured for persona testing.

Scope: synthetic data and demo roles only. No hardware, real offline network outage, real users, authentication or production safety outcomes tested. Offline mode means simulator queue behavior, not an offline-installed PWA.
