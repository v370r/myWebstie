/**
 * Interactive terminal easter egg for the contact page.
 * Visitors can type commands at the bottom of the terminal form.
 */
(function () {
  var input = document.getElementById('t-cmd-input');
  var output = document.getElementById('t-output');
  var form = document.getElementById('contact-terminal-form');

  if (!input || !output) return;

  var commands = {
    help: function () {
      return [
        { text: 'Available commands:', cls: 't-out-info' },
        { text: '  help          — show this message', cls: '' },
        { text: '  whoami        — about Vijay', cls: '' },
        { text: '  pwd           — print working directory', cls: '' },
        { text: '  ls            — list files', cls: '' },
        { text: '  cat <file>    — read a file (resume.txt, skills.txt, experience.json)', cls: '' },
        { text: '  date          — current date/time', cls: '' },
        { text: '  ping vijay    — ping Vijay', cls: '' },
        { text: '  curl portfolio — show tech stack', cls: '' },
        { text: '  clear         — clear terminal output', cls: '' },
        { text: '  exit          — leave a message first!', cls: '' },
      ];
    },

    whoami: function () {
      return [
        { text: 'Vijay Poloju — Full Stack Engineer', cls: 't-out-success' },
        { text: 'MS Computer Science @ CU Boulder (GPA: 3.8)', cls: '' },
        { text: '4+ years · Distributed systems · Serverless · AI/ML', cls: '' },
        { text: 'Bay Area, CA · Open to opportunities', cls: '' },
      ];
    },

    pwd: function () {
      return [{ text: '/home/vijay/portfolio/contact', cls: 't-out-info' }];
    },

    ls: function () {
      return [
        { text: 'resume.txt  skills.txt  experience.json  message.txt', cls: 't-out-success' },
        { text: 'tip: use cat <filename> to read a file', cls: 't-out-info' },
      ];
    },

    date: function () {
      return [{ text: new Date().toString(), cls: '' }];
    },

    ping: function () {
      return [
        { text: 'PING vijay (127.0.0.1): 64 bytes of data', cls: '' },
        { text: '64 bytes from vijay: icmp_seq=1 ttl=64 time=0.042ms 😊', cls: 't-out-success' },
        { text: '--- vijay ping statistics ---', cls: '' },
        { text: '1 packet transmitted, 1 received, 0% packet loss', cls: '' },
      ];
    },

    curl: function () {
      return [
        { text: '{', cls: '' },
        { text: '  "stack": ["Java", "Python", "TypeScript", "React", "Next.js", "Angular"],', cls: 't-out-success' },
        { text: '  "backend": ["Spring Boot", "Node.js", "GraphQL", "REST"],', cls: 't-out-success' },
        { text: '  "cloud": ["AWS", "GCP", "Lambda", "CDK", "Docker", "K8s"],', cls: 't-out-success' },
        { text: '  "data": ["Kafka", "DynamoDB", "PostgreSQL", "Redis", "MongoDB"],', cls: 't-out-success' },
        { text: '  "ai": ["LangChain", "LangGraph", "RAG", "Vector Search", "LLMs"]', cls: 't-out-success' },
        { text: '}', cls: '' },
      ];
    },

    clear: function () {
      output.innerHTML = '';
      return [];
    },
  };

  function runCommand(cmd) {
    var trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Parse command and argument
    var parts = trimmed.split(/\s+/);
    var name = parts[0];
    var arg = parts[1] || '';

    if (commands[name]) {
      var result = commands[name]();
      appendOutput(result);
      return;
    }

    // Handle cat with argument
    if (name === 'cat' && arg) {
      appendOutput(runCat(arg));
      return;
    }

    // Easter eggs for funny commands
    if (name === 'sudo') {
      appendOutput([
        { text: 'nice try. but seriously, just send me a message :)', cls: 't-out-error' },
      ]);
      return;
    }

    if (name === 'rm') {
      appendOutput([
        { text: "I'm not letting you rm anything. Please send a message instead.", cls: 't-out-error' },
      ]);
      return;
    }

    if (name === 'exit') {
      appendOutput([
        { text: 'You can leave, but first — send me a message! 🚀', cls: 't-out-success' },
      ]);
      return;
    }

    if (name === 'neofetch' || name === 'screenfetch') {
      appendOutput([
        { text: 'vijay@portfolio', cls: 't-out-success' },
        { text: '----------------', cls: 't-out-info' },
        { text: 'OS: Bay Area, CA', cls: '' },
        { text: 'Shell: Vijay-Terminal v4.2.0', cls: '' },
        { text: 'Uptime: 4+ years', cls: '' },
        { text: 'Packages: Java, Python, TypeScript, AWS', cls: '' },
        { text: 'CPU: CU Boulder MS CS @ 3.8 GPA', cls: '' },
        { text: 'Memory: 1M+ events/day via Kafka', cls: '' },
      ]);
      return;
    }

    if (name === 'hello' || name === 'hi' || name === 'hey') {
      appendOutput([
        { text: 'Hey there! 👋 Fill out the form above and I\'ll get back to you!', cls: 't-out-success' },
      ]);
      return;
    }

    if (name === 'vim' || name === 'nano' || name === 'emacs') {
      appendOutput([
        { text: 'There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.', cls: 't-out-info' },
        { text: 'But seriously, just use the form above to send a message.', cls: 't-out-info' },
      ]);
      return;
    }

    if (name === 'git') {
      appendOutput([
        { text: 'hint: check out my repos → github.com/v370r', cls: 't-out-success' },
      ]);
      return;
    }

    if (name === 'docker') {
      appendOutput([
        { text: '🐳 container started successfully: vijay/portfolio:latest', cls: 't-out-success' },
      ]);
      return;
    }

    if (name === 'kubectl' || name === 'k8s') {
      appendOutput([
        { text: 'NAMESPACE   NAME        READY   STATUS    AGE', cls: '' },
        { text: 'default     vijay-pod   1/1     Running   4y', cls: 't-out-success' },
      ]);
      return;
    }

    // Unknown command
    appendOutput([
      { text: 'bash: ' + esc(parts[0]) + ': command not found. Type "help" for available commands.', cls: 't-out-error' },
    ]);
  }

  function runCat(file) {
    var files = {
      'resume.txt': [
        { text: 'VIJAY POLOJU — Full Stack Engineer', cls: 't-out-success' },
        { text: 'MS Computer Science, CU Boulder (2024-2026)', cls: '' },
        { text: 'B.Tech Mechanical, IIT Hyderabad (2017-2021)', cls: '' },
        { text: '4+ years at ADP, Aragorn Racing, GetMyURI', cls: '' },
        { text: '→ download full resume at the home page', cls: 't-out-info' },
      ],
      'skills.txt': [
        { text: 'Languages: Java, Python, TypeScript, JavaScript, SQL, Go', cls: 't-out-success' },
        { text: 'Frontend:  React, Next.js, Angular, HTML/CSS', cls: '' },
        { text: 'Backend:   Spring Boot, Node.js, Express, REST, GraphQL', cls: '' },
        { text: 'Cloud:     AWS (Lambda, CDK, S3, DynamoDB, Kafka, SQS)', cls: '' },
        { text: 'Data:      Kafka, Redis, PostgreSQL, MongoDB, DynamoDB', cls: '' },
        { text: 'AI/ML:     LangChain, LangGraph, RAG, Vector Search, LLMs', cls: '' },
        { text: 'DevOps:    Docker, Kubernetes, Jenkins, CI/CD, Helm', cls: '' },
      ],
      'experience.json': [
        { text: '[', cls: '' },
        { text: '  { "role": "Backend Engineer & Tech Lead", "co": "Aragorn Racing Corp", "year": "2025" },', cls: 't-out-success' },
        { text: '  { "role": "Teaching Assistant", "co": "CU Boulder", "year": "2025" },', cls: 't-out-success' },
        { text: '  { "role": "Founding Engineer", "co": "GetMyURI", "year": "2025" },', cls: 't-out-success' },
        { text: '  { "role": "Software Engineer", "co": "ADP Vantage", "year": "2021-2024" },', cls: 't-out-success' },
        { text: '  { "role": "Data Analyst Intern", "co": "Peacock Solar", "year": "2020" }', cls: 't-out-success' },
        { text: ']', cls: '' },
      ],
      'message.txt': [
        { text: '// That\'s the form above! Fill it out and hit send. 🚀', cls: 't-out-info' },
      ],
    };

    return files[file] || [
      { text: 'cat: ' + esc(file) + ': No such file or directory. Try "ls" to see available files.', cls: 't-out-error' },
    ];
  }

  function appendOutput(lines) {
    if (!lines || lines.length === 0) return;
    lines.forEach(function (line) {
      var span = document.createElement('span');
      if (line.cls) span.className = line.cls;
      span.textContent = line.text;
      output.appendChild(span);
      output.appendChild(document.createTextNode('\n'));
    });
  }

  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var val = input.value;
      input.value = '';
      runCommand(val);
      // Scroll output to bottom
      var right = document.querySelector('.contact-right');
      if (right) right.scrollTop = right.scrollHeight;
    }
  });

  // ---------- Form submission with error fallback ----------
  var formSubmitFallback = document.getElementById('form-submit-fallback');
  var btn = form ? form.querySelector('.t-submit') : null;

  if (form && btn) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Disable button and show sending state
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      var formData = new FormData(form);
      var formAction = form.getAttribute('action');

      // Try FormSubmit.co via fetch
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 10000);

      fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      })
      .then(function (response) {
        clearTimeout(timeout);
        if (response.ok || response.status === 200) {
          showSuccess();
        } else {
          showFallback();
        }
      })
      .catch(function () {
        clearTimeout(timeout);
        showFallback();
      });

      function showSuccess() {
        var out = document.getElementById('t-output');
        if (out) {
          out.innerHTML = '';
          appendOutput([
            { text: '$ ./send_message', cls: '' },
            { text: '✓ Message sent successfully!', cls: 't-out-success' },
            { text: '  I\'ll get back to you within 24 hours.', cls: 't-out-info' },
          ]);
        }
        form.reset();
        btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> ./send_message';
        btn.disabled = false;
      }

      function showFallback() {
        var out = document.getElementById('t-output');
        if (out) {
          out.innerHTML = '';
          appendOutput([
            { text: '$ ./send_message', cls: '' },
            { text: '⚠ FormSubmit is temporarily unavailable.', cls: 't-out-error' },
            { text: '', cls: '' },
            { text: 'Don\'t worry — you can still reach me:', cls: 't-out-info' },
            { text: '  ✉  vijaykumarpolojuofficial@gmail.com', cls: 't-out-success' },
            { text: '  ✆  +1 (303) 901-0415', cls: 't-out-success' },
            { text: '  💬  wa.me/13039010415', cls: 't-out-success' },
            { text: '', cls: '' },
            { text: '  Or copy the message below and email me directly:', cls: 't-out-info' },
          ]);

          // Show a copyable version of the message
          var name = document.getElementById('ct-name').value || 'N/A';
          var email = document.getElementById('ct-email').value || 'N/A';
          var subject = document.getElementById('ct-subject').value || 'N/A';
          var message = document.getElementById('ct-message').value || 'N/A';

          appendOutput([
            { text: '---', cls: 't-out-info' },
            { text: 'From: ' + name + ' <' + email + '>', cls: '' },
            { text: 'Subject: ' + subject, cls: '' },
            { text: message, cls: '' },
            { text: '---', cls: 't-out-info' },
          ]);
        }

        btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> ./send_message';
        btn.disabled = false;
      }
    });
  }
})();
