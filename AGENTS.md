# DH 101 Website Rules

## Project Context
- This is Natan Silva's personal website for Introduction to Digital Humanities (DH 101) at Denison University.
- The site is built with Jekyll and hosted on GitHub Pages.
- Preserve the existing cyberpunk design, colors, fonts, and effects. Extend the current CSS and plain JavaScript rather than redesigning the site.
- Weekly activity pages live in `makes/`; source activity PDFs live in `assets/pdfs/`; copied artwork belongs in `assets/img/`.

## Make-to-Week Mapping
- Week 1 is Make 1 and is already written in `makes/week01.md`.
- Week 2 has no Make because it was used to build the website. Do not create `makes/week02.md`.
- Week 3 is Make 2.
- Week 4 is Make 3.
- Week 5 is Make 4.
- Week 6 is Make 5.
- Week 7 is Make 6.
- Week 8 is Make 7.
- Week 9 is Make 8.
- Week 10 is Make 9.
- Week 11 is Make 10.
- Week 12 is Make 11.
- Week 13 is Make 12.
- Starting with Make 2, Make N belongs in week N+1. Match source PDFs by filename and verify their contents.

## Writing Rules
- Write activity pages in English using the existing first-person voice and clear, natural grammar.
- Use activity front matter for `title`, `week`, `make_number`, `tags`, and a short `summary`.
- Keep the existing activity structure: artifact, process or commentary, reflection, and AI attribution as supported by the source.
- Do not invent personal experiences, tools, prompts, results, or reflections. Improve grammar and flow without changing the author's meaning.
- If a PDF is missing or its content is unreadable or does not match the expected week, leave that activity page untouched and list the gap for Natan. Do not guess.
- Mark genuinely missing source details with a clear TODO comment and include them in the final report.
- Give every copied image a meaningful filename and descriptive alternative text.

## Technical Rules
- Follow Jekyll and GitHub Pages conventions. Use `site.baseurl` for internal links and asset paths.
- Use plain HTML, CSS, JavaScript, Liquid, and Markdown. Add no runtime dependencies unless necessary and explain any addition.
- Keep activity metadata in front matter or one central data file so adding an activity does not require layout-code edits.
- Build responsive, mobile-first pages while preserving the existing visual system.
- Use small, clearly named commits for requested work. Never discard existing user changes.

## Accessibility Rules
- Use semantic HTML, one clear page-level heading, meaningful landmarks, and native controls where possible.
- Provide meaningful alt text for every informative image.
- All interactive controls must work by keyboard and show a visible focus state.
- Add ARIA only when native HTML does not provide the required semantics; keep labels and state accurate.
- Maintain WCAG AA text contrast, including neon and muted colors.
- Respect `prefers-reduced-motion` for animation and visual effects.
- Give embedded Kumu content a descriptive title and a text alternative. If no verified Kumu URL is available, show a clearly labeled placeholder instead of guessing.
