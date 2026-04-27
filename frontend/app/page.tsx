'use client';

import { useEffect, useRef, useState } from 'react';

interface ThemeSwitcherProps {
  isDark: boolean;
  onToggle: () => void;
}

function ThemeSwitcher({ isDark, onToggle }: ThemeSwitcherProps) {
  return (
    <div
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      style={{
        position: 'relative',
        width: 56,
        height: 28,
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* Track */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 100,
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,200,100,0.5)',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
          : 'linear-gradient(135deg, #87ceeb, #ffd89b)',
        transition: 'all 0.4s ease',
        overflow: 'hidden',
      }}>
        {/* Звёзды (только в тёмной теме) */}
        {isDark && (
          <>
            <div style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'white', opacity:0.8, top:6, left:10 }} />
            <div style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'white', opacity:0.6, top:14, left:20 }} />
            <div style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'white', opacity:0.9, top:8, left:32 }} />
          </>
        )}
      </div>

      {/* Knob */}
      <div style={{
        position: 'absolute',
        top: 3,
        left: isDark ? 3 : 31,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: isDark ? '#1e2a4a' : '#fff7e6',
        boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
        transition: 'left 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isDark ? (
          // Луна
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#a0b4d6">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          // Солнце
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        )}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const officePhotos = [
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80', title: 'Современный коворкинг' },
  { url: 'https://images.unsplash.com/photo-1497366811353-6ec8a6f99f65?w=900&q=80', title: 'Переговорная' },
  { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80', title: 'Зона отдыха' },
  { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80', title: 'Команда за работой' },
  { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80', title: 'Спортзал' },
];

const lifeEvents = [
  { emoji: '🎨', title: 'Мастер-классы', desc: 'Каждую среду в 18:00 — дизайн-мышление, публичные выступления, продуктовый подход' },
  { emoji: '🎤', title: 'Выступления экспертов', desc: 'Приглашённые спикеры из IT, бизнеса и науки делятся опытом' },
  { emoji: '🍷', title: 'Дегустации', desc: 'Тематические вечера с дегустацией кофе, чая, локальных продуктов' },
  { emoji: '🤝', title: 'Командообразование', desc: 'Квизы, хакатоны, спортивные челленджи и выезды' },
];

const testimonials = [
  { name: 'Анна К.', role: 'Аналитик', text: 'Отличное пространство! Удобные переговорные, всегда есть место для работы.', avatar: '👩‍💼' },
  { name: 'Дмитрий В.', role: 'Руководитель проектов', text: 'Программа лояльности приятно удивляет. Кофе и снеки — отличный бонус каждый день.', avatar: '👨‍💻' },
  { name: 'Елена М.', role: 'Дизайнер', text: 'Мастер-классы и события помогают прокачивать навыки и знакомиться с коллегами.', avatar: '🎨' },
  { name: 'Сергей П.', role: 'Разработчик', text: 'Спортзал и массажное кресло — то, что нужно после долгого кодинга!', avatar: '💪' },
];

const checklistItems = [
  { day: 'День 1', text: 'Пройти курсы адаптации на платформе «Пульс»' },
  { day: 'День 1', text: 'Заполнить анкету новичка' },
  { day: 'День 1', text: 'Получить технику и все доступы' },
  { day: 'День 2', text: 'Пройти экскурсию по центру' },
  { day: 'День 2', text: 'Инструктаж по кибербезопасности и охране труда' },
  { day: 'День 3', text: 'Встреча с куратором / бадди' },
  { day: 'День 3', text: 'Познакомиться с командой' },
  { day: 'День 3', text: 'Посетить первый дейлик / стендап' },
  { day: 'Доп.', text: 'Самостоятельные курсы: ИИ-агенты, GigaChat на Пульсе' },
  { day: 'Доп.', text: 'Активировать бонусы программы лояльности' },
  { day: 'Доп.', text: 'Предложить свои идеи для улучшения центра' },
];

const contacts = [
  { name: 'Александра Иванова', role: 'Специалист по адаптации',  tg: 'alex_hub',      emoji: '👩‍💼', avatarImg: '/people/ava-nadya-v@2x.png' },
  { name: 'Михаил Смирнов',    role: 'Технический специалист',    tg: 'michael_tech',  emoji: '👨‍💻', avatarImg: '/people/ava-azat@2x.png'    },
  { name: 'Ирина Кузнецова',   role: 'Менеджер по бронированию', tg: 'irina_booking', emoji: '📅',   avatarImg: '/people/ava-nastya@2x.png'  },
  { name: 'Фёдор Петров',      role: 'Бадди-наставник',           tg: 'fedor_buddy',   emoji: '🤝',   avatarImg: '/people/ava-vlad@2x.png'    },
];

const faqItems = [
  { q: 'Как посетить спортзал?', a: 'Спортзал открыт ежедневно с 07:00 до 21:00. Вход свободный для всех сотрудников. Есть раздевалки, душевые, тренажёры и свободные веса.' },
  { q: 'Когда обед?', a: 'Обеденный перерыв — 50 минут. В столовой горячие обеды, зона с микроволновками и кулерами. Можно приносить еду или заказывать доставку.' },
  { q: 'Как забронировать переговорную или коворкинг?', a: 'Через внутренний портал (раздел «Бронирование») или напрямую Ирине Кузнецовой в Telegram: @irina_booking.' },
  { q: 'Какой период адаптации?', a: 'Базовая адаптация — 1 неделя. За каждым новичком закрепляется бадди-наставник. Полное погружение занимает около месяца.' },
  { q: 'Как записаться на мероприятия?', a: 'Через Telegram-бот @HubEventMatch_bot или у Александры Ивановой. Расписание публикуется в корпоративном канале каждый понедельник.' },
  { q: 'Как составить график работы?', a: 'График согласовывается с руководителем в первую неделю. Возможен гибкий формат: core-часы 10:00–16:00, остальное — по договорённости.' },
  { q: 'Как воспользоваться программой лояльности?', a: 'Активируйте личный кабинет в разделе «Бонусы» на корпоративном портале. Баллы начисляются за активность и посещение мероприятий.' },
  { q: 'Где взять канцтовары?', a: 'На ресепшене: ручки, блокноты, стикеры, скрепки. Запрашивайте у администратора или берите самостоятельно из общего шкафа.' },
  { q: 'Как распечатать документ?', a: 'В зоне коворкинга стоит цветной МФУ. Печать доступна с баланса бонусов или бесплатно первые 20 страниц в день.' },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [officeIdx, setOfficeIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(new Array(checklistItems.length).fill(false));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; title: string; body: string }>({ open: false, title: '', body: '' });
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', role: '', tg: '', message: '' });
  const [applyDone, setApplyDone] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [officeSlideIndex, setOfficeSlideIndex] = useState(0);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setApplyForm({ name: '', role: '', tg: '', message: '' });
    }, 2500);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
  };
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [checklistState, setChecklistState] = useState<boolean[]>(new Array(12).fill(false));
  
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Применяем тему
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('hubTheme');
    if (saved === 'light') setIsDark(false);
    else if (saved === 'dark') setIsDark(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('hubTheme', isDark ? 'dark' : 'light');
  }, [isDark, isClient]);

  // Прогресс скролла
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Активная секция
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Анимация при скролле
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.anim').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const start = window.scrollY;
    const end = el.getBoundingClientRect().top + start - 80;
    const dist = end - start;
    const t0 = performance.now();
    const dur = 700;
    const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      window.scrollTo(0, start + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const openModal = (title: string, body: string) => setModal({ open: true, title, body });
  const closeModal = () => setModal({ open: false, title: '', body: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyDone(true);
    setTimeout(() => { setApplyDone(false); setApplyOpen(false); setApplyForm({ name:'', role:'', tg:'', message:'' }); }, 2500);
  };

  const navLinks = [
    { id: 'hero', label: 'О центре' },
    { id: 'possibilities', label: 'Возможности' },
    { id: 'life', label: 'Жизнь' },
    { id: 'testimonials', label: 'Отзывы' },
    { id: 'checklist', label: 'Чек-лист' },
    { id: 'contacts', label: 'Контакты' },
    { id: 'faq', label: 'FAQ' },
  ];
  
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Manrope:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── ТЕМЫ ── */
        [data-theme="dark"] {
          --bg:    #07070e;
          --bg2:   #0d0d18;
          --bg3:   #11111f;
          --text:  #f0eef8;
          --muted: rgba(240,238,248,0.45);
          --border: rgba(255,255,255,0.08);
          --peach: #f4a582;
          --pink:  #e8609a;
          --blue:  #5bc8f5;
          --purple:#b388f7;
          --card:  rgba(255,255,255,0.04);
          --card-border: rgba(255,255,255,0.09);
          --input-bg: rgba(0,0,0,0.35);
          --input-border: rgba(255,255,255,0.14);
          --nav-bg: rgba(7,7,14,0.85);
        }
        [data-theme="light"] {
          --bg:    #f4f4f8;
          --bg2:   #eceef5;
          --bg3:   #ffffff;
          --text:  #111420;
          --muted: rgba(0,0,0,0.52);
          --border: rgba(0,0,0,0.07);
          --peach: #d4845e;
          --pink:  #c84d82;
          --blue:  #3a9ec9;
          --purple:#7b5cb8;
          --card:  rgba(255,255,255,0.75);
          --card-border: rgba(0,0,0,0.08);
          --input-bg: #ffffff;
          --input-border: #d0d5dd;
          --nav-bg: rgba(244,244,248,0.88);
        }

        html { scroll-behavior: auto; }
        body {
          font-family: 'Manrope', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          transition: background 0.35s, color 0.25s;
        }

        /* ── АНИМАЦИИ ПОЯВЛЕНИЯ ── */
        .anim { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(.2,.9,.4,1), transform 0.65s ease; }
        .anim.vis { opacity: 1; transform: none; }

        /* ── ПРОГРЕСС-БАР ── */
        .progress {
          position: fixed; left: 18px; top: 50%; transform: translateY(-50%);
          width: 3px; height: 180px; background: rgba(255,255,255,0.1);
          border-radius: 3px; z-index: 99; overflow: hidden;
        }
        [data-theme="light"] .progress { background: rgba(0,0,0,0.1); }
        .progress-fill { width: 100%; background: linear-gradient(to top, var(--peach), var(--pink)); border-radius: 3px; transition: height .1s; }
        @media(max-width:768px){ .progress { display:none; } }

        /* ── NAV ── */
        .nav {
          position: fixed; top:0; left:0; right:0; z-index:100;
          display:flex; align-items:center; justify-content:space-between;
          padding: 16px 60px;
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          transition: background 0.35s, border-color 0.25s;
        }
        .nav-logo {
          font-family:'Unbounded',sans-serif; font-size:18px; font-weight:900;
          background: linear-gradient(90deg, var(--peach), var(--pink));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          text-decoration:none;
        }
        .nav-links { display:flex; gap:28px; list-style:none; }
        .nav-links a {
          font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
          color:var(--muted); text-decoration:none; transition:.25s;
          padding-bottom:3px; border-bottom:2px solid transparent;
        }
        .nav-links a.act { color:var(--peach); border-bottom-color:var(--peach); }
        .nav-links a:hover { color:var(--text); }
        .nav-right { display:flex; align-items:center; gap:16px; }
        .nav-cta {
          font-size:12px; font-weight:600; padding:9px 22px; border-radius:100px;
          border:1px solid rgba(244,165,130,0.45); color:var(--peach);
          text-decoration:none; transition:all .3s;
        }
        .nav-cta:hover { background:rgba(244,165,130,0.1); transform:translateY(-1px); }

        /* ── MOBILE BAR ── */
        .mobile-bar {
          position:fixed; bottom:18px; left:50%; transform:translateX(-50%);
          background:var(--nav-bg); backdrop-filter:blur(20px);
          border-radius:60px; padding:10px 22px; display:none; gap:28px;
          z-index:101; border:1px solid var(--border);
        }
        .mobile-bar button { background:none; border:none; font-size:20px; cursor:pointer; color:var(--muted); transition:.2s; }
        .mobile-bar button.act { color:var(--peach); transform:scale(1.15); }
        @media(max-width:768px){
          .nav-links { display:none; }
          .nav { padding:14px 20px; }
          .mobile-bar { display:flex; }
        }

        /* ── КНОПКИ ── */
        .btn-p, .btn-s {
          display:inline-flex; align-items:center; gap:8px;
          padding:15px 34px; border-radius:100px; font-weight:600; font-size:15px;
          font-family:'Manrope',sans-serif; text-decoration:none;
          transition:all .25s; cursor:pointer; border:none;
        }
        .btn-p {
          background: linear-gradient(135deg, var(--peach), var(--pink));
          color:#12001a;
          box-shadow: 0 0 32px rgba(244,165,130,0.3);
        }
        .btn-p:hover { transform:translateY(-3px); box-shadow:0 8px 50px rgba(244,165,130,0.45); }
        .btn-s {
          background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--text);
        }
        [data-theme="light"] .btn-s { background:rgba(0,0,0,0.04); }
        .btn-s:hover { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.2); transform:translateY(-2px); }
        [data-theme="light"] .btn-s:hover { background:rgba(0,0,0,0.08); border-color:rgba(0,0,0,0.15); }
        .btn-p:active, .btn-s:active { transform:scale(0.98); }

        /* ── КАРТОЧКИ ── */
        .card {
          background:var(--card); border:1px solid var(--card-border);
          backdrop-filter:blur(4px); border-radius:24px; padding:36px;
          transition:all .35s cubic-bezier(.34,1.56,.64,1);
        }
        .card:hover { transform:translateY(-6px); border-color:rgba(244,165,130,0.25); box-shadow:0 20px 60px rgba(0,0,0,0.3); }
        [data-theme="light"] .card:hover { box-shadow:0 12px 40px rgba(0,0,0,0.1); }

        /* ── SECTION LABELS ── */
        .s-label { display:inline-block; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--peach); margin-bottom:14px; }
        .s-title { font-family:'Unbounded',sans-serif; font-size:clamp(28px,4.5vw,48px); font-weight:700; line-height:1.1; letter-spacing:-.02em; }
        .s-sub { font-size:16px; color:var(--muted); line-height:1.7; margin-top:14px; }

        /* ── SECTION PADDING ── */
        .sec { padding:100px 60px; }
        .sec-alt { background:var(--bg2); }
        @media(max-width:768px){ .sec { padding:72px 20px; } }

        /* ── GRID ── */
        .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1100px; margin:0 auto; }
        .grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; max-width:1100px; margin:0 auto; }
        .grid-4 { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:24px; max-width:1100px; margin:0 auto; }
        @media(max-width:1024px){ .grid-3 { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:768px){ .grid-3,.grid-2,.grid-4 { grid-template-columns:1fr; } }

        /* ── SLIDER ── */
        .slider-wrap { position:relative; max-width:900px; margin:0 auto; }
        .slide-img { width:100%; height:420px; object-fit:cover; border-radius:24px; display:block; }
        .slide-caption {
          position:absolute; bottom:0; left:0; right:0; padding:24px;
          background:linear-gradient(to top,rgba(0,0,0,.75),transparent);
          color:#fff; font-weight:600; text-align:center; border-radius:0 0 24px 24px;
        }
        .sl-btn {
          position:absolute; top:50%; transform:translateY(-50%);
          background:rgba(0,0,0,.45); border:none; color:#fff; font-size:22px;
          width:46px; height:46px; border-radius:50%; cursor:pointer; backdrop-filter:blur(4px);
          transition:all .3s cubic-bezier(.34,1.56,.64,1); z-index:2; display:flex; align-items:center; justify-content:center;
        }
        .sl-btn:hover { background:var(--peach); color:#12001a; transform:translateY(-50%) scale(1.15); }
        .sl-l { left:16px; } .sl-r { right:16px; }
        .dots { display:flex; justify-content:center; gap:12px; margin-top:20px; }
        .dot { width:8px; height:8px; border-radius:8px; background:var(--muted); cursor:pointer; transition:.25s; }
        .dot.act { width:28px; background:var(--peach); }

        /* ── CHECKLIST ── */
        .cl-item {
          display:flex; align-items:center; gap:18px; padding:18px 24px;
          background:var(--card); border:1px solid var(--card-border); border-radius:16px;
          cursor:pointer; transition:all .3s; margin-bottom:10px;
        }
        .cl-item:hover { transform:translateX(6px); border-color:rgba(244,165,130,.3); background:rgba(244,165,130,.05); }
        .cl-box {
          width:24px; height:24px; border-radius:8px; border:2px solid var(--peach);
          background:transparent; display:flex; align-items:center; justify-content:center;
          flex-shrink:0; transition:all .2s; font-size:13px; color:#12001a;
        }
        .cl-box.done { background:var(--peach); }
        .cl-day { font-size:11px; color:var(--peach); font-weight:700; min-width:60px; letter-spacing:.05em; text-transform:uppercase; }
        .cl-text { font-size:15px; line-height:1.5; }

        /* ── FAQ ── */
        .faq-item {
          background:var(--card); border:1px solid var(--card-border); border-radius:20px;
          margin-bottom:14px; overflow:hidden; transition:border-color .25s;
        }
        .faq-item:hover { border-color:rgba(244,165,130,.3); }
        .faq-q {
          padding:22px 28px; font-weight:600; font-size:16px; cursor:pointer;
          display:flex; justify-content:space-between; align-items:center; gap:16px;
        }
        .faq-icon { font-size:24px; color:var(--peach); flex-shrink:0; transition:transform .25s; }
        .faq-icon.open { transform:rotate(45deg); }
        .faq-body { padding:0 28px; color:var(--muted); line-height:1.7; font-size:15px; overflow:hidden; transition:max-height .4s cubic-bezier(.33,1,.68,1), padding .3s; }

        /* ── TESTIMONIAL ── */
        .test-card { text-align:center; padding:52px 48px; }
        .test-avatar { font-size:64px; margin-bottom:20px; }
        .test-text { font-size:18px; line-height:1.7; font-style:italic; margin-bottom:24px; }
        .test-stars { color:#f59e0b; font-size:22px; margin-bottom:14px; }

        /* ── CONTACT CARD ── */
        .contact-avatar {
          width:90px; height:90px; border-radius:50%;
          background: linear-gradient(135deg, rgba(244,165,130,.2), rgba(232,96,154,.2));
          border:1px solid var(--card-border);
          display:flex; align-items:center; justify-content:center;
          font-size:40px; margin:0 auto 18px;
          overflow:hidden;
        }
        .contact-avatar img {
          width:100%; height:100%; object-fit:cover; display:block;
        }

        /* ── MODAL ── */
        .modal-ov {
          position:fixed; inset:0; background:rgba(0,0,0,.75); backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center; z-index:200;
          opacity:0; visibility:hidden; transition:.3s;
        }
        .modal-ov.open { opacity:1; visibility:visible; }
        .modal-box {
          background:var(--bg3); border:1px solid var(--border); border-radius:32px;
          padding:40px; max-width:520px; width:90%;
          transform:scale(.92); transition:transform .3s;
        }
        .modal-ov.open .modal-box { transform:scale(1); }
        .modal-input {
          width:100%; padding:13px 16px; border-radius:14px;
          background:var(--input-bg); border:1px solid var(--input-border);
          color:var(--text); font-size:15px; font-family:inherit; outline:none;
          transition:border-color .2s; margin-bottom:16px;
        }
        .modal-input:focus { border-color:var(--peach); }
        .modal-label { display:block; font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.1em; margin-bottom:6px; }

        /* ── HERO SPECIFIC ── */
        .hero-badge {
          display:inline-flex; align-items:center; gap:8px; padding:8px 20px;
          border-radius:100px; border:1px solid rgba(244,165,130,.35);
          background:rgba(244,165,130,.08); font-size:11px; font-weight:700;
          text-transform:uppercase; letter-spacing:.12em; color:var(--peach); margin-bottom:36px;
        }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--peach); box-shadow:0 0 8px var(--peach); }
        .hero-title { font-family:'Unbounded',sans-serif; font-size:clamp(44px,7.5vw,96px); font-weight:900; line-height:1.0; letter-spacing:-.03em; margin-bottom:28px; }
        .hero-grad { background:linear-gradient(90deg,var(--peach),var(--pink),var(--blue)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* ── MAP ── */
        .map-wrap { border-radius:24px; overflow:hidden; border:1px solid var(--border); height:300px; }

        /* ── DIVIDER ── */
        .divider-peach { height:1px; background:linear-gradient(90deg,transparent,var(--peach),var(--pink),transparent); opacity:.35; }
        .divider-blue  { height:1px; background:linear-gradient(90deg,transparent,var(--blue),var(--purple),transparent); opacity:.3; }
      `}</style>

      {/* ПРОГРЕСС */}
      <div className="progress">
        <div className="progress-fill" style={{ height: `${scrollProgress}%` }} />
      </div>

      {/* NAV */}
      <nav className="nav">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="nav-logo">ХАБ</a>
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={activeSection === l.id ? 'act' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
              >{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ThemeSwitcher isDark={isDark} onToggle={() => setIsDark((p) => !p)} />
          <a
            href="#booking"
            className="nav-cta"
            onClick={(e) => { e.preventDefault(); openModal('Бронирование', 'Свяжитесь с Ириной Кузнецовой в Telegram: @irina_booking, или воспользуйтесь внутренним порталом.'); }}
          >Забронировать</a>
        </div>
      </nav>

      {/* MOBILE BAR */}
      <div className="mobile-bar">
        {[
          { id:'hero', ico:'🏠' }, { id:'possibilities', ico:'⚡' },
          { id:'checklist', ico:'✅' }, { id:'contacts', ico:'👥' }, { id:'faq', ico:'❓' },
        ].map((b) => (
          <button key={b.id} className={activeSection === b.id ? 'act' : ''} onClick={() => scrollTo(b.id)}>{b.ico}</button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="hero" className="sec" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
        {/* Орбы */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', width:600, height:600, top:-150, right:-150, borderRadius:'50%', background:'radial-gradient(circle, rgba(244,165,130,0.18) 0%, transparent 70%)', filter:'blur(70px)', animation:'float1 12s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:500, height:500, bottom:-80, left:-100, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,96,154,0.15) 0%, transparent 70%)', filter:'blur(70px)', animation:'float2 16s ease-in-out infinite' }} />
          {/* Кольца */}
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {[320, 560, 800].map((size, i) => (
              <div key={i} style={{
                position:'absolute', width:size, height:size, borderRadius:'50%',
                border:`1px solid rgba(244,165,130,${0.12 - i*0.03})`,
                animation:`spin${i+1} ${30+i*20}s linear infinite${i%2===1?' reverse':''}`,
              }} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,35px)} }
          @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,-28px)} }
          @keyframes spin1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes spin2 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes spin3 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        `}</style>

        <div className="anim" style={{ textAlign:'center', maxWidth:900, margin:'0 auto', position:'relative', zIndex:2 }}>
          <div className="hero-badge"><div className="badge-dot" /> 📍 ул. Костина, 6 · Нижний Новгород</div>
          <h1 className="hero-title">
            ХАБ<br />
            <span className="hero-grad">новых возможностей</span>
          </h1>
          <p style={{ fontSize:18, color:'var(--muted)', lineHeight:1.75, maxWidth:560, margin:'0 auto 48px' }}>
            Мы запускаем проекты для развития региона. Современные технологии, инновационные сервисы и комфортное пространство — всё здесь.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#possibilities" className="btn-p" onClick={(e) => { e.preventDefault(); scrollTo('possibilities'); }}>Исследовать →</a>
            <a href="#booking" className="btn-s" onClick={(e) => { e.preventDefault(); openModal('Бронирование', 'Свяжитесь с Ириной Кузнецовой в Telegram: @irina_booking.'); }}>Забронировать</a>
          </div>
        </div>

        {/* Карта */}
        <div className="anim" style={{ maxWidth:1100, margin:'64px auto 0', width:'100%', padding:'0 60px' }}>
          <div className="map-wrap">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=44.005775%2C56.328617&z=16&pt=44.005775,56.328617"
              width="100%" height="100%" style={{ border:0, display:'block' }} allowFullScreen
            />
          </div>
        </div>
      </section>
      <div style={{ padding: '0 60px 60px' }} className="animate-on-scroll">
        <div className="map-container">
          {showVideo ? (
            <video
              ref={videoRef}
              src="/per.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '24px'
              }}
            />
          ) : (
            <iframe src="https://yandex.ru/map-widget/v1/?ll=44.005775%2C56.328617&z=16&pt=44.005775,56.328617&what=here" width="100%" height="100%" frameBorder="0" style={{ border:0, borderRadius:'24px' }} allowFullScreen></iframe>
          )}
        </div>
      </div>

      {/* ── ФОТО ОФИСА ── */}
      <div className="divider-peach" />
      <section id="office" className="sec sec-alt">
        <div className="anim" style={{ textAlign:'center', marginBottom:56 }}>
          <div className="s-label">Пространство</div>
          <h2 className="s-title">Офис Сбера на Костина, 6</h2>
          <p className="s-sub" style={{ maxWidth:520, margin:'14px auto 0' }}>Современные интерьеры, комфортные зоны для работы и отдыха</p>
        </div>
        <div className="slider-wrap anim">
          <div style={{ position:'relative', borderRadius:24, overflow:'hidden' }}>
            <img className="slide-img" src={officePhotos[officeIdx].url} alt={officePhotos[officeIdx].title} />
            <div className="slide-caption">{officePhotos[officeIdx].title}</div>
          </div>
          <button className="sl-btn sl-l" onClick={() => setOfficeIdx((p) => (p - 1 + officePhotos.length) % officePhotos.length)}>←</button>
          <button className="sl-btn sl-r" onClick={() => setOfficeIdx((p) => (p + 1) % officePhotos.length)}>→</button>
          <div className="dots">
            {officePhotos.map((_, i) => (
              <div key={i} className={`dot ${i === officeIdx ? 'act' : ''}`} onClick={() => setOfficeIdx(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ВОЗМОЖНОСТИ ── */}
      <div className="divider-blue" />
      <section id="possibilities" className="sec">
        <div className="anim" style={{ textAlign:'center', marginBottom:64 }}>
          <div className="s-label">Всё для тебя</div>
          <h2 className="s-title">Возможности центра</h2>
        </div>
        <div className="grid-3">
          {[
            { img:'sber_present.png',  name:'Программа лояльности', desc:'Бонусы, скидки у партнёров и приоритетное бронирование за активность' },
            { img:'sber_food.png',   name:'Снеки и напитки',       desc:'Бесплатный кофе, фрукты, яблоки, груши, сливы каждый день' },
            { img:'sber_rest.png',  name:'Массажное кресло',      desc:'Relax-зона с профессиональными массажными креслами' },
            { img:'sber_man_sport.png',      name:'Спортзал',              desc:'Открыт 07:00–21:00, современное оборудование, душевые' },
            { img:'/features/cowork.png',   name:'Коворкинг',             desc:'Светлые рабочие места и переговорные с 4K-экранами и Wi-Fi 6' },
            { img:'sber_books.png', name:'Обучение',              desc:'Мастер-классы, тренинги, курсы на Пульсе — постоянный рост' },
            { img:'/features/location.png', name:'Удобное расположение',  desc:'Центр города, рядом с метро Горьковская' },
            { img:'/features/print.png',    name:'Печать и канцтовары',   desc:'Цветной МФУ в коворкинге, всё необходимое на ресепшене' },
          ].map((f, i) => (
            <div className="card anim" key={i} style={{ transitionDelay:`${i*0.06}s` }}>
              {/* ВОТ ЭТО МЕНЯЕМ — вместо эмодзи просто img того же размера */}
              <img
                src={f.img}
                alt={f.name}
                style={{ width:48, height:48, objectFit:'contain', marginBottom:20, display:'block' }}
              />
              <h3 style={{ fontFamily:'Unbounded,sans-serif', fontSize:16, fontWeight:700, marginBottom:10 }}>{f.name}</h3>
              <p style={{ color:'var(--muted)', lineHeight:1.6, fontSize:14 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:52 }}>
          <button className="btn-p" onClick={() => openModal('Забронировать переговорную', 'Свяжитесь с Ириной Кузнецовой в Telegram: @irina_booking, или через внутренний портал.')}>Забронировать переговорную </button>
        </div>
      </section>

      {/* ── ЖИЗНЬ ВНУТРИ ── */}
      <div className="divider-peach" />
      <section id="life" className="sec sec-alt">
        <div className="anim" style={{ textAlign:'center', marginBottom:64 }}>
          <div className="s-label">Мероприятия</div>
          <h2 className="s-title">Жизнь внутри центра</h2>
          <p className="s-sub" style={{ maxWidth:500, margin:'14px auto 0' }}>Не только работа — каждую неделю что-то интересное</p>
        </div>
        <div className="grid-2">
          {lifeEvents.map((ev, i) => (
            <div className="card anim" key={i} style={{ transitionDelay:`${i*0.08}s` }}>
              <div style={{ fontSize:48, marginBottom:20 }}>{ev.emoji}</div>
              <h3 style={{ fontFamily:'Unbounded,sans-serif', fontSize:18, fontWeight:700, marginBottom:12 }}>{ev.title}</h3>
              <p style={{ color:'var(--muted)', lineHeight:1.65, fontSize:14 }}>{ev.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:48 }}>
          <a href="https://t.me/HubEventMatch_bot" target="_blank" rel="noreferrer" className="btn-s">📅 Записаться через бот</a>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ── */}
      <div className="divider-blue" />
      <section id="testimonials" className="sec">
        <div className="anim" style={{ textAlign:'center', marginBottom:16 }}>
          <div className="s-label">Что говорят</div>
          <h2 className="s-title">Отзывы сотрудников</h2>
          <div style={{ fontSize:28, color:'#f59e0b', marginTop:16 }}>★★★★★ <span style={{ color:'var(--muted)', fontSize:18 }}>5.0 / 5</span></div>
        </div>
        <div className="slider-wrap anim" style={{ marginTop:48 }}>
          <div className="card test-card">
            <div className="test-avatar">{testimonials[testimonialIdx].avatar}</div>
            <p className="test-text">«{testimonials[testimonialIdx].text}»</p>
            <div className="test-stars">★★★★★</div>
            <h4 style={{ fontFamily:'Unbounded,sans-serif', fontSize:16, fontWeight:700 }}>{testimonials[testimonialIdx].name}</h4>
            <p style={{ color:'var(--muted)', marginTop:6 }}>{testimonials[testimonialIdx].role}</p>
          </div>
          <button className="sl-btn sl-l" onClick={() => setTestimonialIdx((p) => (p - 1 + testimonials.length) % testimonials.length)}>←</button>
          <button className="sl-btn sl-r" onClick={() => setTestimonialIdx((p) => (p + 1) % testimonials.length)}>→</button>
          <div className="dots">
            {testimonials.map((_, i) => (
              <div key={i} className={`dot ${i === testimonialIdx ? 'act' : ''}`} onClick={() => setTestimonialIdx(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ЧЕК-ЛИСТ ── */}
      <div className="divider-peach" />
      <section id="checklist" className="sec sec-alt">
        <div className="anim" style={{ textAlign:'center', marginBottom:56 }}>
          <div className="s-label">Адаптация</div>
          <h2 className="s-title">Что меня ждёт?</h2>
          <p className="s-sub">Интерактивный чек-лист — отмечай выполненное</p>
        </div>
        <div style={{ maxWidth:820, margin:'0 auto' }}>
          {checklistItems.map((item, i) => (
            <div className="cl-item anim" key={i} style={{ transitionDelay:`${i*0.04}s` }} onClick={() => {
              const next = [...checklist]; next[i] = !next[i]; setChecklist(next);
            }}>
              <div className={`cl-box${checklist[i] ? ' done' : ''}`}>{checklist[i] ? '✓' : ''}</div>
              <div className="cl-day">{item.day}</div>
              <div className="cl-text" style={{ textDecoration: checklist[i] ? 'line-through' : 'none', opacity: checklist[i] ? 0.5 : 1 }}>{item.text}</div>
            </div>
          ))}
          <div style={{ textAlign:'center', marginTop:32 }}>
            <div style={{ display:'inline-block', padding:'10px 24px', borderRadius:100, background:'rgba(244,165,130,0.12)', color:'var(--peach)', fontSize:14, fontWeight:600 }}>
              ✅ Выполнено: {checklist.filter(Boolean).length} / {checklist.length}
            </div>
          </div>
          <p style={{ marginTop:28, color:'var(--muted)', fontSize:13, fontStyle:'italic', textAlign:'center' }}>
            * Период адаптации — 1 неделя. После прохождения курсов на «Пульсе» открываются все бонусы.
          </p>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <div className="divider-blue" />
      <section id="contacts" className="sec">
        <div className="anim" style={{ textAlign:'center', marginBottom:60 }}>
          <div className="s-label">Команда поддержки</div>
          <h2 className="s-title">К кому обратиться?</h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:24, maxWidth:1100, margin:'0 auto' }}>
          {contacts.map((c, i) => (
            <div className="card anim" key={i} style={{ textAlign:'center', transitionDelay:`${i*0.07}s` }}>
              <div className="contact-avatar">
                {c.avatarImg
                  ? <img src={c.avatarImg} alt={c.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                  : <span>{c.emoji}</span>
                }
              </div>
              <h3 style={{ fontFamily:'Unbounded,sans-serif', fontSize:14, fontWeight:700, marginBottom:8 }}>{c.name}</h3>
              <p style={{ color:'var(--muted)', fontSize:12, marginBottom:20 }}>{c.role}</p>
              <a href={`https://t.me/${c.tg}`} target="_blank" rel="noreferrer" className="btn-s" style={{ fontSize:12, padding:'9px 16px' }}>✈️ Telegram</a>
            </div>
          ))}

          {/* Пятая карточка — Хочу в команду */}
          <div className="card anim" style={{ textAlign:'center', cursor:'pointer' }} onClick={() => setApplyOpen(true)}>
            <div className="contact-avatar">
              <img src="add.png" alt='add'/>
            </div>
            <h3 style={{ fontFamily:'Unbounded,sans-serif', fontSize:14, fontWeight:700, marginBottom:8 }}>Хочу в команду</h3>
            <p style={{ color:'var(--muted)', fontSize:12, marginBottom:20 }}>Присоединяйтесь к нам!</p>
            <button className="btn-p" style={{ fontSize:12, padding:'9px 16px', border:'none', cursor:'pointer' }}>Заявка</button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="divider-peach" />
      <section id="faq" className="sec sec-alt">
        <div className="anim" style={{ textAlign:'center', marginBottom:56 }}>
          <div className="s-label">Ответы</div>
          <h2 className="s-title">Часто задаваемые вопросы</h2>
        </div>
        <div style={{ maxWidth:820, margin:'0 auto' }}>
          {faqItems.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div className="faq-item anim" key={i} style={{ transitionDelay:`${i*0.04}s` }}>
                <div className="faq-q" onClick={() => setOpenFaq(isOpen ? null : i)}>
                  <span>{item.q}</span>
                  <span className={`faq-icon${isOpen ? ' open' : ''}`}>+</span>
                </div>
                <div
                  ref={(el) => { faqRefs.current[i] = el; }}
                  className="faq-body"
                  style={{
                    maxHeight: isOpen ? `${faqRefs.current[i]?.scrollHeight ?? 300}px` : '0px',
                    paddingBottom: isOpen ? 22 : 0,
                  }}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'32px 60px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16, background:'var(--bg)' }}>
        <div style={{ fontFamily:'Unbounded,sans-serif', fontWeight:700, fontSize:14 }}>ХАБ · Сбер</div>
        <div style={{ color:'var(--muted)', fontSize:13 }}>ул. Костина, 6, Нижний Новгород · © 2026 Сбер</div>
      </footer>

      {/* ── МОДАЛ INFO ── */}
      <div className={`modal-ov${modal.open ? ' open' : ''}`} onClick={closeModal}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontFamily:'Unbounded,sans-serif', fontWeight:700, fontSize:22, marginBottom:16 }}>{modal.title}</h3>
          <p style={{ color:'var(--muted)', lineHeight:1.65 }}>{modal.body}</p>
          <button className="btn-p" style={{ marginTop:28, border:'none', cursor:'pointer' }} onClick={closeModal}>Закрыть</button>
        </div>
      </div>

      {/* ── МОДАЛ ЗАЯВКА ── */}
      <div className={`modal-ov${applyOpen ? ' open' : ''}`} onClick={() => { setApplyOpen(false); setApplyDone(false); }}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          {applyDone ? (
            <div style={{ textAlign:'center', padding:'20px 0' }}>
              <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
              <h3 style={{ fontFamily:'Unbounded,sans-serif', fontWeight:700, fontSize:20, marginBottom:12 }}>Заявка отправлена!</h3>
              <p style={{ color:'var(--muted)' }}>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily:'Unbounded,sans-serif', fontWeight:700, fontSize:20, marginBottom:6 }}>Хочу в команду</h3>
              <p style={{ color:'var(--muted)', fontSize:13, marginBottom:28 }}>Заполните форму — мы свяжемся с вами!</p>
              <form onSubmit={handleApply}>
                <label className="modal-label">Имя *</label>
                <input className="modal-input" required placeholder="Иван Иванов" value={applyForm.name} onChange={(e) => setApplyForm({ ...applyForm, name:e.target.value })} />
                <label className="modal-label">Направление / роль *</label>
                <input className="modal-input" required placeholder="Разработчик, аналитик..." value={applyForm.role} onChange={(e) => setApplyForm({ ...applyForm, role:e.target.value })} />
                <label className="modal-label">Telegram</label>
                <input className="modal-input" placeholder="@username" value={applyForm.tg} onChange={(e) => setApplyForm({ ...applyForm, tg:e.target.value })} />
                <label className="modal-label">О себе</label>
                <textarea className="modal-input" rows={3} placeholder="Расскажите немного о себе..." value={applyForm.message} onChange={(e) => setApplyForm({ ...applyForm, message:e.target.value })} style={{ resize:'none' }} />
                <div style={{ display:'flex', gap:12, marginTop:4 }}>
                  <button type="submit" className="btn-p" style={{ flex:1, justifyContent:'center', border:'none', cursor:'pointer', padding:'13px 0' }}>Отправить</button>
                  <button type="button" className="btn-s" style={{ padding:'13px 20px', cursor:'pointer' }} onClick={() => setApplyOpen(false)}>Отмена</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}