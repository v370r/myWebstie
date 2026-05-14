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

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach(detail => {
    detail.classList.remove('active');
  });

  portfolioDetails[index].classList.add('active');

};

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