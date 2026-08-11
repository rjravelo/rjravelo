/**
 * Dr. Rosemary J. Ravelo | Modern Data Storytelling Portfolio Engine
 * Powered by Three.js WebGL, Chart.js Data Visualizations, and GSAP
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if loaded
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Menu Toggle
  initMobileMenu();

  // Three.js Interactive 3D Synapse Node Canvas in Hero
  initThreeHeroCanvas();

  // Chart.js Data Storytelling Visualizations
  initDataStorytellingCharts();

  // Interactive Research Lab Tab Engine
  initResearchLabTabs();

  // Scroll Animations & Counters
  initScrollAnimations();

  // Scraper-Proof Dynamic Email Injection
  initScraperProofEmail();
});

/* ==========================================================================
   1. MOBILE NAVBAR TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   2. THREE.JS WEBGL HERO CANVAS (3D Particle Cognitive Mesh)
   ========================================================================== */
function initThreeHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create Particle Nodes
  const particleCount = 75;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

    velocities.push({
      x: (Math.random() - 0.5) * 0.04,
      y: (Math.random() - 0.5) * 0.04,
      z: (Math.random() - 0.5) * 0.02
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Glowing Points Material
  const pMaterial = new THREE.PointsMaterial({
    color: 0x00E599,
    size: 1.2,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, pMaterial);
  scene.add(particleSystem);

  // Line Network Material
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6366F1,
    transparent: true,
    opacity: 0.18
  });

  const lineGeometry = new THREE.BufferGeometry();
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  // Mouse Parallax Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x += (targetX * 20 - camera.position.x) * 0.05;
    camera.position.y += (-targetY * 20 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    const pos = particleSystem.geometry.attributes.position.array;
    const linePositions = [];

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Bounce off boundaries
      if (Math.abs(pos[i * 3]) > 35) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 25) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 20) velocities[i].z *= -1;

      // Connect nearby nodes
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 12) {
          linePositions.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          linePositions.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    lineMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ==========================================================================
   3. CHART.JS DATA STORYTELLING VISUALIZATIONS (Knaflic Clean Data Design)
   ========================================================================== */
function initDataStorytellingCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart Defaults for High-Contrast Dark Mode & Data Storytelling
  Chart.defaults.color = '#94A3B8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.font.size = 12;

  // 1. PhD Thesis Pearson Correlation Chart
  const phdCanvas = document.getElementById('phd-correlation-chart');
  if (phdCanvas) {
    new Chart(phdCanvas, {
      type: 'bar',
      data: {
        labels: [
          'Inventory Ease (w/ Flow)',
          'Social Chat (Cross-Construct)',
          'Flow & Immersion Loop',
          'Inventory (Time Loss)',
          'World Mod. (Immersion)'
        ],
        datasets: [{
          label: 'Pearson Correlation (r)',
          data: [0.74, 0.71, 0.68, 0.51, 0.47],
          backgroundColor: [
            '#00E599', // Signal Green (Highest signal)
            '#00E599',
            '#6366F1', // Cognitive Indigo
            '#06B6D4',
            '#06B6D4'
          ],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            titleColor: '#F8FAFC',
            bodyColor: '#00E599',
            borderColor: 'rgba(0, 229, 153, 0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (context) => ` Correlation Score r = ${context.parsed.x} (Strong Positive Impact)`
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 1.0,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              callback: (val) => `r = ${val}`
            }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Taíno App Learning Preference Chart
  const tainoCanvas = document.getElementById('taino-preference-chart');
  if (tainoCanvas) {
    new Chart(tainoCanvas, {
      type: 'doughnut',
      data: {
        labels: [
          'Milestone Tracking (83%)',
          'Speaking Practice (72.2%)',
          'Gamified Challenges (72.2%)',
          'Social Multiplayer (55.6%)'
        ],
        datasets: [{
          data: [83, 72.2, 72.2, 55.6],
          backgroundColor: [
            '#00E599',
            '#38BDF8',
            '#6366F1',
            '#F59E0B'
          ],
          borderWidth: 2,
          borderColor: '#111827'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 12,
            callbacks: {
              label: (context) => ` User Preference: ${context.parsed}%`
            }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   4. INTERACTIVE RESEARCH LAB TABS
   ========================================================================== */
function initResearchLabTabs() {
  const tabBtns = document.querySelectorAll('.lab-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
}

/* ==========================================================================
   5. SCROLL ANIMATIONS & COUNTERS
   ========================================================================== */
function initScrollAnimations() {
  // Metric Counters
  const counterEls = document.querySelectorAll('.data-val[data-target]');
  if (counterEls.length > 0 && typeof gsap !== 'undefined') {
    counterEls.forEach(el => {
      const targetVal = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';

      gsap.to(el, {
        innerText: targetVal,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: targetVal % 1 === 0 ? 1 : 0.01 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        },
        onUpdate: function () {
          const val = targetVal % 1 === 0 ? Math.round(this.targets()[0].innerText) : parseFloat(this.targets()[0].innerText).toFixed(2);
          el.textContent = `${prefix}${val}${suffix}`;
        }
      });
    });
  }
}

/* ==========================================================================
   6. SCRAPER-PROOF EMAIL DYNAMIC INJECTION
   ========================================================================== */
function initScraperProofEmail() {
  const user = 'rjravelo99';
  const domain = 'gmail.com';
  const mailAddress = user + '@' + domain;
  const labelText = 'Send an Email';

  // Inject mailto href on click/hover without exposing visible plaintext email in DOM text
  document.querySelectorAll('.email-link').forEach(el => {
    el.href = 'mailto:' + mailAddress;
  });

  // Ensure text content displays friendly phrase, never plaintext email
  document.querySelectorAll('.email-inject').forEach(el => {
    el.textContent = labelText;
  });
}