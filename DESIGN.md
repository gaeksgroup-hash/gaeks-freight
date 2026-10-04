# GAEKS Frontend Design Direction

## Product and audience

GAEKS is a freight forwarding and customs operations website for importers, exporters, procurement teams, and operations staff. The interface should help visitors choose a service, estimate cargo, inspect a route, and contact the team without reading a dashboard full of competing cards.

## Visual direction

- Reference: the calm hierarchy and task based entry points used by Hapag-Lloyd.
- Identity: deep maritime teal, cyan for actions, warm off white canvas, and neutral borders.
- Character: editorial shipping manifest. Rows, rules, indexes, and concise labels organize information.
- Typography: clear sans serif body copy with a stronger display weight for headings.
- Imagery: real freight, port, aircraft, warehouse, and trucking scenes used only where they explain the service.

## Interface dials

- ENERGY: 1/5
- RHYTHM: 2/5
- MOTION: 2/5

Motion supports orientation and continuity. The hero service carousel advances automatically with a restrained pan, directional transition, progress line, and manual controls. It pauses during pointer or keyboard interaction and disables automatic movement when reduced motion is requested. Glowing surfaces and decorative loops are not used.

## Density rules

1. One primary message and one primary action per section.
2. Large data collections use searchable lists and native disclosures.
3. Supporting details stay collapsed until requested.
4. The home page links to specialist tools instead of embedding each complete tool.
5. Claims, live status, and metrics require a maintained source; otherwise they do not appear.
6. Controls have a minimum target height of 44 pixels and visible keyboard focus.

## Page patterns

- Home: editorial hero, three task shortcuts, compact service list, process list, and latest updates.
- Hero visual: service carousel populated from operator-managed service titles, taglines, and photos. The first frame renders without waiting for the animation bundle; slide numbering and UI metadata are omitted.
- Services: seven indexed disclosure rows.
- Tracking: one search field followed directly by API status and a vertical milestone timeline.
- Calculator: grouped input disclosures and one persistent results panel.
- Routes: mode, search, region filter, then route disclosures.
- News: search, category select, compact article rows, and a restrained article layout.
- Contact: contact details beside one structured inquiry form.
- Service detail: one overview, one image, and three disclosure groups.

## Content voice

Use direct operational language. Avoid hype, vague superiority claims, fake urgency, and generic software language. Explain what the visitor can do and what information is needed next.

## Performance rules

- Specialist pages and the Framer Motion carousel load as separate chunks.
- Render one hero slide at a time and preload only the next image.
- Pause carousel movement during hover or keyboard interaction and honor reduced motion preferences.
- Keep the footer compact through short line lengths, shallow section padding, and tightly grouped navigation while preserving 44 pixel interaction targets.
- Use cache headers for versioned static assets. Cookies are not used as a caching mechanism.
