'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', role: '', tg: '', message: '' });
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [officeSlideIndex, setOfficeSlideIndex] = useState(0);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setApplyModalOpen(false);
      setApplyForm({ name: '', role: '', tg: '', message: '' });
    }, 2500);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
  };
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [checklistState, setChecklistState] = useState<boolean[]>(new Array(12).fill(false));
  const [engagement, setEngagement] = useState(0);
  const [counter310, setCounter310] = useState(false);
  
  const engagementRef = useRef<HTMLDivElement>(null);
  const counter310Ref = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Фото офиса (замените на свои)
  const officePhotos = [
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', title: 'Современный коворкинг' },
    { url: 'https://images.unsplash.com/photo-1497366811353-2a2e6d7e8b0a?w=800', title: 'Переговорная' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', title: 'Зона отдыха' },
    { url: '/sportzals/IMG_0347.jpeg', title: 'Спортзал' }
  ];
  
  // Кастомный плавный скролл
  const smoothScrollToCustom = (targetElementId: string) => {
    const target = document.getElementById(targetElementId);
    if (!target) return;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime: number | null = null;
    
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollToCustom(id);
  };
  
  // Активная секция
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -30% 0px' }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  
  // Анимация появления
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  
  // Счётчики
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id === 'engagement-meter') {
            let start = 0;
            const end = 95;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = end / steps;
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) { setEngagement(end); clearInterval(timer); }
              else setEngagement(Math.floor(start));
            }, stepTime);
            observer.unobserve(entry.target);
          }
          if (entry.isIntersecting && entry.target.id === 'counter310') {
            setCounter310(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (engagementRef.current) observer.observe(engagementRef.current);
    if (counter310Ref.current) observer.observe(counter310Ref.current);
    return () => observer.disconnect();
  }, []);
  
  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  
  const nextOfficeSlide = () => setOfficeSlideIndex((prev) => (prev + 1) % officePhotos.length);
  const prevOfficeSlide = () => setOfficeSlideIndex((prev) => (prev - 1 + officePhotos.length) % officePhotos.length);
  
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);
  
  const toggleChecklist = (idx: number) => {
    const newState = [...checklistState];
    newState[idx] = !newState[idx];
    setChecklistState(newState);
  };
  
  const openModal = (title: string, body: string) => {
    setModalContent({ title, body });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setApplyModalOpen(false);
      setApplyForm({ name: '', role: '', tg: '', message: '' });
    }, 2500);
  };
  
  // Данные
  const testimonials = [
    { name: 'Анна К.', role: 'Аналитик', text: 'Отличное пространство! Удобные переговорные, всегда есть место для работы.', rating: 5, avatar: '👩‍💼' },
    { name: 'Дмитрий В.', role: 'Руководитель проектов', text: 'Программа лояльности приятно удивляет. Кофе и снеки — отличный бонус.', rating: 5, avatar: '👨‍💻' },
    { name: 'Елена М.', role: 'Дизайнер', text: 'Мастер-классы и события помогают прокачивать навыки и знакомиться с коллегами.', rating: 5, avatar: '🎨' },
    { name: 'Сергей П.', role: 'Разработчик', text: 'Спортзал и массажное кресло — то, что нужно после долгого кодинга.', rating: 5, avatar: '💪' }
  ];
  
  const checklistItems = [
    { day: 'День 1', text: 'Заполнить анкету новичка' },
    { day: 'День 1', text: 'Получить ноутбук и доступы' },
    { day: 'День 1', text: 'Пройти экскурсию по центру' },
    { day: 'День 2', text: 'Встреча с куратором / бадди' },
    { day: 'День 2', text: 'Инструктаж по кибербезопасности' },
    { day: 'День 2', text: 'Инструктаж по охране труда' },
    { day: 'День 3', text: 'Изучить курсы на «Пульсе» (ИИ-агенты, GigaChat)' },
    { day: 'День 3', text: 'Познакомиться с командой' },
    { day: 'День 3', text: 'Первый дейлик / стендап' },
    { day: 'Доп.', text: 'Самостоятельные курсы в АС ПУЛЬС' },
    { day: 'Доп.', text: 'Предложить идеи для улучшения' },
    { day: 'Доп.', text: 'Программа лояльности: активировать бонусы' }
  ];
  
  const faqItems = [
    { q: 'Какие часы работы спортзала?', a: 'Спортзал открыт ежедневно с 07:00 до 21:00.' },
    { q: 'Сколько времени длится обеденный перерыв?', a: 'Обед — 50 минут, в столовой предусмотрены горячие блюда.' },
    { q: 'Как забронировать переговорную?', a: 'Через внутренний портал или у менеджера (Ирина Кузнецова).' },
    { q: 'Какой период адаптации для новичков?', a: 'Базовая адаптация — 1 неделя, полное погружение — до месяца.' },
    { q: 'Что входит в программу лояльности?', a: 'Скидки на услуги партнёров, бонусы за активность, приоритетное бронирование.' },
    { q: 'Где взять канцтовары и распечатать документы?', a: 'На ресепшене есть всё необходимое, печать — в зоне коворкинга.' }
  ];
  
  const contacts = [
    { name: 'Александра Иванова', role: 'Специалист по адаптации', tg: '@alex_hub', avatarImg: '/people/ava-nadya-v@2x.png', avatarEmoji: '👩' },
    { name: 'Михаил Смирнов', role: 'Технический специалист', tg: '@michael_tech', avatarImg: '/people/ava-azat@2x.png', avatarEmoji: '🔧' },
    { name: 'Ирина Кузнецова', role: 'Менеджер по бронированию', tg: '@irina_booking', avatarImg: '/people/ava-nastya@2x.png', avatarEmoji: '📅' },
    { name: 'Фёдор Петров', role: 'Бадди', tg: '@fedor_buddy', avatarImg: '/people/ava-vlad@2x.png', avatarEmoji: '🤝' }
  ];
  
  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'SBSansDisplay';
          src: url('/fonts/SBSansDisplay-Light.woff2') format('woff2');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'SBSansDisplay';
          src: url('/fonts/SBSansDisplay-SemiBold.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :root {
          --peach: #f4a582;
          --pink: #e8609a;
          --blue: #5bc8f5;
          --purple: #b388f7;
          --bg: #07070e;
          --bg2: #0d0d18;
          --bg3: #11111f;
          --text: #f0eef8;
          --muted: rgba(240,238,248,0.45);
          --border: rgba(255,255,255,0.08);
        }
        
        html { scroll-behavior: auto; }
        body {
          font-family: 'SBSansDisplay', 'Manrope', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          font-weight: 300;
        }
        h1, h2, h3, .bold-text { font-weight: 600; }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s ease;
        }
        .animated-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 60px;
          backdrop-filter: blur(20px);
          background: rgba(7,7,14,0.8);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { font-size: 24px; font-weight: 600; background: linear-gradient(90deg, var(--peach), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: 0.3s; padding-bottom: 4px; border-bottom: 2px solid transparent; }
        .nav-links a.active-link { color: var(--peach); border-bottom-color: var(--peach); }
        .nav-links a:hover { color: var(--text); }
        .nav-cta { font-size: 13px; font-weight: 600; padding: 10px 24px; border-radius: 100px; border: 1px solid rgba(244,165,130,0.5); background: transparent; color: var(--peach); text-decoration: none; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .nav-cta:hover { background: rgba(244,165,130,0.12); transform: translateY(-2px) scale(1.05); box-shadow: 0 4px 20px rgba(244,165,130,0.25); border-color: rgba(244,165,130,0.8); }
        .nav-cta:active { transform: scale(0.97); }
        
        .mobile-sticky-bar {
          position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: rgba(13,13,24,0.95); backdrop-filter: blur(20px);
          border-radius: 60px; padding: 10px 20px; display: none; gap: 32px;
          z-index: 101; border: 1px solid var(--border);
        }
        .mobile-sticky-bar button { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--muted); transition: 0.2s; }
        .mobile-sticky-bar button.active-mobile { color: var(--peach); transform: scale(1.1); }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-sticky-bar { display: flex; }
          .nav { padding: 16px 24px; }
        }
        
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 120px 60px 60px; background: radial-gradient(circle at 10% 20%, rgba(244,165,130,0.08), transparent 60%); }
        .hero-inner { text-align: center; max-width: 900px; z-index: 2; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 100px; border: 1px solid rgba(244,165,130,0.35); background: rgba(244,165,130,0.08); font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--peach); margin-bottom: 40px; }
        .hero-title { font-family: 'SBSansDisplay', sans-serif; font-size: clamp(48px, 8vw, 100px); font-weight: 600; line-height: 1.0; margin-bottom: 32px; }
        .hero-title-line2 { background: linear-gradient(90deg, var(--peach), var(--pink), var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 18px; color: var(--muted); line-height: 1.75; margin-bottom: 52px; max-width: 560px; margin-left: auto; margin-right: auto; }
        .btn-primary, .btn-secondary { display: inline-flex; padding: 16px 36px; border-radius: 100px; font-weight: 600; text-decoration: none; }
        .btn-primary {
          background: linear-gradient(135deg, var(--peach), var(--pink));
          color: #12001a;
          box-shadow: 0 0 40px rgba(244,165,130,0.3);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 16px 60px rgba(244,165,130,0.55); }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:active { transform: translateY(-1px) scale(0.98); }
        .btn-secondary {
          background: rgba(255,255,255,0.05);
          color: var(--text);
          border: 1px solid var(--border);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.25); transform: translateY(-4px) scale(1.03); box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
        .btn-secondary:active { transform: translateY(-1px) scale(0.98); }
        
        .section-label { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--peach); margin-bottom: 16px; }
        .section-title { font-family: 'SBSansDisplay', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 600; line-height: 1.1; }
        .features-grid, .contacts-grid { display: grid; gap: 24px; max-width: 1100px; margin: 0 auto; }
        .features-grid { grid-template-columns: repeat(3,1fr); }
        .contacts-grid { grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); }
        .card { background: var(--bg3); border: 1px solid var(--border); border-radius: 24px; padding: 32px; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .card:hover { transform: translateY(-8px); border-color: rgba(244,165,130,0.3); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .card:hover > div:first-child { transform: scale(1.2) rotate(-6deg); }
        
        .contact-avatar {
          width: 80px;
          height: 80px;
          background: #2a2a3a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
          font-size: 40px;
          overflow: hidden;
        }
        .contact-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .map-container { border-radius: 24px; overflow: hidden; border: 1px solid var(--border); height: 300px; background: var(--bg3); display: flex; align-items: center; justify-content: center; color: var(--muted); }
        
        .testimonial-slider, .office-slider { position: relative; max-width: 900px; margin: 0 auto; }
        .office-slide { position: relative; border-radius: 24px; overflow: hidden; }
        .office-slide img { width: 100%; height: 400px; object-fit: cover; display: block; }
        .slide-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 20px; color: white; font-weight: 600; text-align: center; }
        .office-slider .slider-btn { top: 50%; transform: translateY(-50%); }
        
        .testimonial-card { text-align: center; padding: 40px; }
        .testimonial-avatar { font-size: 64px; margin-bottom: 16px; }
        .stars { color: gold; font-size: 24px; margin: 12px 0; }
        .slider-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; color: white; font-size: 28px; cursor: pointer; width: 44px; height: 44px; border-radius: 50%; backdrop-filter: blur(4px); transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 2; }
        .slider-btn:hover { background: var(--peach); color: black; transform: translateY(-50%) scale(1.15); box-shadow: 0 4px 20px rgba(244,165,130,0.4); }
        .slider-btn:active { transform: translateY(-50%) scale(0.95); }
        .slider-btn-left { left: 20px; } .slider-btn-right { right: 20px; }
        .dots { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }
        .dot { width: 10px; height: 10px; border-radius: 10px; background: var(--muted); cursor: pointer; transition: 0.2s; }
        .dot.active { width: 28px; background: var(--peach); }
        
        .faq-item { background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; margin-bottom: 16px; overflow: hidden; }
        .faq-question { padding: 24px; font-weight: 600; font-size: 18px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: var(--bg3); }
        .faq-question:hover { background: rgba(244,165,130,0.05); }
        .faq-icon { font-size: 28px; transition: transform 0.2s; }
        
        .checklist-item { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--bg3); border-radius: 16px; margin-bottom: 12px; border: 1px solid var(--border); cursor: pointer; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .checklist-item:hover { background: rgba(244,165,130,0.05); border-color: rgba(244,165,130,0.25); transform: translateX(8px); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .checklist-item:hover .checklist-checkbox { transform: scale(1.15) rotate(-5deg); }
        .checklist-checkbox { width: 24px; height: 24px; border-radius: 6px; border: 2px solid var(--peach); background: transparent; display: flex; align-items: center; justify-content: center; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .checklist-checkbox.checked { background: var(--peach); color: black; }
        .checklist-text { flex: 1; font-size: 15px; }
        .checklist-day { font-size: 12px; color: var(--peach); font-weight: 600; min-width: 70px; }
        
        .modal-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 200; opacity: 0; visibility: hidden; transition: 0.3s; }
        .modal-overlay.open { opacity: 1; visibility: visible; }
        .modal-content { background: var(--bg3); border-radius: 32px; max-width: 500px; width: 90%; padding: 32px; transform: scale(0.9); transition: transform 0.3s; border: 1px solid var(--border); }
        .modal-overlay.open .modal-content { transform: scale(1); }
        .close-modal { background: var(--peach); border: none; padding: 10px 24px; border-radius: 40px; margin-top: 24px; cursor: pointer; font-weight: 600; }
        
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; }
          .hero { padding: 100px 24px 60px; }
          .office-slide img { height: 250px; }
          .slider-btn-left { left: 10px; } .slider-btn-right { right: 10px; }
        }
      `}</style>
      
      <nav className="nav">
        <a href="#" className="nav-logo">ХАБ | Сбер</a>
        <ul className="nav-links">
          <li><a href="#hero" onClick={(e)=>handleNavClick(e,'hero')} className={activeSection==='hero'?'active-link':''}>О центре</a></li>
          <li><a href="#office" onClick={(e)=>handleNavClick(e,'office')} className={activeSection==='office'?'active-link':''}>Офис</a></li>
          <li><a href="#possibilities" onClick={(e)=>handleNavClick(e,'possibilities')} className={activeSection==='possibilities'?'active-link':''}>Возможности</a></li>
          <li><a href="#life" onClick={(e)=>handleNavClick(e,'life')} className={activeSection==='life'?'active-link':''}>Жизнь внутри</a></li>
          <li><a href="#testimonials" onClick={(e)=>handleNavClick(e,'testimonials')} className={activeSection==='testimonials'?'active-link':''}>Отзывы</a></li>
          <li><a href="#checklist" onClick={(e)=>handleNavClick(e,'checklist')} className={activeSection==='checklist'?'active-link':''}>Чек-лист</a></li>
          <li><a href="#contacts" onClick={(e)=>handleNavClick(e,'contacts')} className={activeSection==='contacts'?'active-link':''}>Контакты</a></li>
          <li><a href="#faq" onClick={(e)=>handleNavClick(e,'faq')} className={activeSection==='faq'?'active-link':''}>FAQ</a></li>
        </ul>
        <a href="#booking" onClick={(e)=>{e.preventDefault(); openModal('Бронирование переговорной','Форма бронирования откроется в ближайшее время. Свяжитесь с Ириной Кузнецовой.')}} className="nav-cta">Забронировать</a>
      </nav>
      
      <div className="mobile-sticky-bar">
        <button onClick={()=>smoothScrollToCustom('hero')} className={activeSection==='hero'?'active-mobile':''}>🏠</button>
        <button onClick={()=>smoothScrollToCustom('office')} className={activeSection==='office'?'active-mobile':''}>📸</button>
        <button onClick={()=>smoothScrollToCustom('possibilities')} className={activeSection==='possibilities'?'active-mobile':''}>⚡</button>
        <button onClick={()=>smoothScrollToCustom('checklist')} className={activeSection==='checklist'?'active-mobile':''}>✅</button>
        <button onClick={()=>smoothScrollToCustom('faq')} className={activeSection==='faq'?'active-mobile':''}>❓</button>
      </div>
      
      <section id="hero" className="hero animate-on-scroll">
        <div className="hero-inner">
          <div className="hero-badge"><span>📍 ул. Костина, 6 · Нижний Новгород</span></div>
          <h1 className="hero-title">ХАБ<br /><span className="hero-title-line2">новых возможностей</span></h1>
          <p className="hero-subtitle">Мы запускаем проекты для новых возможностей региона. Мы создаем решения для развития бизнеса через исследования клиентского опыта, анализ данных, применяя креативный подход и современные технологии.</p>
          <div className="hero-btns">
            <a href="#possibilities" onClick={(e)=>handleNavClick(e,'possibilities')} className="btn-primary">Исследовать →</a>
            <a href="#booking" onClick={(e)=>{e.preventDefault(); openModal('Бронирование','Свяжитесь с нами для бронирования переговорной или коворкинга.')}} className="btn-secondary">Забронировать</a>
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
      
      {/* НОВЫЙ БЛОК: ГАЛЕРЕЯ ОФИСА СБЕРА */}
      <section id="office" style={{ padding: '60px', background: 'var(--bg)' }}>
        <div className="features-header" style={{ textAlign:'center' }}>
          <div className="section-label">Пространство</div>
          <h2 className="section-title">Офис Сбера</h2>
          <p style={{ color: 'var(--muted)', maxWidth: 600, margin: '20px auto 0' }}>Современные интерьеры, комфортные зоны для работы и отдыха</p>
        </div>
        <div className="office-slider animate-on-scroll">
          <div className="office-slide">
            <img src={officePhotos[officeSlideIndex].url} alt={officePhotos[officeSlideIndex].title} />
            <div className="slide-caption">{officePhotos[officeSlideIndex].title}</div>
          </div>
          <button className="slider-btn slider-btn-left" onClick={prevOfficeSlide}>←</button>
          <button className="slider-btn slider-btn-right" onClick={nextOfficeSlide}>→</button>
          <div className="dots">
            {officePhotos.map((_, idx) => (
              <div key={idx} className={`dot ${idx === officeSlideIndex ? 'active' : ''}`} onClick={() => setOfficeSlideIndex(idx)} />
            ))}
          </div>
        </div>
      </section>
      
      <section id="possibilities" style={{ padding: '60px' }}>
        <div className="features-header" style={{ textAlign:'center', marginBottom:'60px' }}>
          <div className="section-label">Всё для продуктивной работы</div>
          <h2 className="section-title">Возможности центра</h2>
        </div>
        <div className="features-grid">
          {[
            { icon:'🎁', name:'Программа лояльности', desc:'Бонусы и скидки для активных сотрудников' },
            { icon:'🍎', name:'Снеки и фрукты', desc:'Бесплатные напитки, яблоки, сливы, груши' },
            { icon:'💆', name:'Массажное кресло', desc:'Relax-зона с массажными креслами' },
            { icon:'🏋️', name:'Спортзал', desc:'07:00–21:00, современное оборудование' },
            { icon:'💼', name:'Коворкинг + Переговорные', desc:'Рабочие места и комнаты для встреч с техникой' },
            { icon:'📚', name:'Обучение', desc:'Тренинги, курсы на Пульсе, мастер-классы' },
            { icon:'🚇', name:'Удобное расположение', desc:'Центр города, рядом метро Горьковская' },
            { icon:'🖨️', name:'Печать и канцтовары', desc:'Всё необходимое на ресепшене' }
          ].map((f,i) => (
            <div className="card animate-on-scroll" key={i} style={{ transitionDelay: `${i*0.05}s` }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontWeight:600, marginBottom:8 }}>{f.name}</h3>
              <p style={{ color:'var(--muted)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:40 }}>
          <button onClick={()=>openModal('Бронирование коворкинга','Форма бронирования скоро появится. Свяжитесь с Ириной Кузнецовой.')} className="btn-primary">Забронировать переговорную →</button>
        </div>
      </section>
      
      <section id="life" style={{ padding: '60px', background: 'var(--bg2)' }}>
        <div className="features-header" style={{ textAlign:'center' }}>
          <div className="section-label">Мероприятия</div>
          <h2 className="section-title">Жизнь внутри центра</h2>
        </div>
        <div className="animate-on-scroll" style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div className="card" style={{ textAlign:'left' }}>
            <span style={{ fontSize:48 }}>🎨</span>
            <h3 style={{ marginTop:12 }}>Мастер-класс по дизайн-мышлению</h3>
            <p style={{ color:'var(--muted)', margin:'16px 0' }}>Каждую среду в 18:00. Прокачай креативность!</p>
            <p>🍷 Дегустации | 🤝 Командообразование | 🎤 Выступления экспертов</p>
          </div>
          <div style={{ marginTop:24, textAlign:'center' }}>
            <a href="https://t.me/HubEventMatch_bot" target="_blank" className="btn-secondary">📅 Записаться через бот →</a>
          </div>
        </div>
      </section>
      
      <section id="testimonials" style={{ padding: '60px' }}>
        <div className="features-header" style={{ textAlign:'center' }}>
          <div className="section-label">Что говорят</div>
          <h2 className="section-title">Отзывы сотрудников и партнёров</h2>
          <div style={{ fontSize:28, marginTop:16 }}>★★★★★ <span style={{ color:'var(--muted)' }}>5.0 / 5</span></div>
        </div>
        <div className="testimonial-slider animate-on-scroll">
          <div className="testimonial-card">
            <div className="testimonial-avatar">{testimonials[testimonialIndex].avatar}</div>
            <p style={{ fontSize:18, margin:'16px 0' }}>“{testimonials[testimonialIndex].text}”</p>
            <div className="stars">★★★★★</div>
            <h4>{testimonials[testimonialIndex].name}</h4>
            <p style={{ color:'var(--muted)' }}>{testimonials[testimonialIndex].role}</p>
          </div>
          <button className="slider-btn slider-btn-left" onClick={prevTestimonial}>←</button>
          <button className="slider-btn slider-btn-right" onClick={nextTestimonial}>→</button>
        </div>
      </section>
      
      <section id="checklist" style={{ padding: '60px', background: 'var(--bg2)' }}>
        <div className="features-header" style={{ textAlign:'center' }}>
          <div className="section-label">Адаптация</div>
          <h2 className="section-title">Что меня ждёт?</h2>
        </div>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          {checklistItems.map((item, idx) => (
            <div className="checklist-item animate-on-scroll" key={idx} onClick={()=>toggleChecklist(idx)}>
              <div className={`checklist-checkbox ${checklistState[idx] ? 'checked' : ''}`}>
                {checklistState[idx] && '✓'}
              </div>
              <div className="checklist-day">{item.day}</div>
              <div className="checklist-text">{item.text}</div>
            </div>
          ))}
          <p style={{ marginTop:32, color:'var(--muted)', fontStyle:'italic' }}>* Период адаптации — 1 неделя. После прохождения курсов на Пульсе вы получите доступ ко всем бонусам.</p>
        </div>
      </section>
      
      <section id="contacts" style={{ padding: '60px' }}>
        <div className="features-header" style={{ textAlign:'center' }}>
          <div className="section-label">Команда поддержки</div>
          <h2 className="section-title">К кому обратиться</h2>
        </div>
        <div className="contacts-grid">
          {contacts.map((c,i) => (
            <div className="card animate-on-scroll" key={i} style={{ textAlign: 'center' }}>
              <div className="contact-avatar">
                {c.avatarImg ? (
                  <img src={c.avatarImg} alt={c.name} onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : null}
                {(!c.avatarImg || (c.avatarImg && !document.querySelector(`img[src="${c.avatarImg}"]`)?.clientHeight) ) && (
                  <span style={{ fontSize: 40 }}>{c.avatarEmoji}</span>
                )}
              </div>
              <h3 style={{ marginTop: 12 }}>{c.name}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>{c.role}</p>
              <a href={`https://t.me/${c.tg.slice(1)}`} target="_blank" className="btn-secondary" style={{ display: 'inline-block' }}>📩 Написать в Telegram</a>
            </div>
          ))}
          <div className="card animate-on-scroll" style={{ textAlign: 'center', cursor: 'pointer' }}>
            <div className="contact-avatar" style={{ background: 'linear-gradient(135deg, var(--peach), var(--pink))' }}>
              <span style={{ fontSize: 40, color: 'white' }}>➕</span>
            </div>
            <h3 style={{ marginTop: 12 }}>Хочу в команду</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Присоединяйтесь к нам</p>
            <button className="btn-primary" style={{ display: 'inline-block' }} onClick={() => setApplyModalOpen(true)}>Оставить заявку →</button>
          </div>
        </div>
      </section>
      
      <section id="faq" style={{ padding: '60px', background: 'var(--bg2)' }}>
        <div className="features-header" style={{ textAlign:'center' }}>
          <div className="section-label">Ответы</div>
          <h2 className="section-title">Часто задаваемые вопросы</h2>
        </div>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div className="faq-item animate-on-scroll" key={idx}>
                <div className="faq-question" onClick={() => toggleFaq(idx)}>
                  {item.q}
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </div>
                <div 
                  ref={el => { faqRefs.current[idx] = el; }}
                  style={{
                    maxHeight: isOpen ? `${faqRefs.current[idx]?.scrollHeight || 200}px` : '0px',
                    transition: 'maxHeight 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
                    overflow: 'hidden',
                    padding: isOpen ? '0 24px 24px 24px' : '0 24px',
                    color: 'var(--muted)',
                    lineHeight: 1.6
                  }}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <div ref={counter310Ref} id="counter310" className="animate-on-scroll" style={{ background: 'linear-gradient(135deg, #f4a58220, #e8609a20)', borderRadius: 48, padding: 48, textAlign: 'center', maxWidth: 800, margin: '40px auto' }}>
        <div className="section-label">Сергей, самое время</div>
        <div style={{ fontFamily: 'SBSansDisplay', fontSize: 'clamp(48px,8vw,90px)', fontWeight: 600, background: 'linear-gradient(135deg, var(--peach), var(--pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {counter310 ? '310' : '0'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginTop: 16 }}>
          <span>⚡ Время стойкое</span>
          <span>📈 Производительность</span>
          <span>🏢 Служба помещения</span>
        </div>
      </div>
      
      <div ref={engagementRef} id="engagement-meter" className="animate-on-scroll" style={{ background: 'var(--bg2)', padding: '60px', textAlign: 'center' }}>
        <div className="section-label">Индекс диджитал-культуры</div>
        <div style={{ fontSize: 80, fontWeight: 600, background: 'linear-gradient(135deg, var(--peach), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{engagement}%</div>
        <div style={{ width: '80%', margin: '16px auto 0', height: 8, background: 'var(--bg3)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ width: `${engagement}%`, height: '100%', background: 'linear-gradient(90deg, var(--peach), var(--pink))' }} />
        </div>
      </div>
      
      <footer style={{ padding: '36px 60px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ fontWeight:600 }}>ХАБ · Сбер | ул. Костина, 6</div>
        <div>© 2026 Сбер. Все права защищены.</div>
      </footer>
      
      <div className={`modal-overlay ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>{modalContent.title}</h3>
          <p>{modalContent.body}</p>
          <button className="close-modal" onClick={closeModal}>Закрыть</button>
        </div>
      </div>

      <div className={`modal-overlay ${applyModalOpen ? 'open' : ''}`} onClick={() => { setApplyModalOpen(false); setApplySubmitted(false); setApplyForm({ name: '', role: '', tg: '', message: '' }); }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
          {applySubmitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Заявка отправлена!</h3>
              <p style={{ color: 'var(--muted)' }}>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Хочу в команду</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Заполните форму — мы свяжемся с вами!</p>
              <form onSubmit={handleApplySubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ваше имя *</label>
                  <input type="text" required placeholder="Иван Иванов" value={applyForm.name} onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Направление / роль *</label>
                  <input type="text" required placeholder="Разработчик, дизайнер, аналитик..." value={applyForm.role} onChange={(e) => setApplyForm({ ...applyForm, role: e.target.value })} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Telegram</label>
                  <input type="text" placeholder="@username" value={applyForm.tg} onChange={(e) => setApplyForm({ ...applyForm, tg: e.target.value })} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>О себе</label>
                  <textarea rows={3} placeholder="Расскажите немного о себе и своих навыках..." value={applyForm.message} onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 15, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center', border: 'none', cursor: 'pointer' }}>Отправить заявку</button>
                  <button type="button" onClick={() => setApplyModalOpen(false)} className="btn-secondary" style={{ padding: '16px 20px', border: '1px solid var(--border)', cursor: 'pointer', background: 'none' }}>Отмена</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}