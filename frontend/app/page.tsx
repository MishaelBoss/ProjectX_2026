'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [counter310, setCounter310] = useState(false);
  const engagementRef = useRef<HTMLDivElement>(null);
  const counter310Ref = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const slidesCount = 5;

  const slides = [
    { title: 'Тимбилдинг', desc: 'Сплочение команды на природе', img: '🏕️' },
    { title: 'Мастер-класс', desc: 'Рисование и креатив', img: '🎨' },
    { title: 'Спорт-челлендж', desc: 'Зарядка и награды', img: '🏆' },
    { title: 'Кофе-брейк', desc: 'Общение в неформальной обстановке', img: '☕' },
    { title: 'Лекция', desc: 'Цифровая безопасность', img: '🔒' },
  ];

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -30% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'engagement-meter') {
            let start = 0;
            const end = 87;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = end / steps;
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setEngagement(end);
                clearInterval(timer);
              } else {
                setEngagement(Math.floor(start));
              }
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

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => nextSlide(), 4000);
  }, []);
  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay]);

  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) diff > 0 ? prevSlide() : nextSlide();
  };

  const openModal = (title: string, body: string) => {
    setModalContent({ title, body });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700;900&family=Manrope:wght@300;400;500;600&display=swap');

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
          font-family: var(--font-sb-light), 'Manrope', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }
          h1, h2, h3, .nav-logo, .feature-name, .space-name, .section-title, .hero-title, .checklist-num, .meter-number, .faq-question {
  font-family: var(--font-sb-semibold), 'Unbounded', sans-serif;
  font-weight: 600;
}
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s ease;
        }
        .animated-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 60px;
          backdrop-filter: blur(20px);
          background: rgba(7,7,14,0.7);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(90deg, var(--peach), var(--pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.3s;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
        }
        .nav-links a.active-link {
          color: var(--peach);
          border-bottom-color: var(--peach);
        }
        .nav-links a:hover { color: var(--text); }
        .nav-cta {
          font-size: 13px;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 100px;
          border: 1px solid rgba(244,165,130,0.5);
          background: transparent;
          color: var(--peach);
          text-decoration: none;
          transition: all 0.3s;
        }
        .nav-cta:hover { background: rgba(244,165,130,0.12); }
        .mobile-sticky-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(13,13,24,0.9);
          backdrop-filter: blur(20px);
          border-radius: 60px;
          padding: 10px 20px;
          display: flex;
          gap: 32px;
          z-index: 101;
          border: 1px solid var(--border);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          display: none;
        }
        .mobile-sticky-bar button {
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: var(--muted);
          transition: 0.2s;
        }
        .mobile-sticky-bar button.active-mobile { color: var(--peach); transform: scale(1.1); }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-sticky-bar { display: flex; }
          .nav { padding: 16px 24px; }
        }
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 120px 60px 60px;
        }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .orb-1 {
          width: 600px; height: 600px;
          top: -150px; right: -150px;
          background: radial-gradient(circle, rgba(244,165,130,0.22) 0%, transparent 70%);
          animation: float1 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 500px; height: 500px;
          bottom: -80px; left: -100px;
          background: radial-gradient(circle, rgba(232,96,154,0.18) 0%, transparent 70%);
          animation: float2 15s ease-in-out infinite;
        }
        .orb-3 {
          width: 400px; height: 400px;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(91,200,245,0.1) 0%, transparent 70%);
          animation: float3 18s ease-in-out infinite;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-30px)} }
        @keyframes float3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.2)} }
        .rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
        }
        .ring-1 { width: 320px; height: 320px; border-color: rgba(244,165,130,0.15); animation: spin 30s linear infinite; }
        .ring-2 { width: 560px; height: 560px; border-color: rgba(232,96,154,0.1); animation: spin 50s linear infinite reverse; }
        .ring-3 { width: 800px; height: 800px; border-color: rgba(91,200,245,0.07); animation: spin 80s linear infinite; }
        .ring-dot {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          top: -3px; left: 50%;
          transform: translateX(-50%);
        }
        .ring-1 .ring-dot { background: var(--peach); box-shadow: 0 0 10px var(--peach); }
        .ring-2 .ring-dot { background: var(--pink); box-shadow: 0 0 10px var(--pink); }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .hero-inner {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid rgba(244,165,130,0.35);
          background: rgba(244,165,130,0.08);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--peach);
          margin-bottom: 40px;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--peach);
          box-shadow: 0 0 8px var(--peach);
        }
        .hero-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(48px, 8vw, 100px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 32px;
        }
        .hero-title-line1 { display: block; color: var(--text); }
        .hero-title-line2 {
          display: block;
          background: linear-gradient(90deg, var(--peach) 0%, var(--pink) 50%, var(--blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-sb-semibold), 'Unbounded', sans-serif;
        }
        .hero-subtitle {
          font-size: 18px;
          font-weight: 400;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 52px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          background: linear-gradient(135deg, var(--peach), var(--pink));
          color: #12001a;
          transition: all 0.3s;
          box-shadow: 0 0 40px rgba(244,165,130,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 60px rgba(244,165,130,0.45);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 16px 36px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          background: rgba(255,255,255,0.05);
          color: var(--text);
          border: 1px solid var(--border);
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-3px);
        }
        .hero-location {
          margin-top: 64px;
          font-size: 13px;
          color: rgba(240,238,248,0.28);
          letter-spacing: 0.06em;
        }
        .section-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--peach);
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .features {
          padding: 120px 60px;
          background: var(--bg2);
          position: relative;
        }
        .features::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--peach), var(--pink), transparent);
          opacity: 0.4;
        }
        .features-header { text-align: center; margin-bottom: 80px; }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .feature-card {
          position: relative;
          padding: 40px 36px;
          border-radius: 24px;
          background: var(--bg3);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: all 0.4s;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(244,165,130,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .feature-card:hover {
          border-color: rgba(244,165,130,0.3);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 24px;
        }
        .ic-peach { background: rgba(244,165,130,0.15); }
        .ic-pink { background: rgba(232,96,154,0.15); }
        .ic-blue { background: rgba(91,200,245,0.15); }
        .ic-purple { background: rgba(179,136,247,0.15); }
        .feature-name {
          font-family: 'Unbounded', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .feature-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
        }
        .checklist {
          padding: 120px 60px;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .checklist-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .checklist-sub {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          margin-top: 20px;
        }
        .checklist-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .checklist-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 28px;
          border-radius: 16px;
          background: var(--bg3);
          border: 1px solid var(--border);
          transition: all 0.3s;
          cursor: pointer;
        }
        .checklist-item:hover {
          border-color: rgba(244,165,130,0.25);
          background: rgba(244,165,130,0.05);
          transform: translateX(6px);
        }
        .checklist-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          font-weight: 700;
          width: 32px; height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(135deg, var(--peach), var(--pink));
          color: #12001a;
        }
        .checklist-text {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
        }
        .spaces {
          padding: 120px 60px;
          background: var(--bg2);
          position: relative;
        }
        .spaces::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--blue), var(--purple), transparent);
          opacity: 0.35;
        }
        .spaces-header { text-align: center; margin-bottom: 80px; }
        .spaces-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .space-card {
          padding: 48px 44px;
          border-radius: 28px;
          background: var(--bg3);
          border: 1px solid var(--border);
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }
        .space-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
        }
        .sc1:hover { border-color: rgba(244,165,130,0.3); }
        .sc2:hover { border-color: rgba(232,96,154,0.3); }
        .sc3:hover { border-color: rgba(91,200,245,0.3); }
        .sc4:hover { border-color: rgba(179,136,247,0.3); }
        .space-emoji { font-size: 40px; margin-bottom: 24px; display: block; }
        .space-name {
          font-family: 'Unbounded', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .space-desc { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 24px; }
        .space-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .space-tag {
          font-size: 12px; font-weight: 600;
          padding: 6px 14px; border-radius: 100px; border: 1px solid;
        }
        .sc1 .space-tag { color: var(--peach); border-color: rgba(244,165,130,0.35); background: rgba(244,165,130,0.08); }
        .sc2 .space-tag { color: var(--pink); border-color: rgba(232,96,154,0.35); background: rgba(232,96,154,0.08); }
        .sc3 .space-tag { color: var(--blue); border-color: rgba(91,200,245,0.35); background: rgba(91,200,245,0.08); }
        .sc4 .space-tag { color: var(--purple); border-color: rgba(179,136,247,0.35); background: rgba(179,136,247,0.08); }
        .cta-section {
          padding: 140px 60px;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .cta-orb {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 800px; height: 350px;
          background: radial-gradient(ellipse, rgba(232,96,154,0.14) 0%, rgba(244,165,130,0.07) 40%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }
        .cta-inner { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; }
        .cta-sub {
          font-size: 18px;
          color: var(--muted);
          line-height: 1.7;
          margin: 20px auto 48px;
          max-width: 480px;
        }
        .footer {
          padding: 36px 60px;
          border-top: 1px solid var(--border);
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 14px;
          font-weight: 700;
          background: linear-gradient(90deg, var(--peach), var(--pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .footer-right { font-size: 13px; color: rgba(240,238,248,0.28); }
        .principles-grid, .care-grid, .cat-grid, .quick-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .principle-card, .care-card, .cat-card, .quick-card {
          padding: 28px 20px;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 20px;
          text-align: center;
          transition: 0.3s;
        }
        .principle-card:hover, .care-card:hover, .cat-card:hover, .quick-card:hover {
          transform: translateY(-5px);
          border-color: rgba(244,165,130,0.3);
        }
        .gandhi-block {
          background: linear-gradient(135deg, rgba(244,165,130,0.08), rgba(232,96,154,0.08));
          padding: 80px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .gandhi-quote {
          font-size: clamp(24px, 4vw, 42px);
          font-family: 'Unbounded', sans-serif;
          font-weight: 500;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.3;
        }
        .gandhi-author {
          margin-top: 24px;
          font-size: 14px;
          letter-spacing: 0.1em;
          color: var(--muted);
        }
        .engagement-meter {
          background: var(--bg2);
          padding: 80px 60px;
          text-align: center;
        }
        .meter-number {
          font-size: 80px;
          font-weight: 900;
          font-family: 'Unbounded', sans-serif;
          background: linear-gradient(135deg, var(--peach), var(--blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .counter310 {
          background: linear-gradient(135deg, #f4a58220, #e8609a20);
          border-radius: 48px;
          padding: 48px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 20px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .faq-question {
          padding: 20px 24px;
          font-weight: 700;
          font-family: 'Unbounded', sans-serif;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.2s;
        }
        .faq-question:hover { background: rgba(244,165,130,0.05); }
        .faq-answer {
          max-height: 0;
          padding: 0 24px;
          transition: max-height 0.4s ease-out, padding 0.2s;
          overflow: hidden;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
        }
        .faq-item.open .faq-answer {
          max-height: 300px;
          padding: 0 24px 20px 24px;
        }
        .faq-icon {
          font-size: 24px;
          transition: transform 0.3s;
        }
        .faq-item.open .faq-icon { transform: rotate(45deg); }
        .slider-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 32px;
          background: var(--bg3);
          padding: 20px;
        }
        .slider-track {
          display: flex;
          transition: transform 0.5s ease;
        }
        .slide {
          flex: 0 0 100%;
          padding: 40px;
          text-align: center;
          font-size: 2rem;
          background: var(--bg2);
          border-radius: 24px;
        }
        .slide span {
          font-size: 80px;
          display: block;
          margin-bottom: 16px;
        }
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: 0.2s;
        }
        .slider-btn:hover { background: var(--peach); color: black; }
        .slider-btn-left { left: 10px; }
        .slider-btn-right { right: 10px; }
        .dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background: var(--muted);
          cursor: pointer;
          transition: 0.2s;
        }
        .dot.active {
          width: 28px;
          background: var(--peach);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
        }
        .modal-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        .modal-content {
          background: var(--bg3);
          border-radius: 32px;
          max-width: 500px;
          width: 90%;
          padding: 32px;
          transform: scale(0.9);
          transition: transform 0.3s;
          border: 1px solid var(--border);
        }
        .modal-overlay.open .modal-content {
          transform: scale(1);
        }
        .close-modal {
          background: var(--peach);
          border: none;
          padding: 10px 24px;
          border-radius: 40px;
          margin-top: 24px;
          cursor: pointer;
          font-weight: 600;
        }
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero { padding: 100px 24px 60px; }
          .features, .checklist, .spaces, .cta-section, .gandhi-block, .engagement-meter { padding: 60px 24px; }
          .features-grid, .spaces-grid, .principles-grid, .care-grid, .cat-grid, .quick-grid { grid-template-columns: 1fr; }
          .checklist-inner { grid-template-columns: 1fr; gap: 48px; }
          .footer { padding: 28px 24px; }
          .space-card { padding: 36px 28px; }
        }
      `}</style>

      <nav className="nav">
        <a href="#" className="nav-logo">ХАБ</a>
        <ul className="nav-links">
          <li><a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className={activeSection === 'hero' ? 'active-link' : ''}>Главная</a></li>
          <li><a href="#possibilities" onClick={(e) => handleNavClick(e, 'possibilities')} className={activeSection === 'possibilities' ? 'active-link' : ''}>Возможности</a></li>
          <li><a href="#checklist" onClick={(e) => handleNavClick(e, 'checklist')} className={activeSection === 'checklist' ? 'active-link' : ''}>Чек-лист</a></li>
          <li><a href="#spaces" onClick={(e) => handleNavClick(e, 'spaces')} className={activeSection === 'spaces' ? 'active-link' : ''}>Пространства</a></li>
          <li><a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className={activeSection === 'faq' ? 'active-link' : ''}>FAQ</a></li>
        </ul>
        <Link href="/contacts" className="nav-cta">Связаться</Link>
      </nav>

      <div className="mobile-sticky-bar">
        <button onClick={() => smoothScrollTo('hero')} className={activeSection === 'hero' ? 'active-mobile' : ''}>🏠</button>
        <button onClick={() => smoothScrollTo('possibilities')} className={activeSection === 'possibilities' ? 'active-mobile' : ''}>⚡</button>
        <button onClick={() => smoothScrollTo('checklist')} className={activeSection === 'checklist' ? 'active-mobile' : ''}>📋</button>
        <button onClick={() => smoothScrollTo('spaces')} className={activeSection === 'spaces' ? 'active-mobile' : ''}>🏢</button>
        <button onClick={() => smoothScrollTo('faq')} className={activeSection === 'faq' ? 'active-mobile' : ''}>❓</button>
      </div>

      <section id="hero" className="hero animate-on-scroll">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="rings">
            <div className="ring ring-1"><div className="ring-dot" /></div>
            <div className="ring ring-2"><div className="ring-dot" /></div>
            <div className="ring ring-3" />
          </div>
        </div>
        <div className="hero-inner">
          <div className="hero-badge"><div className="hero-badge-dot" />Региональный центр Сбера</div>
          <h1 className="hero-title"><span className="hero-title-line1">Наше будущее —</span><span className="hero-title-line2">за тобой!</span></h1>
          <p className="hero-subtitle">Современное пространство Сбера на Костина, 6.<br />Технологии, комфорт и люди в едином ритме.</p>
          <div className="hero-btns">
            <Link href="#possibilities" onClick={(e) => { e.preventDefault(); smoothScrollTo('possibilities'); }} className="btn-primary">Исследовать центр →</Link>
            <Link href="#checklist" onClick={(e) => { e.preventDefault(); smoothScrollTo('checklist'); }} className="btn-secondary">Для новичков</Link>
          </div>
          <p className="hero-location">📍 ул. Костина, 6 · Нижний Новгород</p>
        </div>
      </section>

      <section id="possibilities" className="features">
        <div className="features-header"><div className="section-label">Всё для тебя</div><h2 className="section-title">Возможности центра</h2></div>
        <div className="features-grid">
          {[
            { icon:'💼', cls:'ic-peach', name:'Коворкинг', desc:'Светлые современные пространства для продуктивной работы и важных встреч' },
            { icon:'🏋️', cls:'ic-pink', name:'Спортзал', desc:'Поддерживай баланс. Профессиональное оборудование и долгосрочное обслуживание проектов.' },
            { icon:'☕', cls:'ic-blue', name:'Кофе и снеки', desc:'Бесплатные напитки, фрукты и перекусы. Mei, g :)' },
            { icon:'⭐', cls:'ic-purple', name:'Лояльность', desc:'Привилегии и бонусы для сотрудников центра' },
            { icon:'📚', cls:'ic-peach', name:'Обучение', desc:'Мастер-классы, тренинги и постоянное развитие' },
            { icon:'📍', cls:'ic-pink', name:'Расположение', desc:'В центре города — удобно добираться отовсюду' },
          ].map((f, i) => (
            <div className="feature-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="principles" style={{ padding: '80px 60px', background: 'var(--bg)' }}>
        <div className="features-header"><div className="section-label">ДНК Хаба</div><h2 className="section-title">Наши принципы</h2></div>
        <div className="principles-grid">
          {['Уверенность','Качество жизни','Лидерство','Активность','Открытость','Красота','Поддержка'].map((p, i) => (
            <div className="principle-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>✨</div>
              <div style={{ fontWeight: 700 }}>{p}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="gandhi-block animate-on-scroll">
        <div className="gandhi-quote">«Мы сами должны стать теми переменами, которые хотим видеть в мире.»</div>
        <div className="gandhi-author">Махатма Ганди</div>
      </div>

      <section id="checklist" className="checklist">
        <div className="checklist-inner">
          <div>
            <div className="section-label">Для новичков</div>
            <h2 className="section-title" style={{marginBottom: 0}}>Что меня<br />ждёт?</h2>
            <p className="checklist-sub">Чек-лист первого времени в центре — всё просто и понятно</p>
          </div>
          <div className="checklist-items">
            {[
              'Пройти курсы адаптации на «Пульсе»',
              'Заполнить анкету новичка',
              'Познакомиться с командой',
              'Получить технику и все доступы',
              'Посетить первый дейлик',
              'Предложить идеи для улучшения',
            ].map((item, i) => (
              <div className="checklist-item animate-on-scroll" key={i} onClick={() => openModal('Чек-лист', `Шаг ${i+1}: ${item}. Хотите отметить как выполненный?`)}>
                <div className="checklist-num">{String(i + 1).padStart(2,'0')}</div>
                <div className="checklist-text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="spaces" className="spaces">
        <div className="spaces-header"><div className="section-label">Инфраструктура</div><h2 className="section-title">Наши пространства</h2></div>
        <div className="spaces-grid">
          {[
            { cls:'sc1', emoji:'🎨', name:'МАЛЕВИЧ · Мастерская', desc:'Креативная зона для рисования, дизайна и воркшопов', tags:['Мольберты','Свет','Арт'] },
            { cls:'sc2', emoji:'🧥', name:'Гардероб', desc:'Комфортные шкафчики и зона отдыха для смены одежды', tags:['Ключи','Зеркала','Сушка'] },
            { cls:'sc3', emoji:'🍲', name:'Столовая', desc:'Обеденная зона с домашней кухней', tags:['Первое','Второе','Компот'] },
            { cls:'sc4', emoji:'🚻', name:'WC / Комната гигиены', desc:'Чистота и порядок 24/7', tags:['Диспенсеры','Аромат'] },
            { cls:'sc1', emoji:'🌿', name:'GREEN HILL', desc:'Экозона с живыми растениями и зона для микропауз', tags:['Кислород','Релакс'] },
            { cls:'sc2', emoji:'🏋️', name:'Зал силового тренинга', desc:'Для продолжительного обслуживания профессиональных проектов', tags:['Гантели','Штанги','Стойки'] },
          ].map((s, i) => (
            <div className={`space-card ${s.cls} animate-on-scroll`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="space-emoji">{s.emoji}</span>
              <div className="space-name">{s.name}</div>
              <div className="space-desc">{s.desc}</div>
              <div className="space-tags">{s.tags.map((t, j) => <span className="space-tag" key={j}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="life" style={{ padding: '80px 60px', background: 'var(--bg)' }}>
        <div className="features-header"><div className="section-label">Активности</div><h2 className="section-title">Жизнь внутри центра</h2></div>
        <div className="slider-container animate-on-scroll" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
          <div className="slider-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
            {slides.map((slide, idx) => (
              <div className="slide" key={idx}>
                <span>{slide.img}</span>
                <h3 style={{ fontFamily: 'Unbounded', fontSize: 24 }}>{slide.title}</h3>
                <p style={{ color: 'var(--muted)', marginTop: 12 }}>{slide.desc}</p>
              </div>
            ))}
          </div>
          <button className="slider-btn slider-btn-left" onClick={prevSlide}>←</button>
          <button className="slider-btn slider-btn-right" onClick={nextSlide}>→</button>
          <div className="dots">
            {slides.map((_, idx) => (
              <div key={idx} className={`dot ${idx === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(idx)} />
            ))}
          </div>
        </div>
      </section>

      <section id="quickstart" style={{ padding: '80px 60px', background: 'var(--bg2)' }}>
        <div className="features-header"><div className="section-label">Мгновенный доступ</div><h2 className="section-title">Выбери товар по каталогу<br />или отсканируй штрих-код</h2></div>
        <div className="quick-grid">
          <div className="quick-card animate-on-scroll">
            <span style={{ fontSize: 40 }}>📱</span>
            <div style={{ fontWeight: 700, marginTop: 8 }}>Сканер</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Наведи камеру на штрих-код</div>
            <button className="btn-secondary" style={{ marginTop: 16, padding: '8px 20px' }} onClick={() => openModal('Демо-сканер', 'Функция сканирования штрих-кода будет доступна в ближайшее время.')}>Демо-скан</button>
          </div>
          <div className="quick-card animate-on-scroll">
            <span style={{ fontSize: 40 }}>📖</span>
            <div style={{ fontWeight: 700, marginTop: 8 }}>Каталог</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Все товары и услуги хаба</div>
            <button className="btn-secondary" style={{ marginTop: 16, padding: '8px 20px' }} onClick={() => openModal('Каталог ХАБ', 'Здесь будет полный перечень услуг и товаров.')}>Открыть</button>
          </div>
          <div className="quick-card animate-on-scroll">
            <span style={{ fontSize: 40 }}>🖍️</span>
            <div style={{ fontWeight: 700, marginTop: 8 }}>WHITEBOARD MARKER</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>attach ECONOMY — экономь на маркерах</div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 60px', background: 'var(--bg)' }}>
        <div className="features-header"><div className="section-label">Интерактив</div><h2 className="section-title">Какой котик ты сегодня?</h2></div>
        <div className="cat-grid">
          {[
            { name: 'Кот-шопоголик', emoji: '🛍️', desc: 'Сканирую и покупаю' },
            { name: 'Кот-минималист', emoji: '🧘', desc: 'Только нужное' },
            { name: 'Кот-трудяга', emoji: '💼', desc: 'РВР и дедлайны' },
            { name: 'Кот-релакс', emoji: '😴', desc: 'Кофе и диван' }
          ].map((cat, i) => (
            <div className="cat-card animate-on-scroll" key={i}>
              <span style={{ fontSize: 48 }}>{cat.emoji}</span>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{cat.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{cat.desc}</div>
              <button className="btn-secondary" style={{ marginTop: 16, padding: '6px 16px' }} onClick={() => openModal('Твой коток', `Ты выбрал ${cat.name}. Отличный выбор!`)}>Выбрать</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 60px', background: 'var(--bg2)' }}>
        <div className="features-header"><div className="section-label">Дорогие коллеги!</div><h2 className="section-title">Забота о каждом</h2></div>
        <div className="care-grid">
          {[
            { icon: '🍎', title: 'Свежие фрукты', text: 'яблоки, сливы, груши ежедневно' },
            { icon: '👨‍👩‍👧', title: 'Семья прежде всего', text: 'чтобы не было проблем с детьми и здоровьем' },
            { icon: '✅', title: 'Безопасность', text: 'ваша продукция соответствует требованиям безопасности' }
          ].map((c, i) => (
            <div className="care-card animate-on-scroll" key={i}>
              <span style={{ fontSize: 40 }}>{c.icon}</span>
              <div style={{ fontWeight: 700, margin: '12px 0 4px' }}>{c.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      <div ref={counter310Ref} id="counter310" className="counter310 animate-on-scroll" style={{ margin: '40px auto' }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Сергей, самое время</div>
        <div style={{ fontFamily: 'Unbounded', fontSize: 'clamp(36px,6vw,70px)', fontWeight: 900, background: 'linear-gradient(135deg, var(--peach), var(--pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {counter310 ? '310' : '0'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
          <span>⚡ Время стойкое</span>
          <span>📈 Производительность</span>
          <span>🏢 Служба помещения</span>
        </div>
      </div>

      <div ref={engagementRef} id="engagement-meter" className="engagement-meter animate-on-scroll">
        <div className="section-label">Индекс диджитал-культуры</div>
        <div className="meter-number">{engagement}%</div>
        <div style={{ width: '80%', margin: '16px auto 0', height: 8, background: 'var(--bg3)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ width: `${engagement}%`, height: '100%', background: 'linear-gradient(90deg, var(--peach), var(--pink))', borderRadius: 10 }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 20 }}>от 00 до 100 — ваш уровень вовлечённости</div>
      </div>

      <section id="faq" style={{ padding: '80px 60px', background: 'var(--bg)' }}>
        <div className="features-header"><div className="section-label">Ответы</div><h2 className="section-title">Часто задаваемые вопросы</h2></div>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {[
            { q: 'Как получить доступ в центр?', a: 'После заполнения анкеты и прохождения адаптации вы получите электронный пропуск.' },
            { q: 'Есть ли бесплатный кофе?', a: 'Да, каждый день — свежемолотый кофе, чай, фрукты и снеки.' },
            { q: 'Можно ли привести гостя?', a: 'Да, по предварительному согласованию с администратором.' },
            { q: 'Где оставить велосипед?', a: 'На подземной парковке есть велопарковка и камера хранения.' },
          ].map((item, idx) => (
            <div className={`faq-item animate-on-scroll ${openFaq === idx ? 'open' : ''}`} key={idx}>
              <div className="faq-question" onClick={() => toggleFaq(idx)}>
                {item.q}
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="cta-section">
        <div className="cta-orb" />
        <div className="cta-inner">
          <div className="section-label">Присоединяйся</div>
          <h2 className="section-title">Готов стать<br />частью ХАБа?</h2>
          <p className="cta-sub">Инновации, забота и комфорт в едином пространстве.</p>
          <Link href="/contacts" className="btn-primary" style={{display:'inline-flex'}}>Связаться с нами →</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">ХАБ · Нижний Новгород</div>
        <div className="footer-right">ул. Костина, 6 · © 2026 Сбер</div>
      </footer>

      <div className={`modal-overlay ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontFamily: 'Unbounded', marginBottom: 16 }}>{modalContent.title}</h3>
          <p>{modalContent.body}</p>
          <button className="close-modal" onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    </>
  );
}