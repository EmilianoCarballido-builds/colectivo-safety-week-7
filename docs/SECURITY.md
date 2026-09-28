# Assignment security floor
- Secrets: no API keys, tokens, passwords or .env files in source. ML, geodata and sensors run locally. Repository is public by user request.
- Personal data/auth: no personal-data inputs; only invented unit IDs, fixed choices, demo roles and simulated samples. No real people in seeds. Role selector is not authentication. Google/Supabase Auth required before real personal data; production use blocked by scope.
- RLS: no database or Supabase tables in this prototype. RLS is not applicable to the shipped synthetic demo; must be enabled/tested if production storage is introduced.
- Forms: bounded integer units 1–25, fixed turn/context/outcome enums, seven required checks, duplicate rejection, sensor numeric bounds. Persisted state validated on load; interpolated strings escaped. No user content enters a prompt or database.
- Demo labels: top-level banner, map disclaimer, sensor labels, model card and owner view identify fictional data and synthetic training.
- Hosting hardening: explicit static build output excludes repository docs; CSP restricts scripts to self, denies framing and objects; geolocation/camera/microphone disabled; MIME sniffing disabled. Google Fonts requests remain external typography only, with system fallback.
- Limits: browser storage is editable by its owner and roles are simulated. No multi-user authorization or hardware/offline-PWA guarantee. Local demo reset erases its stored record set; proposed 30-day retention and incident holds apply only to a future real pilot.
