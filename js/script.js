const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

const activePage = () => {
  const header = document.querySelector('header');
  const barsBox = document.querySelector('.bars-box');

  header.classList.remove('active');
  setTimeout(() => {
    header.classList.add('active');
  }, 1100);

  navLinks.forEach((link) => {
    link.classList.remove('active');
  });

  barsBox.classList.remove('active');
  setTimeout(() => {
    barsBox.classList.add('active');
  }, 1100);

  sections.forEach((section) => {
    section.classList.remove('active');
  });

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      activePage();
      link.classList.add('active');
      setTimeout(()=> {
        sections[idx].classList.add('active');
      }, 1100)
    }
  });
});

logoLink.addEventListener('click', () => {
  if(!navLinks[0].classList.contains('active')) {
    activePage();
    navLinks[0].classList.add('active');

    setTimeout(() => {
      sections[0].classList.add('active');
    }, 1100);
  }
});

// "View Services" button on landing page
const servicesBtn = document.getElementById('view-services-btn');
if (servicesBtn) {
  servicesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks[1]?.click(); // Services is the 2nd nav link
  });
}

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

const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left"
);

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');
  if (!imgSlide || !portfolioDetails.length) return;

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach(detail => {
    detail.classList.remove('active');
  });

  portfolioDetails[index].classList.add('active');

};

if (arrowRight) {
  arrowRight.addEventListener('click', () => {
    if (index < 2) {
      index++;
      arrowLeft.classList.remove("disabled");
    } else {
      index = 3;
      arrowRight.classList.add("disabled");
    }
    activePortfolio();
  });
}

if (arrowLeft) {
  arrowLeft.addEventListener("click", () => {
    if (index > 0) {
      index--;
      arrowRight.classList.remove("disabled");
    } else {
      index = 0;
      arrowLeft.classList.add("disabled");
    }
    activePortfolio();
  });
}

// Contact form submission via fetch (no redirect)
const contactForm = document.querySelector('form[action*="formsubmit.co"]');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.style.display = 'block';
        formStatus.style.color = '#7cf03d';
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        contactForm.reset();
      } else {
        formStatus.style.display = 'block';
        formStatus.style.color = '#ff6b6b';
        formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
      }
    } catch (err) {
      formStatus.style.display = 'block';
      formStatus.style.color = '#ff6b6b';
      formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 8000);
  });
}

// Resume pill tab switching
document.querySelectorAll('.resume-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs and panels
    document.querySelectorAll('.resume-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.resume-panel').forEach(p => {
      p.classList.remove('active');
    });

    // Activate clicked tab and its panel
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panelId = `panel-${tab.dataset.tab}`;
    document.getElementById(panelId)?.classList.add('active');
  });
});

// Service detail modals
const serviceData = {
  backend: {
    title: 'Backend <span>Development</span>',
    description: 'Designing robust APIs and scalable microservices using Java, Spring Boot, PostgreSQL, Kafka, and MongoDB. I specialize in distributed systems that handle millions of events daily with sub-second latency.',
    metrics: [
      { value: '60%', label: 'Faster deployments' },
      { value: '1M+', label: 'Messages/day via Kafka' },
      { value: '200K+', label: 'Requests/sec' },
      { value: '15+', label: 'Engineers mentored' }
    ],
    experience: [
      {
        role: 'Backend Engineer & Technical Lead',
        company: 'Aragorn Racing Corporation (2025 - Present)',
        desc: 'Architected fully serverless AWS stack (API Gateway, Lambda, Aurora PostgreSQL Serverless v2, EventBridge, SQS, S3, VPC) using AWS CDK. Designed domain models, PostgreSQL schemas, and secure REST APIs with AWS Cognito authentication. Implemented structured logging with Lambda Powertools and Dead Letter Queues for fault-tolerant processing.'
      },
      {
        role: 'Software Engineer — ADP Vantage',
        company: 'ADP (2021 - 2024)',
        desc: 'Built and optimized Spring Boot microservices and REST APIs with caching, connection pooling, and query optimization. Led monolith-to-microservices migration introducing distributed tracing and centralized logging. Built Apache Kafka event-driven pipelines processing 1M+ messages/day with sub-second latency.'
      },
      {
        role: 'Founding Engineer — GetMyURI.com',
        company: 'app.getmyuri.com (2025 - Present)',
        desc: 'Developed a high-performance URL shortening platform using Spring Boot, Redis, and MongoDB handling 200K+ requests/sec. Implemented custom aliases, location-based access, and password protection.'
      }
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'REST APIs', 'GraphQL', 'AWS CDK', 'Lambda', 'Aurora Serverless', 'EventBridge']
  },
  web: {
    title: 'Web <span>Application Development</span>',
    description: 'Building dynamic and scalable web applications using Java, Spring Boot, Node.js, Angular, and React. From responsive frontends to full-stack applications with modern frameworks and CI/CD pipelines.',
    metrics: [
      { value: '45%', label: 'Better page performance' },
      { value: '35%', label: 'Fewer backend calls' },
      { value: '500+', label: 'Clients served' },
      { value: '3+', label: 'Frameworks mastered' }
    ],
    experience: [
      {
        role: 'Software Engineer — ADP Vantage',
        company: 'ADP (2021 - 2024)',
        desc: 'Delivered a new Angular Unified Interface improving page performance by ~45% and reducing redundant backend calls by ~35%. Built responsive, accessible UI components serving 500+ enterprise clients.'
      },
      {
        role: 'CS Capstone — Pwin.ai',
        company: 'University of Colorado Boulder (2024 - 2026)',
        desc: 'Shipped a Streamlit application showcasing retrieval pipelines, agent hand-offs, and evaluation dashboards with hybrid semantic search.'
      },
      {
        role: 'Founding Engineer — GetMyURI.com',
        company: 'app.getmyuri.com (2025 - Present)',
        desc: 'Built the complete web platform with Spring Boot backend, responsive frontend, and custom URL management dashboard.'
      }
    ],
    tech: ['Angular', 'React', 'Next.js', 'Node.js', 'Spring Boot', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Streamlit', 'Bootstrap', 'Responsive Design']
  },
  devops: {
    title: 'DevOps & <span>Cloud Solutions</span>',
    description: 'Deploying cloud-based applications with AWS, Docker, Kubernetes, Jenkins, CI/CD pipelines, and Terraform. I architect infrastructure as code and automate the entire deployment lifecycle.',
    metrics: [
      { value: '60%', label: 'Faster deployments' },
      { value: '100%', label: 'Infrastructure as Code' },
      { value: '24/7', label: 'Monitoring & alerts' },
      { value: 'Serverless', label: 'Zero ops overhead' }
    ],
    experience: [
      {
        role: 'Backend Engineer & Technical Lead',
        company: 'Aragorn Racing Corporation (2025 - Present)',
        desc: 'Built CI/CD pipelines, implemented structured logging with AWS Lambda Powertools, CloudWatch dashboards, and Dead Letter Queues for fault-tolerant event processing. Architected fully serverless AWS infrastructure from scratch using AWS CDK for Infrastructure as Code.'
      },
      {
        role: 'Software Engineer — ADP Vantage',
        company: 'ADP (2021 - 2024)',
        desc: 'Developed CI/CD pipelines with Jenkins improving deployment speed by ~60%. Implemented Docker containerization and Kubernetes orchestration for microservices deployment.'
      },
      {
        role: 'Founding Engineer — GetMyURI.com',
        company: 'app.getmyuri.com (2025 - Present)',
        desc: 'Deployed on GKE with Jenkins-based CI/CD and Helm for orchestration, ensuring scalability and fault tolerance.'
      }
    ],
    tech: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform', 'AWS CDK', 'GKE', 'Helm', 'CloudWatch', 'GitHub Actions', 'Lambda Powertools']
  },
  analytics: {
    title: 'Data Analytics & <span>Automation</span>',
    description: 'Processing, analyzing, and visualizing data with Python, Pandas, Looker Studio, and SQL for actionable business insights. Automating workflows to eliminate manual data tasks.',
    metrics: [
      { value: '25%', label: 'Sales conversion boost' },
      { value: 'Automated', label: 'Data pipelines' },
      { value: 'Python', label: 'Processing stack' },
      { value: 'SQL', label: 'Query optimization' }
    ],
    experience: [
      {
        role: 'Data Analyst Intern',
        company: 'Peacock Solar (2020)',
        desc: 'Automated data collection and preprocessing using Python, Selenium, and SQL, streamlining workflows and reducing processing time. Built interactive dashboards in Looker Studio delivering actionable insights that optimized marketing strategies and boosted sales conversion by 25%.'
      },
      {
        role: 'Backend Engineer — ADP Vantage',
        company: 'ADP (2021 - 2024)',
        desc: 'Built data pipelines processing millions of Kafka events for payroll analytics. Implemented metrics collection and distributed tracing for data-driven performance optimization.'
      }
    ],
    tech: ['Python', 'Pandas', 'SQL', 'Looker Studio', 'Selenium', 'Data Pipelines', 'ETL', 'Kafka Analytics', 'Business Intelligence', 'Statistics']
  },
  'system-design': {
    title: 'System Design & <span>Architecture</span>',
    description: 'Designing scalable, fault-tolerant systems using microservices, event-driven architecture, and database sharding. From domain modeling to distributed system patterns.',
    metrics: [
      { value: '1M+', label: 'Events/day processed' },
      { value: '<1s', label: 'Latency target' },
      { value: 'Serverless', label: 'Auto-scaling' },
      { value: 'DLQ', label: 'Fault tolerance' }
    ],
    experience: [
      {
        role: 'Backend Engineer & Technical Lead',
        company: 'Aragorn Racing Corporation (2025 - Present)',
        desc: 'Owned end-to-end system design, infrastructure strategy, and API architecture for a digital horse racing analytics platform. Designed domain models, PostgreSQL schemas, and secure REST APIs. Architected fully serverless AWS stack with EventBridge routing, SQS buffering, and VPC isolation.'
      },
      {
        role: 'Software Engineer — ADP Vantage',
        company: 'ADP (2021 - 2024)',
        desc: 'Led monolith-to-microservices modernization for the payroll management system. Introduced metrics, distributed tracing, and centralized logging. Built Apache Kafka event-driven architecture processing 1M+ messages/day with sub-second latency.'
      },
      {
        role: 'Founding Engineer — GetMyURI.com',
        company: 'app.getmyuri.com (2025 - Present)',
        desc: 'Designed system architecture for 200K+ requests/sec with Redis caching layer, MongoDB sharding strategy, and GKE horizontal pod autoscaling for fault tolerance.'
      }
    ],
    tech: ['Microservices', 'Event-Driven Architecture', 'Domain-Driven Design', 'Kafka', 'Redis Caching', 'Database Sharding', 'Load Balancing', 'API Gateway', 'Circuit Breaker', 'SAGA Pattern']
  },
  testing: {
    title: 'Software Testing & <span>Quality Assurance</span>',
    description: 'Ensuring robust software quality through automation testing, unit testing, and integration testing using Selenium, JUnit, and TestNG. Building reliable test suites that catch bugs before production.',
    metrics: [
      { value: '80%', label: 'QA effort reduced' },
      { value: 'JUnit', label: 'Unit testing' },
      { value: 'Selenium BDD', label: 'UI automation' },
      { value: 'TestNG', label: 'Integration tests' }
    ],
    experience: [
      {
        role: 'Software Engineer — ADP Vantage',
        company: 'ADP (2021 - 2024)',
        desc: 'Implemented Selenium BDD smoke tests cutting manual QA effort by ~80%. Built comprehensive unit test suites with JUnit and integration tests with TestNG. Ensured code quality through CI/CD pipeline test gates.'
      },
      {
        role: 'Student Faculty Grader',
        company: 'CU Boulder — Universal Design (2024 - 2026)',
        desc: 'Evaluated student projects using WAVE accessibility evaluation tools for WCAG 2.1 compliance. Provided detailed feedback on accessibility, responsive design, and keyboard navigation testing.'
      }
    ],
    tech: ['Selenium', 'JUnit', 'TestNG', 'BDD', 'Cucumber', 'Unit Testing', 'Integration Testing', 'Smoke Testing', 'WAVE', 'WCAG 2.1']
  },
  'ai-llm': {
    title: 'AI & <span>LLM Solutions</span>',
    description: 'Building production-grade AI systems with RAG pipelines, agentic architectures, and LLM fine-tuning. From LangChain/LangGraph agents to vector search and guardrail implementations.',
    metrics: [
      { value: 'RAG', label: 'Retrieval pipelines' },
      { value: 'LangGraph', label: 'Agentic systems' },
      { value: 'Fine-tuning', label: 'LLM optimization' },
      { value: 'Guardrails', label: 'Safety layers' }
    ],
    experience: [
      {
        role: 'CS Capstone — Pwin.ai',
        company: 'University of Colorado Boulder (2024 - 2026)',
        desc: 'Architected a modular Agentic RAG pipeline with document loaders, chunking and embedding strategies, vector store integration, retrieval, and synthesis layers with response caching and safety guardrails. Built multi-tool LangChain/LangGraph agents using planner/executor patterns for task routing and tool use. Added tracing and evaluation frameworks for reliability monitoring.'
      },
      {
        role: 'AI/LLM Systems Development',
        company: 'Personal Projects (2025 - Present)',
        desc: 'Developed RAG pipelines with pgvector and FAISS for hybrid semantic search. Built Streamlit applications with AI-powered features. Experimented with LLM fine-tuning and prompt engineering for domain-specific applications.'
      }
    ],
    tech: ['LangChain', 'LangGraph', 'Python', 'pgvector', 'FAISS', 'Streamlit', 'RAG', 'Agentic AI', 'LLM Fine-tuning', 'Prompt Engineering', 'Hugging Face', 'OpenAI APIs', 'Anthropic']
  }
};

const modalOverlay = document.getElementById('serviceModal');
const modalClose = modalOverlay?.querySelector('.modal-close');
const modalTitle = modalOverlay?.querySelector('.modal-title');
const modalDescription = modalOverlay?.querySelector('.modal-description');
const modalMetrics = modalOverlay?.querySelector('#modal-metrics');
const modalExperience = modalOverlay?.querySelector('#modal-experience');
const modalTech = modalOverlay?.querySelector('#modal-tech');

const openModal = (serviceKey) => {
  const data = serviceData[serviceKey];
  if (!data) return;

  modalTitle.innerHTML = data.title;
  modalDescription.textContent = data.description;

  modalMetrics.innerHTML = data.metrics.map(m =>
    `<div class="metric-item"><span class="metric-value">${m.value}</span><span class="metric-label">${m.label}</span></div>`
  ).join('');

  modalExperience.innerHTML = data.experience.map((exp, i) =>
    `<div class="modal-exp-item modal-exp-reveal" style="transition-delay: ${0.3 + i * 0.12}s">
      <div class="exp-role">${exp.role}</div>
      <div class="exp-company">${exp.company}</div>
      <div class="exp-desc">${exp.desc}</div>
    </div>`
  ).join('');

  modalTech.innerHTML = data.tech.map(t =>
    `<span class="tech-tag">${t}</span>`
  ).join('');

  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Staggered section reveal
  const revealSections = modalOverlay.querySelectorAll('.modal-section-reveal');
  revealSections.forEach(s => s.classList.remove('revealed'));

  requestAnimationFrame(() => {
    revealSections.forEach((section, i) => {
      setTimeout(() => section.classList.add('revealed'), 150 * (i + 1));
    });
  });
};

const closeModal = () => {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Reset reveal states for next open
  const revealSections = modalOverlay.querySelectorAll('.modal-section-reveal');
  revealSections.forEach(s => s.classList.remove('revealed'));
  const expItems = modalOverlay.querySelectorAll('.modal-exp-reveal');
  expItems.forEach(item => {
    item.style.transitionDelay = '';
  });
};

document.querySelectorAll('.services-box[role="button"]').forEach(box => {
  box.addEventListener('click', () => {
    openModal(box.dataset.service);
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(box.dataset.service);
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===== Project Portfolio Modal ===== */
const projectData = [
  {
    number: '#01',
    title: 'GetMyURI',
    tagline: 'A high-performance URL shortening platform handling 200K+ requests per second, deployed on Google Kubernetes Engine with enterprise-grade features like custom aliases, password protection, and location-based access control.',
    description: [
      'Built a production-grade URL shortening service from scratch, handling 200K+ requests/sec with sub-10ms response times using Redis caching and MongoDB for persistent storage',
      'Designed a multi-tenant architecture with custom alias generation, link expiration, password-protected links, and geo-based access restrictions',
      'Deployed on Google Kubernetes Engine (GKE) with Helm charts for orchestration, ensuring zero-downtime deployments and automatic scaling',
      'Implemented Jenkins CI/CD pipelines with automated testing, container builds, and rolling updates across Kubernetes clusters',
      'Integrated real-time analytics dashboard tracking link clicks, geographic distribution, and referral sources',
      'Built with a micro-first approach — each service independently scalable, with Redis handling hot-path caching and MongoDB managing persistent link metadata'
    ],
    metrics: [
      { value: '200K+', label: 'Requests/Sec' },
      { value: '<10ms', label: 'Avg Response Time' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: 'GKE', label: 'Cloud Platform' }
    ],
    tech: ['Spring Boot', 'Java', 'Redis', 'MongoDB', 'Google Kubernetes Engine', 'Helm', 'Jenkins', 'Docker', 'REST APIs', 'Microservices', 'CI/CD'],
    architecture: {
      type: 'arch',
      rows: [
        [{ label: 'Users', cls: 'green' }, { label: 'Gateway', cls: 'blue' }, { label: 'Auth', cls: 'green' }],
        [{ label: 'Link Mgmt', cls: 'orange' }, { label: 'Redis', cls: 'blue' }, { label: 'Counter', cls: 'purple' }],
        [{ label: 'MongoDB', cls: 'green' }, { label: 'PostgreSQL', cls: 'orange' }, { label: 'K8s', cls: 'blue' }]
      ]
    },
    liveUrl: 'http://app.getmyuri.com',
    liveLabel: 'Live Site',
    codeUrl: 'https://github.com/v370r/getmyuri-config',
    codeLabel: 'GitHub Repo'
  },
  {
    number: '#02',
    title: 'Qiskit-Linter',
    tagline: 'A VS Code extension that provides real-time linting and code analysis for quantum computing programs written with Qiskit, helping developers catch errors before running on expensive quantum hardware.',
    description: [
      'Developed a VS Code extension providing real-time syntax checking, best-practice validation, and quantum circuit optimization suggestions for Qiskit programs',
      'Built a custom AST parser that analyzes quantum circuits for common anti-patterns, unnecessary gate operations, and suboptimal qubit allocations',
      'Integrated with Azure Quantum backend to validate circuit compatibility before submission to real quantum hardware',
      'Grew to 2,300+ developers installed, serving the quantum computing community with immediate feedback on circuit correctness',
      'Implemented language server protocol (LSP) integration for cross-editor compatibility beyond VS Code',
      'Designed a rule engine with 20+ quantum-specific linting rules covering circuit depth, gate fidelity, and qubit reuse patterns'
    ],
    metrics: [
      { value: '2,300+', label: 'Developer Installs' },
      { value: '20+', label: 'Linting Rules' },
      { value: 'VS Code', label: 'Platform' },
      { value: 'Azure', label: 'Quantum Backend' }
    ],
    tech: ['Node.js', 'TypeScript', 'Python', 'Qiskit', 'AST Parsing', 'Language Server Protocol', 'VS Code Extension API', 'Azure Quantum'],
    architecture: {
      type: 'vscode'
    },
    liveUrl: 'https://marketplace.visualstudio.com/items?itemName=qiskit-support-extensions.qiskit-linter',
    liveLabel: 'VS Code Marketplace',
    codeUrl: 'https://github.com/v370r/qiskit-lsp',
    codeLabel: 'GitHub Repo'
  },
  {
    number: '#03',
    title: 'Pwin.ai — CS Capstone',
    tagline: 'An agentic RAG (Retrieval-Augmented Generation) pipeline built with LangChain and LangGraph, featuring pgvector for semantic search, FAISS for fast similarity matching, and intelligent document processing for complex technical documents.',
    description: [
      'Built a production-grade RAG pipeline that ingests technical documents, chunks them intelligently, and creates vector embeddings stored in pgvector for fast semantic retrieval',
      'Designed an agentic workflow using LangGraph that chains document retrieval, context synthesis, and LLM generation into a coherent answer pipeline',
      'Implemented hybrid search combining dense vector similarity (pgvector + FAISS) with sparse keyword matching for higher retrieval accuracy',
      'Built evaluation dashboards measuring answer quality, hallucination rate, and retrieval precision across different query types',
      'Processed 1,000+ technical documents with custom chunking strategies that preserve contextual boundaries and cross-references',
      'Integrated guardrails and safety checks to prevent hallucination and ensure generated answers are grounded in retrieved context'
    ],
    metrics: [
      { value: '1,000+', label: 'Documents Processed' },
      { value: 'Hybrid', label: 'Search Strategy' },
      { value: 'LangGraph', label: 'Agent Framework' },
      { value: 'pgvector', label: 'Vector Store' }
    ],
    tech: ['LangChain', 'LangGraph', 'Python', 'pgvector', 'FAISS', 'PostgreSQL', 'OpenAI APIs', 'Anthropic', 'Streamlit', 'RAG', 'Agentic AI', 'Vector Search'],
    architecture: {
      type: 'rag'
    },
    liveUrl: 'https://pwinbook.com',
    liveLabel: 'Live Demo',
    codeUrl: 'https://github.com/v370r',
    codeLabel: 'GitHub Repo'
  }
];

const projectModalOverlay = document.getElementById('projectModal');
const projectModalBody = document.getElementById('modal-project-body');
const projectModalClose = document.getElementById('project-modal-close');

const buildProjectModalContent = (project) => {
  let archHTML = '';
  if (project.architecture.type === 'arch') {
    archHTML = `<div class="modal-arch-diagram"><div class="arch-preview">`;
    project.architecture.rows.forEach(row => {
      archHTML += `<div class="arch-row">`;
      row.forEach(box => {
        archHTML += `<div class="arch-box ${box.cls}">${box.label}</div>`;
      });
      archHTML += `</div>`;
    });
    archHTML += `</div></div>`;
  } else if (project.architecture.type === 'vscode') {
    archHTML = `<div class="modal-arch-diagram">
      <div class="vscode-preview">
        <div class="vscode-titlebar">
          <div class="vscode-dot r"></div><div class="vscode-dot y"></div><div class="vscode-dot g"></div>
          <div class="vscode-title">qiskit_linter — main.py</div>
        </div>
        <div class="vscode-body">
          <span class="vscode-kw">import</span> qiskit<br>
          <span class="vscode-comment"># ✓ no issues</span><br>
          <span class="vscode-kw">from</span> qiskit <span class="vscode-kw">import</span> QuantumCircuit<br>
          <span class="vscode-str">"Linting: 3 rules applied"</span><br>
          <span class="vscode-comment">2300+ devs installed</span>
        </div>
      </div>
    </div>`;
  } else if (project.architecture.type === 'rag') {
    archHTML = `<div class="modal-arch-diagram">
      <div class="rag-pipeline">
        <div class="rag-step g">Docs</div><div class="rag-arrow">→</div>
        <div class="rag-step b">Chunk</div><div class="rag-arrow">→</div>
        <div class="rag-step o">pgvector</div><div class="rag-arrow">→</div>
        <div class="rag-step g">RAG</div><div class="rag-arrow">→</div>
        <div class="rag-step p">Agent</div>
      </div>
    </div>`;
  }

  return `
    <div class="modal-project-header">
      <div class="modal-project-number">${project.number}</div>
      <h2 class="modal-project-title" id="modal-project-title">${project.title}</h2>
      <p class="modal-project-tagline">${project.tagline}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Key Metrics</div>
      <div class="modal-metrics-row">
        ${project.metrics.map(m => `
          <div class="modal-metric-card">
            <span class="modal-metric-value">${m.value}</span>
            <span class="modal-metric-label">${m.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Architecture</div>
      ${archHTML}
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Project Details</div>
      <ul class="modal-description-list">
        ${project.description.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Tech Stack</div>
      <div class="modal-tech-grid">
        ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Links</div>
      <div class="modal-links">
        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="modal-link-btn primary">
          <svg viewBox="0 0 24 24"><path d="M14 3v2H5v14h14v-9h2v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h10zm7 0v8h-2V6.41l-8.3 8.3-1.4-1.42L17.58 5H13V3h8z"/></svg>
          ${project.liveLabel}
        </a>
        <a href="${project.codeUrl}" target="_blank" rel="noopener" class="modal-link-btn secondary">
          <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          ${project.codeLabel}
        </a>
      </div>
    </div>
  `;
};

const openProjectModal = (index) => {
  const project = projectData[index];
  if (!project) return;

  projectModalBody.innerHTML = buildProjectModalContent(project);
  projectModalOverlay.classList.add('active');
  projectModalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeProjectModal = () => {
  projectModalOverlay.classList.remove('active');
  projectModalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Card click handlers
document.querySelectorAll('.project-card[role="button"]').forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't open modal if clicking action buttons
    if (e.target.closest('.card-action')) return;
    openProjectModal(parseInt(card.dataset.project));
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(parseInt(card.dataset.project));
    }
  });
});

// Modal close handlers
if (projectModalClose) {
  projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectModalOverlay) {
  projectModalOverlay.addEventListener('click', (e) => {
    if (e.target === projectModalOverlay) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });
}