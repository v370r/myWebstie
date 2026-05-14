# Resume Redesign: Expanded Timeline

## Overview

Replace the current tab-based resume section with a visual timeline featuring expandable role tiles, categorized skills, and compact education cards.

## Architecture

### Layout Structure
- Single scrollable section, no tabs, no sidebar
- Two-column layout on desktop: timeline (left) + skills/education (right)
- Single column on mobile: timeline on top, skills/education below
- Active section switching uses `display: none/block` (already in place)

### Timeline Component
- Vertical timeline with dot markers and connecting lines
- Each role displayed as a compact tile showing: title, company, dates, tech stack chips
- Click a tile to expand it inline — shows bullet-point details, full tech stack, company info
- Only one tile expanded at a time (accordion pattern)
- Smooth expand/collapse animation using `max-height` transition
- Visual distinction: expanded tile has `border-left: 3px solid var(--main-color)` and subtle glow

### Three Roles (current data)
1. **Backend Engineer & Tech Lead** — Aragorn Racing Corp · 2025 · Remote
2. **Founding Engineer — GetMyURI** — app.getmyuri.com · 2025
3. **Software Engineer — ADP Vantage** — ADP · 2021-2024 · Hyderabad

### Categorized Skills
Groups: Backend, Cloud & DevOps, Frontend, AI/ML, Tools
- Displayed as chips grouped under category headings
- No separate "Skills" tab — visible alongside timeline

### Education
- Compact cards (no tabs): M.S. Computer Science (CU Boulder), B.Tech (IIT Hyderabad)
- Shows degree, school, year, GPA

### Removed
- "About Me" tab — info lives on the home page

## Implementation Plan

### Files Modified
1. **index.html** — Replace resume section HTML with timeline + skills + education layout
2. **css/style.css** — Add timeline styles, accordion styles, skill category styles, education card styles
3. **js/script.js** — Add accordion toggle logic (expand/collapse, one-at-a-time)

### Accordion Logic
- Add `click` listener to each timeline tile
- On click: remove `expanded` class from all tiles, add to clicked tile
- CSS `max-height` transition for smooth expand/collapse
- Store expanded state in a data attribute for accessibility

### Mobile Considerations
- Stack timeline above skills/education
- Constrain timeline scroll with `max-height` on mobile
- Ensure touch targets are large enough (min 44px)
