# GAEKS Frontend Design Direction

Owner update: 2026-11-27. This direction is shared by Codex Cloud and local through `AGENTS.md` and `docs/PROJECT_STANDARDS.md`. Read the checked-in Anti Slop, UI/UX Pro Max, and Modern Web Guidance skills for relevant work.

## Product and audience

GAEKS is a freight forwarding and customs operations website for importers, exporters, procurement teams, and operations staff. The interface should help visitors choose a service, estimate cargo, inspect a route, and contact the team without reading a dashboard full of competing cards.

## Visual direction

- Reference: the calm hierarchy and task based entry points used by Hapag-Lloyd.
- Identity: deep maritime teal, cyan for actions, warm off white canvas, and neutral borders.
- Character: a contemporary freight editorial. Strong photographic crops, an asymmetric overview, and an elevated inquiry surface give depth; manifest-style rows organize supporting details.
- Typography: clear sans serif body copy with a stronger display weight for headings.
- Imagery: real freight, port, aircraft, warehouse, and trucking scenes used only where they explain the service.

## Interface dials

- ENERGY: 2/3
- RHYTHM: 3/3
- MOTION: 1/3 for service/contact pages; existing home carousel retains its controlled transitions.

Reading this as: a B2B freight service and inquiry experience for importers and operations teams, in a maritime editorial style, ENERGY 2 / RHYTHM 3 / MOTION 1.

Stylish must also be efficient. Avoid a flat scaffold of thin-bordered equal cards, excessive whitespace on mobile, and repeated full contact directories. Depth comes from photography and one raised task surface, not glow, glass, or decorative motion. Keep one visible primary action and let visitors reveal secondary information when needed.

Motion supports orientation and continuity. The hero service headline advances automatically with a short opacity and vertical transition plus manual controls. It pauses during pointer or keyboard interaction and disables automatic movement when reduced motion is requested. Glowing surfaces and decorative loops are not used.

## Density rules

1. One primary message and one primary action per section.
2. Large data collections use searchable lists and native disclosures.
3. Supporting details stay collapsed until requested.
4. The home page links to specialist tools instead of embedding each complete tool.
5. Claims, live status, and metrics require a maintained source; otherwise they do not appear.
6. Controls have a minimum target height of 44 pixels and visible keyboard focus.

## Page patterns

- Home: editorial hero, three task shortcuts, optional network badges, compact service list, optional client logos, process list, and latest updates.
- Hero visual: operator-managed image, GIF, or video sits behind the main message with a fixed contrast layer. The service carousel appears as a floating editorial headline on the same visual field, without a second image or boxed panel. On smaller screens a visible rule separates the main message and service headline.
- Services: seven indexed disclosure rows.
- Tracking: one search field followed directly by API status and a vertical milestone timeline.
- Calculator: grouped input disclosures and one persistent results panel.
- Routes: mode, search, region filter, then route disclosures.
- News: search, category select, compact article rows, and a restrained article layout.
- Newsletter: one clearly bounded signup panel with a visible email field, consent, and one action.
- Contact: a compact identity and relevant contact panel beside one raised inquiry form. Other contacts follow the form in a disclosure, never a long directory blocking the task.
- Service detail: a maritime-colored overview with a real service photograph; a concise scope summary; editorial detail disclosures; approved experience statements; service-specific questions; one inquiry form. Section compositions follow content, not identical card grids.

## Content voice

Use direct operational language. Avoid hype, vague superiority claims, fake urgency, and generic software language. Explain what the visitor can do and what information is needed next.

## Performance rules

- Specialist pages load as separate chunks.
- Render service carousel text without loading a second hero image.
- Pause carousel movement during hover or keyboard interaction and honor reduced motion preferences.
- Keep the footer compact through short line lengths, shallow section padding, and tightly grouped navigation while preserving 44 pixel interaction targets.
- Keep network/client logo sections absent when they have no valid operator data.
- Show a responsive poster immediately, then request hero video only on desktop after page load during browser idle time. Keep the poster on tablets, phones, data saver, 3G or slower, and reduced motion.
- Use cache headers for versioned static assets. Cookies are not used as a caching mechanism.

## Operator workspace direction

Reading this as: internal publishing workspace for freight operations staff, in an editorial shipping-manifest visual language, dial ENERGY 1 / RHYTHM 2 / MOTION 1.

- Color: deep maritime teal keeps the operator area distinct from public content; warm off white is reserved for the login task so form controls stay calm and legible.
- Layout: the login uses an asymmetric identity and task split because brand context and authentication have different jobs; the authenticated workspace uses a stable navigation rail because operators revisit modules frequently.
- Typography: the existing sans serif stack stays in place for fast scanning and reliable Indonesian text rendering across staff devices.
- Spacing: dense forms use a compact rhythm, while page headers and module boundaries receive larger separation so long editing sessions remain easy to scan.
- Panels: related settings use clear grouped surfaces and visible module boundaries. Selective elevation may identify the active editing task; avoid a lifeless uniformly flat workspace or a shadow on every field.
- Icons: icons remain only where they identify a concrete operator action or module, such as media, users, saving, synchronization, and logout.
- Motion: animation is limited to active loading indicators and short interaction transitions; routine editing does not need decorative movement.

## Decisions and rationale for service CMS release

- Color: existing deep teal anchors the brand; warm canvas reduces visual fatigue for operational reading; cyan is reserved for the primary action against teal.
- Typography: retain Inter and the system fallback already used by GAEKS for consistent Indonesian labels, predictable metrics, and no extra font dependency. Larger balanced headings provide hierarchy without decorative type.
- Composition: split the service overview between the service promise and cargo photography; on phones the promise and CTA appear before the image.
- Elevation: a restrained shadow belongs to the inquiry form so the next task is visually distinct from reference content.
- Rhythm: compare choices in a real table, scope in a list, detailed guidance and FAQ in disclosures, and owner-confirmed experience in a contrasting editorial section.
- Photography: use existing CMS images only; a photo illustrates a service and does not imply proof of a specific client shipment.
- Controls: native details/summary retain keyboard behavior without an accordion dependency. More than one item may remain open for comparison.
- Modern typography: apply `text-wrap: balance` only to short headings; unsupported browsers keep normal readable wrapping. Do not apply it globally.
- Fixed light theme: the public operational reading surface stays light with teal brand regions for established brand continuity and readable dense forms; no theme toggle is introduced by this change.
- UI/UX Pro Max search: `logistics freight corporate` returned a logistics operations pattern with useful hierarchy/accessibility checks. Its blue/orange palette, live metrics, trial CTA, and Playfair font are rejected as unsuitable for GAEKS; `freight forwarding` had no product match. These are recommendations, not a replacement brand or evidence.
- Footer (latest owner correction, 2026-11-27): retain the lifted tracking panel, compact navigation, and company identity. Show the CS, Info, and Aksa email addresses on every page; move phone selection to `/kontak/telepon/` through a clearly named link. Do not choose a single phone or email based on the active service in the footer.
- Phone directory: a maritime intro establishes context; one elevated directory surface groups teams by normalized phone number, avoiding three repetitions of the FCL/PPJK/Undername number. Each row pairs service coverage with the number and explicit WhatsApp/call actions. A narrower preparation note helps customers start a useful conversation. Mobile puts the directory before that note. CMS owns contact data, service coverage, headings, and instructions. Plain breadcrumbs explain the three-level hierarchy; no ornamental icons, invented response times, or live availability badges.
