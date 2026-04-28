'use client';

import { useEffect, useRef, useState } from 'react';

function ThemeSwitcher({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
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
        {isDark && (
          <>
            <div style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'white', opacity:0.8, top:6, left:10 }} />
            <div style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'white', opacity:0.6, top:14, left:20 }} />
            <div style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'white', opacity:0.9, top:8, left:32 }} />
          </>
        )}
      </div>
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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#a0b4d6">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        )}
      </div>
    </div>
  );
}

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
  {
    q: 'Как посетить спортзал?',
    a: 'Спортзал находится на первом этаже, слева от ресепшена. Открыт ежедневно с 07:00 до 21:00 — вход свободный для всех сотрудников без предварительной записи. Вам доступны: беговые дорожки, велотренажёры, силовая рама, гантели до 50 кг и скамьи. Есть раздевалки с ключами, душевые кабины, а также кулер с питьевой водой и чистое полотенце можно взять на ресепшене. В часы пик (12:00–14:00) зал может быть загружен, выбирайте другое время, если хотите заниматься в тишине.'
  },
  {
    q: 'Когда и где можно пообедать?',
    a: 'Обеденный перерыв — 50 минут, вы можете выбрать любое время с 11:30 до 15:00 (согласуйте с руководителем). В столовой на втором этаже каждый день с 12:00 до 14:00 доступны горячие обеды: первое, второе, салат, хлеб, компот. Также есть зона с двумя микроволновками, холодильником и кофемашиной — можно разогреть принесённую еду. Если хотите заказать доставку, ресепшн хранит меню ближайших кафе (рекомендуем «Супчик» и «Вкусное дело»). Запрещено разогревать рыбу и сильно пахнущие блюда в общих микроволновках, пожалуйста, уважайте коллег.'
  },
  {
    q: 'Как забронировать переговорную или коворкинг?',
    a: 'Забронировать можно двумя способами: (1) через внутренний портал «Бронирование» — выберите дату, время, количество участников, и система подтвердит, свободна ли комната. (2) Написать Ирине Кузнецовой, менеджеру по бронированию, в Telegram: @irina_booking (отвечает в рабочие дни с 9:00 до 18:00). Переговорные оснащены 4K-экраном, маркерной доской и конференц-связью. Коворкинг — open space с 12 рабочими местами, быстрым Wi-Fi и розетками у каждого стола. Бронирование — минимум на 1 час, максимум на 4 часа. Отмените бронь не позже чем за 30 минут, иначе штрафные бонусы.'
  },
  {
    q: 'Как долго длится адаптация для новичков?',
    a: 'Базовая адаптация официально длится 1 неделю. За вами закрепляют бадди-наставника (он проведёт экскурсию, познакомит с командой, ответит на бытовые вопросы). В первую неделю нужно обязательно пройти инструктаж по кибербезопасности, охране труда и пожарной безопасности — запишитесь у Александры Ивановой (@alex_hub). Полное погружение в рабочие процессы, доступ к корпоративным сервисам и полным правам занимает около месяца. По итогам месяца вы заполняете чек-лист адаптации (он есть на портале) и получаете приветственные бонусы в программе лояльности.'
  },
  {
    q: 'Как записаться на мастер-классы, дегустации и другие события?',
    a: 'Актуальное расписание публикуется в корпоративном телеграм-канале «Hub События» каждый понедельник. Запись на мероприятия — через специального бота @HubEventMatch_bot: выберите событие, нажмите «Записаться», и бот пришлёт напоминание за час. Если передумали, отмените запись в том же боте (но не позже чем за 2 часа, иначе событие будет считаться посещённым, а бонусы не начислят). Также можно записаться устно у Александры Ивановой (@alex_hub) — она ведёт общий список. Участие бесплатное, но количество мест ограничено (обычно 20–30 человек).'
  },
  {
    q: 'Как согласовать график работы? Есть ли гибкий формат?',
    a: 'График обсуждается с вашим руководителем в первую неделю работы. Действует система «core hours»: с 10:00 до 16:00 вы обязательно должны быть на связи (в офисе или удалённо). Остальные часы (рано утром, вечером) — по вашему усмотрению, но общая нагрузка 40 часов в неделю. Можно работать полностью из офиса, гибридно (2–3 дня в офисе) или полностью удалённо, если это позволяет ваша роль (например, аналитика, разработка). Для удалённой работы необходимо подать заявку через корпоративный портал (раздел «Удалённый режим») — её рассматривает руководитель и HR. При одобрении вы получаете доступ к VPN и корпоративной защите. В удалённые дни вы обязаны быть онлайн в рабочие часы, отвечать в чатах и участвовать в видеозвонках.'
  }
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [officeIdx, setOfficeIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(() => {
    return new Array(checklistItems.length).fill(false);
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; title: string; body: string }>({ open: false, title: '', body: '' });
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', role: '', tg: '', message: '' });
  const [applyDone, setApplyDone] = useState(false);

  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.anim').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const saved = localStorage.getItem('hubChecklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === checklistItems.length) {
          setChecklist(parsed);
        }
      } catch (e) {}
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('hubChecklist', JSON.stringify(checklist));
  }, [checklist, isClient]);

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

  const handleAiSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    const userMsg = aiMessage.trim();
    setAiChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiMessage('');
    setAiLoading(true);
    
    setTimeout(() => {
      setAiChat(prev => [...prev, {
        role: 'assistant',
        text: `Спасибо за вопрос! Я AI-помощник хаба. Отвечу так: «${userMsg}». Обратитесь также к нашим контактам в разделе "К кому обратиться".`
      }]);
      setAiLoading(false);
    }, 1000);
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
      {/* AI‑Оверлей (затемнение) */}
      {aiOpen && (
        <div
          onClick={() => setAiOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 102,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Плавающая кнопка AI */}
      <button
        onClick={() => setAiOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--peach), var(--pink))',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 103,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        🤖
      </button>

      {/* AI-модалка (выезжает снизу) */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: 'auto',
          width: 'min(90%, 400px)',
          backgroundColor: 'var(--bg3)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.3)',
          zIndex: 104,
          transform: aiOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          border: '1px solid var(--border)',
          borderBottom: 'none',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg2)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
        >
          <span style={{ fontWeight: 600, fontFamily: 'Unbounded, sans-serif', fontSize: '16px' }}>🤖 AI‑помощник</span>
          <button
            onClick={() => setAiOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--text)',
              opacity: 0.7,
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '60vh',
          }}
        >
          {aiChat.length === 0 && (
            <div style={{ color: 'var(--muted)', textAlign: 'center', fontSize: '14px', padding: '20px 0' }}>
              Задайте вопрос о хабе, мероприятиях, бронировании и т.д.
            </div>
          )}
          {aiChat.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, var(--peach), var(--pink))'
                    : 'var(--card)',
                color: msg.role === 'user' ? '#12001a' : 'var(--text)',
                padding: '10px 14px',
                borderRadius: '18px',
                maxWidth: '85%',
                fontSize: '14px',
                wordBreak: 'break-word',
                border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
              }}
            >
              {msg.text}
            </div>
          ))}
          {aiLoading && (
            <div
              style={{
                alignSelf: 'flex-start',
                background: 'var(--card)',
                padding: '10px 14px',
                borderRadius: '18px',
                fontSize: '14px',
                color: 'var(--muted)',
              }}
            >
              Печатает...
            </div>
          )}
        </div>
        <form
          onSubmit={handleAiSend}
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '12px',
            background: 'var(--bg2)',
          }}
        >
          <input
            type="text"
            placeholder="Спросите что-нибудь..."
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '100px',
              border: '1px solid var(--border)',
              background: 'var(--input-bg)',
              color: 'var(--text)',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={aiLoading}
            style={{
              background: 'linear-gradient(135deg, var(--peach), var(--pink))',
              border: 'none',
              borderRadius: '100px',
              padding: '0 20px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#12001a',
            }}
          >
            Отправить
          </button>
        </form>
      </div>
      
      <div className="progress">
        <div className="progress-fill" style={{ height: `${scrollProgress}%` }} />
      </div>

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

      <div className="mobile-bar">
        {[
          { id:'hero', ico:'🏠' }, { id:'possibilities', ico:'⚡' },
          { id:'checklist', ico:'✅' }, { id:'contacts', ico:'👥' }, { id:'faq', ico:'❓' },
        ].map((b) => (
          <button key={b.id} className={activeSection === b.id ? 'act' : ''} onClick={() => scrollTo(b.id)}>{b.ico}</button>
        ))}
      </div>

      <section id="hero" className="sec" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', width:600, height:600, top:-150, right:-150, borderRadius:'50%', background:'radial-gradient(circle, rgba(244,165,130,0.18) 0%, transparent 70%)', filter:'blur(70px)', animation:'float1 12s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:500, height:500, bottom:-80, left:-100, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,96,154,0.15) 0%, transparent 70%)', filter:'blur(70px)', animation:'float2 16s ease-in-out infinite' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {[320, 560, 800].map((size, i) => (
              <div key={i} style={{
                position:'absolute', width:size, height:size, borderRadius:'50%',
                border:`1px solid rgba(244,165,130,${0.12 - i*0.03})`,
                animation:`spin${i+1} ${30+i*20}s linear infinite${i%2===1?' reverse':''}`,
              }} />
            ))}
          </div>

          <div className="deco" style={{ width:420, height:420, top:'5%', right:'-80px', opacity:0.55, animation:'deco-float 10s ease-in-out infinite' }}>
            <img src="/brandbook/20.png" alt="" />
          </div>
          <div className="deco" style={{ width:320, height:320, bottom:'10%', left:'-60px', opacity:0.2, animation:'deco-spin 40s linear infinite' }}>
            <img src="/brandbook/22.png" alt="" />
          </div>
          <div className="deco" style={{ width:180, height:180, top:'12%', left:'8%', opacity:0.22, animation:'deco-float 14s ease-in-out infinite 2s' }}>
            <img src="/brandbook/34.png" alt="" />
          </div>
          <div className="deco" style={{ width:80, height:80, top:'18%', right:'18%', opacity:0.28, animation:'deco-float 8s ease-in-out infinite 1s' }}>
            <img src="/brandbook/16.png" alt="" />
          </div>
          <div className="deco" style={{ width: 420, height: 420, top: '18%', right: '-60px', opacity: 0.75, animation: 'deco-float 11s ease-in-out infinite', zIndex: 2}}>
            <img src="/brandbook/IMG_0339.png" alt="Котик-астронавт" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="deco" style={{ width: 580, height: 580, top: '-120px', left: '50%', transform: 'translateX(-50%)', opacity: 0.22, animation: 'deco-spin 75s linear infinite',zIndex: 1}}>
            <img src="/brandbook/33.png" alt="Космическая планета" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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

        <div className="anim" style={{ maxWidth:1100, margin:'64px auto 0', width:'100%', padding:'0 60px' }}>
          <div className="map-wrap">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=44.005775%2C56.328617&z=16&pt=44.005775,56.328617"
              width="100%" height="100%" style={{ border:0, display:'block' }} allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ДЕКОР МЕЖДУ HERO И ОФИСОМ */}
      <div style={{ position:'relative', height:0, overflow:'visible', zIndex:10 }}>
        <img
          src="/brandbook/3d-ribbon.png"
          alt=""
          style={{ position:'absolute', right:60, top:-120, width:240, opacity:0.45, pointerEvents:'none', animation:'deco-float 12s ease-in-out infinite' }}
        />
      </div>

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

      {/* ── ВОЗМОЖНОСТИ С ДЕКОРОМ ── */}
      <div className="divider-blue" />
      <section id="possibilities" className="sec" style={{ position:'relative', overflow:'hidden' }}>
        <div className="deco" style={{ width:500, height:500, top:-100, right:-100, opacity:0.08, animation:'deco-spin 60s linear infinite reverse' }}>
          <img src="/brandbook/orbit-sphere.png" alt="" />
        </div>
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
            { img:'sber_suitcase.png',   name:'Коворкинг',             desc:'Светлые рабочие места и переговорные с 4K-экранами и Wi-Fi 6' },
            { img:'sber_books.png', name:'Обучение',              desc:'Мастер-классы, тренинги, курсы на Пульсе — постоянный рост' },
            { img:'sber_a_man_is_resting_in_a_chair.png', name:'Удобное расположение',  desc:'Центр города, рядом с метро Горьковская' },
            { img:'sber_printer.png',    name:'Печать и канцтовары',   desc:'Цветной МФУ в коворкинге, всё необходимое на ресепшене' },
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
          <button className="btn-p" onClick={() => openModal('Забронировать переговорную', 'Свяжитесь с Ириной Кузнецовой в Telegram: @irina_booking, или через внутренний портал.')}>Забронировать переговорную</button>
        </div>
      </section>

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

      <div className="divider-blue" />
      <section id="testimonials" className="sec">
        <div className="anim" style={{ textAlign:'center', marginBottom:16 }}>
          <div className="s-label">Что говорят</div>
          <h2 className="s-title">Отзывы сотрудников</h2>
          <div style={{ fontSize:28, color:'#f59e0b', marginTop:16 }}>★★★★★ <span style={{ color:'var(--muted)', fontSize:18 }}>5.0 / 5</span></div>
        </div>

        <div className="testimonial-slider">
          <div className="testimonial-track" style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}>
            {testimonials.map((t, idx) => (
              <div className="testimonial-slide" key={idx}>
                <div className="card test-card" style={{ margin:0, width:'100%' }}>
                  <div className="test-avatar">{t.avatar}</div>
                  <p className="test-text">«{t.text}»</p>
                  <div className="test-stars">★★★★★</div>
                  <h4 style={{ fontFamily:'Unbounded,sans-serif', fontSize:16, fontWeight:700 }}>{t.name}</h4>
                  <p style={{ color:'var(--muted)', marginTop:6 }}>{t.role}</p>
                </div>
              </div>
            ))}
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

      {/* ── ЧЕК-ЛИСТ С ДЕКОРОМ ── */}
      <div className="divider-peach" />
      <section id="checklist" className="sec sec-alt" style={{ position:'relative', overflow:'hidden' }}>
        <div className="deco" style={{ width:300, height:300, bottom:0, left:-80, opacity:0.2, animation:'deco-float 16s ease-in-out infinite' }}>
          <img src="/brandbook/3d-blob.png" alt="" />
        </div>
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

      <div className="divider-blue" />
      <section id="contacts" className="sec">
        <div className="anim" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="s-label">Команда поддержки</div>
          <h2 className="s-title">К кому обратиться?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {contacts.map((c, i) => (
            <div className="card anim" key={i} style={{ textAlign: 'center', transitionDelay: `${i * 0.07}s`, display: 'flex', flexDirection: 'column', height: '100%', padding: '36px 28px'}}>
              <div className="contact-avatar">
                {c.avatarImg ? (
                  <img src={c.avatarImg} alt={c.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <span>{c.emoji}</span>
                )}
              </div>
              <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{c.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 20,flexGrow: 1, lineHeight: 1.4}}>{c.role}</p>
              <a href={`https://t.me/${c.tg}`} target="_blank" rel="noreferrer" className="btn-s" style={{ fontSize: 12, padding: '11px 20px', marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textAlign: 'center' }}>✈️ Telegram</a>
            </div>
          ))}

          <div className="card anim" style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', padding: '36px 28px'}} onClick={() => setApplyOpen(true)}>
            <div className="contact-avatar">
              <img src="add.png" alt="add" />
            </div>
            <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Хочу в команду</h3>
            <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 20, flexGrow: 1, lineHeight: 1.4}}>Присоединяйтесь к нам!</p>
            <button className="btn-p" style={{ fontSize: 12, padding: '11px 20px', marginTop: 'auto', width: '100%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Заявка</button>
          </div>
        </div>
      </section>

      {/* ── FAQ С ДЕКОРОМ ── */}
      <div className="divider-peach" />
      <section id="faq" className="sec sec-alt" style={{ position:'relative', overflow:'hidden' }}>
        <div className="deco" style={{ width:260, height:260, top:40, right:-60, opacity:0.12, animation:'deco-spin 50s linear infinite' }}>
          <img src="/brandbook/orbit-planet.png" alt="" />
        </div>
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

      <footer style={{ padding:'32px 60px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16, background:'var(--bg)' }}>
        <div style={{ fontFamily:'Unbounded,sans-serif', fontWeight:700, fontSize:14 }}>ХАБ · Сбер</div>
        <div style={{ color:'var(--muted)', fontSize:13 }}>ул. Костина, 6, Нижний Новгород · © 2026 Сбер</div>
      </footer>

      <div className={`modal-ov${modal.open ? ' open' : ''}`} onClick={closeModal}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontFamily:'Unbounded,sans-serif', fontWeight:700, fontSize:22, marginBottom:16 }}>{modal.title}</h3>
          <p style={{ color:'var(--muted)', lineHeight:1.65 }}>{modal.body}</p>
          <button className="btn-p" style={{ marginTop:28, border:'none', cursor:'pointer' }} onClick={closeModal}>Закрыть</button>
        </div>
      </div>

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