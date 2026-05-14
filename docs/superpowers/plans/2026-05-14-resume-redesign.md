# Resume Redesign: Expanded Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tab-based resume section with a scrollable layout featuring an expandable timeline, education cards, flat skills grid, and a dedicated AI/LLM section.

**Architecture:** Single-column layout on mobile, two-column on desktop. The left column contains a vertical timeline with accordion-expandable role tiles. The right column stacks education cards, a flat skills grid, and an AI/LLM skill grid. No sidebar tabs — everything visible on scroll.

**Tech Stack:** Vanilla HTML/CSS/JS, boxicons, Font Awesome, coreui-icons.

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html:322-837` | Replace entire resume section with new timeline layout |
| `css/style.css:924-1163` | Replace resume CSS — timeline, accordion, skills grid, education cards, mobile breakpoints |
| `js/script.js:70-86` | Replace tab-switching logic with accordion toggle |
| `test-portfolio.png` | Visual verification via Playwright screenshots |

---

### Task 1: Replace Resume Section HTML

**Files:**
- Modify: `index.html:322-837`

- [ ] **Step 1: Replace the resume section**

Replace lines 322-837 (`<section class="resume" id="resume">` through `</section>`) with:

```html
  <!-- resume section -->
  <section class="resume" id="resume" aria-label="Resume section">
    <h2 class="heading">My <span>Resume</span></h2>
    <div class="resume-container">
      <!-- Timeline column -->
      <div class="resume-column">
        <h3 class="resume-heading">Experience</h3>
        <div class="timeline">
          <div class="timeline-line"></div>

          <!-- Role 1: Aragorn Racing -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content" data-role="aragorn">
              <div class="timeline-header">
                <div>
                  <h4>Backend Engineer & Tech Lead</h4>
                  <p class="timeline-meta">Aragorn Racing Corp · 2025 · Remote</p>
                </div>
                <span class="timeline-toggle" aria-label="Expand role">▸</span>
              </div>
              <div class="timeline-tech">
                <span class="tech-chip">AWS CDK</span>
                <span class="tech-chip">Lambda</span>
                <span class="tech-chip">Aurora PostgreSQL</span>
                <span class="tech-chip">EventBridge</span>
                <span class="tech-chip">SQS</span>
                <span class="tech-chip">S3</span>
                <span class="tech-chip">Cognito</span>
                <span class="tech-chip">CloudWatch</span>
              </div>
              <div class="timeline-detail">
                <ul>
                  <li>Architected fully serverless AWS stack (API Gateway, Lambda, Aurora PostgreSQL Serverless v2, EventBridge, SQS, S3, VPC) using AWS CDK for infrastructure as code</li>
                  <li>Designed domain models, PostgreSQL schemas, and secure REST APIs with AWS Cognito authentication</li>
                  <li>Built CI/CD pipelines with structured logging via Lambda Powertools, CloudWatch dashboards, and Dead Letter Queues for fault-tolerant event processing</li>
                  <li>Own end-to-end system design, infrastructure strategy, and API architecture for a digital horse racing analytics platform</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Role 2: Teaching Assistant -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content" data-role="ta">
              <div class="timeline-header">
                <div>
                  <h4>Teaching Assistant</h4>
                  <p class="timeline-meta">CU Boulder · 2025 · Boulder, CO</p>
                </div>
                <span class="timeline-toggle" aria-label="Expand role">▸</span>
              </div>
              <div class="timeline-tech">
                <span class="tech-chip">WCAG 2.1</span>
                <span class="tech-chip">ARIA</span>
                <span class="tech-chip">WAVE</span>
                <span class="tech-chip">Inclusive Design</span>
              </div>
              <div class="timeline-detail">
                <ul>
                  <li>Supported instruction for 50+ students per semester across accessibility-focused courses</li>
                  <li>Graded assignments and provided detailed feedback on WCAG 2.1 compliance and inclusive design</li>
                  <li>Evaluated student projects using WAVE accessibility tools and collaborated with professors on course materials</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Role 3: GetMyURI -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content" data-role="getmyuri">
              <div class="timeline-header">
                <div>
                  <h4>Founding Engineer — GetMyURI</h4>
                  <p class="timeline-meta">app.getmyuri.com · 2025</p>
                </div>
                <span class="timeline-toggle" aria-label="Expand role">▸</span>
              </div>
              <div class="timeline-tech">
                <span class="tech-chip">Spring Boot</span>
                <span class="tech-chip">Redis</span>
                <span class="tech-chip">MongoDB</span>
                <span class="tech-chip">GKE</span>
                <span class="tech-chip">Helm</span>
                <span class="tech-chip">Jenkins</span>
              </div>
              <div class="timeline-detail">
                <ul>
                  <li>Developed high-performance URL shortening platform handling 200K+ requests/sec with custom aliases, location-based access, and password protection</li>
                  <li>Deployed on Google Kubernetes Engine with Jenkins CI/CD and Helm for orchestration, ensuring scalability and fault tolerance</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Role 4: ADP Vantage -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content" data-role="adp">
              <div class="timeline-header">
                <div>
                  <h4>Software Engineer — ADP Vantage</h4>
                  <p class="timeline-meta">ADP · 2021-2024 · Hyderabad, India</p>
                </div>
                <span class="timeline-toggle" aria-label="Expand role">▸</span>
              </div>
              <div class="timeline-tech">
                <span class="tech-chip">Spring Boot</span>
                <span class="tech-chip">Kafka</span>
                <span class="tech-chip">Angular</span>
                <span class="tech-chip">Kubernetes</span>
                <span class="tech-chip">Jenkins</span>
                <span class="tech-chip">Selenium BDD</span>
              </div>
              <div class="timeline-detail">
                <ul>
                  <li>Led monolith-to-microservices migration for ADP Vantage payroll platform, improving deployment velocity by ~60%</li>
                  <li>Built Apache Kafka event-driven pipelines processing 1M+ messages/day with sub-second latency</li>
                  <li>Delivered Angular Unified Interface improving page performance by ~45% and reducing redundant backend calls by ~35%</li>
                  <li>Implemented Selenium BDD smoke tests, cutting manual QA effort by ~80%</li>
                  <li>Mentored and onboarded 15+ new engineers; optimized Spring Boot services via caching and query tuning</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Role 5: Peacock Solar -->
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content" data-role="peacock">
              <div class="timeline-header">
                <div>
                  <h4>Data Analyst Intern</h4>
                  <p class="timeline-meta">Peacock Solar · May-Aug 2020</p>
                </div>
                <span class="timeline-toggle" aria-label="Expand role">▸</span>
              </div>
              <div class="timeline-tech">
                <span class="tech-chip">Python</span>
                <span class="tech-chip">Selenium</span>
                <span class="tech-chip">SQL</span>
                <span class="tech-chip">Looker Studio</span>
              </div>
              <div class="timeline-detail">
                <ul>
                  <li>Automated data collection and preprocessing using Python, Selenium, and SQL, streamlining workflows and reducing processing time</li>
                  <li>Built interactive dashboards in Looker Studio delivering actionable insights that boosted sales conversion by 25%</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Right column: Education, Skills, AI/LLM -->
      <div class="resume-column">

        <!-- Education -->
        <div class="resume-subsection">
          <h3 class="resume-heading">Education</h3>
          <div class="education-grid">
            <div class="education-card">
              <div class="edu-icon"><i class="bx bx-graduation-cap"></i></div>
              <h4>M.S. Computer Science</h4>
              <p class="edu-school">University of Colorado Boulder</p>
              <p class="edu-year">2024-2026 · GPA: 3.8/4.0</p>
              <p class="edu-detail">GenAI Software Development, Big Data Architecture, Linux System Administration, CS Capstone (sponsor pWin.ai)</p>
            </div>
            <div class="education-card">
              <div class="edu-icon"><i class="bx bx-graduation-cap"></i></div>
              <h4>B.Tech</h4>
              <p class="edu-school">Indian Institute of Technology Hyderabad</p>
              <p class="edu-year">2017-2021 · GPA: 3.7/4</p>
              <p class="edu-detail">Data Structures and Algorithms, Data Analytics, AI and ML, Statistics, Software Engineering</p>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="resume-subsection">
          <h3 class="resume-heading">Skills</h3>
          <div class="skills-grid" id="skills-grid">
            <div class="skill-item"><i class="bx bxl-java"></i><span>Java</span></div>
            <div class="skill-item"><i class="cib-spring"></i><span>Spring Boot</span></div>
            <div class="skill-item"><i class="bx bxl-python"></i><span>Python</span></div>
            <div class="skill-item"><i class="bx bxl-javascript"></i><span>JavaScript</span></div>
            <div class="skill-item"><i class="bx bxl-typescript"></i><span>TypeScript</span></div>
            <div class="skill-item"><i class="fa-solid fa-database"></i><span>SQL</span></div>
            <div class="skill-item"><i class="bx bxl-nodejs"></i><span>Node.js</span></div>
            <div class="skill-item"><i class="bx bxl-angular"></i><span>Angular</span></div>
            <div class="skill-item"><i class="fa-brands fa-react"></i><span>React</span></div>
            <div class="skill-item"><i class="fa-solid fa-bolt"></i><span>Next.js</span></div>
            <div class="skill-item"><i class="fa-solid fa-arrows-spin"></i><span>CI/CD</span></div>
            <div class="skill-item"><i class="bx bxl-docker"></i><span>Docker</span></div>
            <div class="skill-item"><i class="bx bxl-kubernetes"></i><span>Kubernetes</span></div>
            <div class="skill-item"><i class="fa-brands fa-jenkins"></i><span>Jenkins</span></div>
            <div class="skill-item"><i class="bx bxl-git"></i><span>Git</span></div>
            <div class="skill-item"><i class="bx bxl-github"></i><span>GitHub Actions</span></div>
            <div class="skill-item"><i class="bx bxl-aws"></i><span>AWS</span></div>
            <div class="skill-item"><i class="fa-brands fa-aws"></i><span>Lambda</span></div>
            <div class="skill-item"><i class="fa-solid fa-server"></i><span>Serverless</span></div>
            <div class="skill-item"><i class="fa-solid fa-code-branch"></i><span>Terraform</span></div>
            <div class="skill-item"><i class="fa-solid fa-vial"></i><span>Selenium BDD</span></div>
            <div class="skill-item"><i class="fa-solid fa-chart-line"></i><span>CloudWatch</span></div>
            <div class="skill-item"><i class="fa-solid fa-microchip"></i><span>JMeter</span></div>
            <div class="skill-item"><i class="fa-brands fa-linux"></i><span>Linux</span></div>
            <div class="skill-item"><i class="fa-brands fa-jira"></i><span>JIRA</span></div>
            <div class="skill-item"><i class="fa-solid fa-terminal"></i><span>Bash</span></div>
            <div class="skill-item"><i class="bx bxl-visual-studio"></i><span>VS Code</span></div>
            <div class="skill-item"><i class="fa-solid fa-fire"></i><span>Firebase</span></div>
          </div>
        </div>

        <!-- AI & LLM -->
        <div class="resume-subsection">
          <h3 class="resume-heading">AI & LLM Systems</h3>
          <div class="skills-grid ai-llm-grid" id="ai-llm-grid">
            <div class="skill-item"><img src="https://cdn.simpleicons.org/claude" alt="Claude" loading="lazy" /><span>Claude Code</span></div>
            <div class="skill-item"><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg" alt="Codex" loading="lazy" /><span>Codex</span></div>
            <div class="skill-item"><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/open-source-initiative.svg" alt="Open Source" loading="lazy" /><span>Open Source LLMs</span></div>
            <div class="skill-item"><img src="https://cdn.simpleicons.org/langchain" alt="LangChain" loading="lazy" /><span>LangChain</span></div>
            <div class="skill-item"><img src="https://cdn.simpleicons.org/langgraph" alt="LangGraph" loading="lazy" /><span>LangGraph</span></div>
            <div class="skill-item"><i class="fa-solid fa-layer-group"></i><span>RAG Pipelines</span></div>
            <div class="skill-item"><i class="fa-solid fa-robot"></i><span>Agentic AI</span></div>
            <div class="skill-item"><i class="fa-solid fa-microscope"></i><span>LLM Fine-tuning</span></div>
            <div class="skill-item"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Prompt Engineering</span></div>
            <div class="skill-item"><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/postgresql.svg" alt="pgvector" loading="lazy" /><span>pgvector</span></div>
            <div class="skill-item"><i class="fa-solid fa-database"></i><span>FAISS</span></div>
            <div class="skill-item"><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/hugging-face.svg" alt="Hugging Face" loading="lazy" /><span>Hugging Face</span></div>
            <div class="skill-item"><i class="fa-solid fa-shield-halved"></i><span>Evals & Guardrails</span></div>
            <div class="skill-item"><img src="https://cdn.simpleicons.org/streamlit" alt="Streamlit" loading="lazy" /><span>Streamlit</span></div>
            <div class="skill-item"><img src="https://cdn.simpleicons.org/anthropic" alt="Anthropic" loading="lazy" /><span>Anthropic</span></div>
            <div class="skill-item"><img src="https://cdn.simpleicons.org/hermes" alt="Hermes" loading="lazy" /><span>Hermes</span></div>
            <div class="skill-item"><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openclaw-dark.svg" alt="OpenClaw" loading="lazy" /><span>OpenClaw</span></div>
            <div class="skill-item"><img src="https://cdn.simpleicons.org/qiskit" alt="Qiskit" loading="lazy" /><span>Qiskit</span></div>
            <div class="skill-item"><i class="fa-solid fa-sitemap"></i><span>Transfer Learning</span></div>
          </div>
        </div>

      </div>
    </div>
  </section>
```

- [ ] **Step 2: Verify HTML structure**

Check that the resume section has these new classes: `.resume-container`, `.resume-column`, `.timeline`, `.timeline-item`, `.timeline-content`, `.timeline-header`, `.timeline-detail`, `.education-grid`, `.education-card`, `.skills-grid`, `.skill-item`, `.ai-llm-grid`

No more `.resume-btn`, `.resume-detail`, `.resume-list`, or `.resume-item` in the resume section.

---

### Task 2: Replace Resume CSS

**Files:**
- Modify: `css/style.css:924-1163` (resume styles)
- Modify: `css/style.css` ~1464-1653 (992px breakpoint resume styles)
- Modify: `css/style.css` ~1770-1932 (768px breakpoint resume styles)

- [ ] **Step 1: Replace desktop resume CSS**

Replace the old resume styles (`.resume-container` through `.resume-detail.about .resume-item p span`, roughly lines 924-1163) with:

```css
/* === NEW RESUME STYLES === */

/* Resume layout */
.resume-container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: start;
}

.resume-heading {
    font-size: 2.4rem;
    color: var(--main-color);
    margin-bottom: 2rem;
    font-weight: 600;
}

.resume-subsection {
    margin-bottom: 3rem;
}

/* Timeline */
.timeline {
    position: relative;
    padding-left: 3rem;
}

.timeline-line {
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(124, 240, 61, 0.2);
}

.timeline-item {
    position: relative;
    margin-bottom: 1.5rem;
}

.timeline-dot {
    position: absolute;
    left: -3rem;
    top: 6px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--main-color);
    border: 3px solid var(--bg-color);
    z-index: 1;
}

.timeline-content {
    background: var(--second-bg-color);
    border-radius: 1rem;
    padding: 2rem;
    border-left: 3px solid transparent;
    transition: border-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.timeline-content.expanded {
    border-left-color: var(--main-color);
    box-shadow: 0 0 15px rgba(124, 240, 61, 0.08);
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.timeline-header h4 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
}

.timeline-meta {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0.3rem 0 0;
}

.timeline-toggle {
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
    transition: color 0.3s, transform 0.3s;
}

.timeline-content.expanded .timeline-toggle {
    color: var(--main-color);
    transform: rotate(90deg);
}

/* Tech chips */
.timeline-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 1.2rem 0;
}

.tech-chip {
    background: rgba(124, 240, 61, 0.08);
    color: var(--main-color);
    padding: 0.4rem 1rem;
    border-radius: 0.6rem;
    font-size: 1.3rem;
    font-weight: 500;
}

.timeline-content.expanded .tech-chip {
    background: rgba(124, 240, 61, 0.12);
}

/* Timeline detail (collapsed by default) */
.timeline-detail {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, margin 0.3s ease;
}

.timeline-content.expanded .timeline-detail {
    max-height: 500px;
    margin-top: 1.5rem;
}

.timeline-detail ul {
    margin: 0;
    padding-left: 1.8rem;
}

.timeline-detail li {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 0.8rem;
}

.timeline-detail li:last-child {
    margin-bottom: 0;
}

/* Education cards */
.education-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.education-card {
    background: var(--second-bg-color);
    border-radius: 1rem;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.edu-icon {
    font-size: 4rem;
    color: var(--main-color);
}

.education-card h4 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
}

.edu-school {
    font-size: 1.5rem;
    color: var(--white-color);
    margin: 0;
}

.edu-year {
    font-size: 1.3rem;
    color: var(--main-color);
    margin: 0;
}

.edu-detail {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    line-height: 1.5;
}

/* Skills grid (flat, no categories) */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1.5rem;
}

.skill-item {
    background: var(--second-bg-color);
    border-radius: 0.8rem;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.skill-item:hover {
    border-color: var(--main-color);
}

.skill-item i {
    font-size: 5rem;
    transition: color 0.3s;
}

.skill-item:hover i {
    color: var(--main-color);
}

.skill-item img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    filter: grayscale(100%) brightness(0) invert(1);
    transition: filter 0.3s;
}

.skill-item:hover img {
    filter: none;
}

.skill-item span {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
}

/* AI & LLM specific overrides */
.ai-llm-grid {
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
}
```

- [ ] **Step 2: Update 992px breakpoint resume styles**

Find and replace the resume styles in the `@media (max-width: 992px)` block (around lines 1464-1470):

Replace:
```css
    .resume-container,
```
and
```css
    .resume-container {
```

With a single override in the 992px block:
```css
    .resume-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
```

Remove all old resume tab/button styles from this breakpoint (`.resume-box:first-child`, `.resume-box:first-child .resume-btn`, etc.).

Add:
```css
    .education-grid {
        grid-template-columns: 1fr;
    }
```

- [ ] **Step 3: Update 768px breakpoint resume styles**

Find and replace resume styles in the `@media (max-width: 768px)` block (around lines 1519-1653).

Remove old styles for `.resume-box:first-child`, `.resume-detail .resume-list`, `.resume-detail.about`, `.resume-detail.skills`, `.resume-detail.ai-llm`.

Add:
```css
    .resume-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .resume-heading {
        font-size: 2rem;
    }

    .timeline {
        padding-left: 2.5rem;
    }

    .timeline-dot {
        left: -2.5rem;
        width: 14px;
        height: 14px;
    }

    .timeline-content {
        padding: 1.5rem;
    }

    .timeline-header h4 {
        font-size: 1.5rem;
    }

    .timeline-meta {
        font-size: 1.2rem;
    }

    .timeline-detail li {
        font-size: 1.2rem;
    }

    .tech-chip {
        font-size: 1.1rem;
        padding: 0.3rem 0.8rem;
    }

    .education-card {
        padding: 2rem;
    }

    .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 1rem;
    }

    .skill-item {
        padding: 1.5rem 1rem;
    }

    .skill-item i {
        font-size: 4rem;
    }

    .skill-item img {
        width: 4rem;
        height: 4rem;
    }

    .skill-item span {
        font-size: 1.2rem;
    }

    .ai-llm-grid {
        grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    }
```

- [ ] **Step 4: Remove dead CSS**

Search for and remove any remaining old resume styles that are no longer referenced:
- `.resume-box .resume-btn` and `.resume-box .resume-btn.active`
- `.resume-detail` and `.resume-detail.active`
- `.resume-list` and all `.resume-list` variants (scrollbar, hover, etc.)
- `.resume-detail.skills`, `.resume-detail.ai-llm`, `.resume-detail.about` and their children
- `.resume-detail.skills .resume-item:hover span` (tooltip styles — no longer needed)

Keep only the new resume styles.

---

### Task 3: Replace Resume JS with Accordion Logic

**Files:**
- Modify: `js/script.js:70-86`

- [ ] **Step 1: Replace tab-switching JS**

Replace lines 70-86 (the `resumeBtns` event listeners) with:

```javascript
// Timeline accordion
document.querySelectorAll('.timeline-content').forEach((content) => {
  content.addEventListener('click', () => {
    const isExpanded = content.classList.contains('expanded');

    // Close all
    document.querySelectorAll('.timeline-content').forEach((c) => {
      c.classList.remove('expanded');
    });

    // Toggle clicked
    if (!isExpanded) {
      content.classList.add('expanded');
    }
  });
});
```

- [ ] **Step 2: Verify no other JS references old resume classes**

Search `js/script.js` for `resume-btn`, `resume-detail`, `resume-list`, `resume-item`. If any remain outside the accordion code above, they should be removed since they reference old tab-based structure.

---

### Task 4: Visual Verification

**Files:**
- Read: `test-portfolio.png` (existing screenshots)

- [ ] **Step 1: Start the dev server**

```bash
npx http-server . -p 8892 -c-1 --cors
```

- [ ] **Step 2: Run Playwright test**

```bash
node test-iphone16.js
```

Verify screenshots show:
- `test-iphone16-resume.png`: Timeline with role tiles visible, education cards below, skills grid, AI/LLM grid — all in one scrollable page
- No blank space between sections
- No sidebar tabs or buttons
- Accordion tiles expand on click (can test manually in browser)

- [ ] **Step 3: Manual browser test**

Open `http://localhost:8892` in a browser. Navigate to Resume. Click each role tile to verify:
- Only one role expands at a time
- Arrow icon rotates on expand
- Tech chips are visible in collapsed state
- Bullet details appear below chips when expanded
- Scroll works naturally without inner scrollbars

---

### Task 5: Commit

- [ ] **Step 1: Review changes**

```bash
git diff --stat
```

Expected changes: `index.html`, `css/style.css`, `js/script.js`

- [ ] **Step 2: Commit**

```bash
git add index.html css/style.css js/script.js
git commit -m "redesign resume section: expandable timeline, education cards, flat skills, AI/LLM section"
```
