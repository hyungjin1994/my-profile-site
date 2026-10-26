// ===== 프로젝트 데이터 (여기만 수정하면 카드가 바뀝니다) =====
const projects = [
  {
    title: '쇼핑몰 웹 서비스',
    description: 'Spring Boot 기반 REST API와 JavaScript 프론트엔드로 구현한 온라인 쇼핑몰. 회원가입, 장바구니, 주문 기능을 제공합니다.',
    emoji: '🛒',
    gradient: 'from-blue-500 to-indigo-500',
    tags: ['Java', 'Spring Boot', 'JavaScript'],
    github: '#',
    demo: '#',
  },
  {
    title: '게시판 커뮤니티',
    description: 'CRUD, 댓글, 페이징, 검색 기능을 갖춘 커뮤니티 게시판. 로그인 세션 관리와 권한 처리를 구현했습니다.',
    emoji: '💬',
    gradient: 'from-violet-500 to-purple-500',
    tags: ['Spring Boot', 'HTML', 'CSS'],
    github: '#',
    demo: '#',
  },
  {
    title: '포트폴리오 웹사이트',
    description: 'Tailwind CSS로 만든 반응형 개인 프로필 사이트. 다크모드와 스크롤 애니메이션을 지원합니다.',
    emoji: '🚀',
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    demo: '#',
  },
];

// ===== 프로젝트 카드 렌더링 =====
function renderProjects() {
  const list = document.getElementById('project-list');
  list.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card reveal">
        <div class="project-thumb bg-gradient-to-br ${p.gradient}">
          <span class="project-emoji drop-shadow-lg">${p.emoji}</span>
        </div>
        <div class="flex flex-col flex-1 p-6">
          <h3 class="project-title text-xl font-bold text-slate-900 dark:text-white">${p.title}</h3>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">${p.description}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex gap-5">
            <a href="${p.github}" target="_blank" rel="noopener" class="project-link">
              <i class="devicon-github-original"></i> GitHub
            </a>
            <a href="${p.demo}" target="_blank" rel="noopener" class="project-link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
              Demo
            </a>
          </div>
        </div>
      </article>`
    )
    .join('');
}

// ===== 타이핑 효과 =====
function startTyping() {
  const el = document.getElementById('typing');
  const words = ['풀스택 개발자', 'Java & Spring Boot Developer', 'Frontend Developer'];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIdx];
    charIdx += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIdx);

    let delay = deleting ? 50 : 100;
    if (!deleting && charIdx === word.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
}

// ===== 헤더: 스크롤 시 배경 + 현재 섹션 메뉴 강조 =====
function setupHeader() {
  const header = document.getElementById('header');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}

// ===== 모바일 메뉴 =====
function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

// ===== 다크모드 =====
function setupThemeToggle() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
  });
}

// ===== 스크롤 등장 애니메이션 =====
function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ===== 이메일 복사 + 토스트 =====
function setupCopyEmail() {
  const btn = document.getElementById('copy-email');
  const toast = document.getElementById('toast');

  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 2000);
  };

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.email);
      showToast('이메일이 복사되었습니다 ✓');
    } catch (e) {
      showToast('복사에 실패했습니다. 직접 선택해 주세요.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProjects();
  startTyping();
  setupHeader();
  setupMobileMenu();
  setupThemeToggle();
  setupReveal();
  setupCopyEmail();
});
