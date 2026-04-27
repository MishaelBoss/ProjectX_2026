'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки формы
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
        h1, h2, h3, .nav-logo, .section-title {
          font-family: var(--font-sb-semibold), 'Unbounded', sans-serif;
          font-weight: 600;
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
        .nav-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-back:hover {
          color: var(--peach);
        }
        .contacts-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 60px 60px;
          position: relative;
          overflow: hidden;
        }
        .contacts-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .orb-1 {
          width: 500px; height: 500px;
          top: -100px; right: -100px;
          background: radial-gradient(circle, rgba(244,165,130,0.2) 0%, transparent 70%);
          animation: float1 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 400px; height: 400px;
          bottom: -50px; left: -80px;
          background: radial-gradient(circle, rgba(232,96,154,0.15) 0%, transparent 70%);
          animation: float2 15s ease-in-out infinite;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,30px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        .contacts-inner {
          position: relative;
          z-index: 2;
          max-width: 900px;
          width: 100%;
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
          margin-bottom: 24px;
        }
        .contacts-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .contact-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .contact-card .contact-content {
          flex: 1;
        }
        .contact-card .btn-s,
        .contact-card .btn-p {
          margin-top: 16px;
          align-self: center;
          width: fit-content;
          margin-right: auto;
        }
        @media (max-width: 1024px) {
          .contacts-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .contacts-grid { grid-template-columns: 1fr; }
        }
        .contact-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .contact-item {
          padding: 24px;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: all 0.3s;
        }
        .contact-item:hover {
          border-color: rgba(244,165,130,0.3);
          transform: translateY(-4px);
        }
        .contact-icon {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .contact-label {
          font-size: 12px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .contact-value {
          font-size: 18px;
          font-weight: 600;
        }
        .contact-value a {
          color: var(--text);
          text-decoration: none;
          transition: color 0.3s;
        }
        .contact-value a:hover {
          color: var(--peach);
        }
        .contact-form {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px;
        }
        .form-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .form-input {
          width: 100%;
          padding: 14px 18px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text);
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--peach);
          box-shadow: 0 0 0 3px rgba(244,165,130,0.1);
        }
        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          border: none;
          cursor: pointer;
          width: 100%;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 60px rgba(244,165,130,0.45);
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .success-message {
          background: rgba(91,200,245,0.1);
          border: 1px solid rgba(91,200,245,0.3);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          color: var(--blue);
          margin-top: 16px;
        }
        .map-section {
          padding: 80px 60px;
          background: var(--bg2);
        }
        .map-container {
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .map-placeholder {
          height: 400px;
          background: var(--bg3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
        }
        .map-placeholder-icon {
          font-size: 64px;
        }
        .map-placeholder-text {
          color: var(--muted);
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
        @media (max-width: 768px) {
          .nav { padding: 16px 24px; }
          .contacts-hero { padding: 100px 24px 60px; }
          .contacts-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-form { padding: 28px; }
          .map-section { padding: 60px 24px; }
          .footer { padding: 28px 24px; }
        }
      `}</style>

      <nav className="nav">
        <Link href="/" className="nav-logo">ХАБ</Link>
        <Link href="/" className="nav-back">← На главную</Link>
      </nav>

      <section className="contacts-hero">
        <div className="contacts-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>
        <div className="contacts-inner">
          <div className="section-label">Контакты</div>
          <h1 className="section-title">Свяжитесь с нами</h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.7 }}>
            Есть вопросы или предложения? Мы всегда рады общению!
          </p>

          <div className="contacts-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-label">Адрес</div>
                <div className="contact-value">ул. Костина, 6<br />Нижний Новгород</div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-label">Email</div>
                <div className="contact-value"><a href="mailto:hab@sber.ru">hab@sber.ru</a></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div className="contact-label">Часы работы</div>
                <div className="contact-value">Пн-Пт: 9:00 - 21:00<br />Сб-Вс: 10:00 - 18:00</div>
              </div>
            </div>

            <div className="contact-form">
              <h3 className="form-title">Напишите нам</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Ваше имя</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Как к вам обращаться?"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Сообщение</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Ваш вопрос или предложение..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Отправить сообщение →
                </button>
                {submitted && (
                  <div className="success-message">
                    ✓ Спасибо! Ваше сообщение отправлено.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-placeholder-icon">🗺️</div>
            <div className="map-placeholder-text">Карта: ул. Костина, 6 · Нижний Новгород</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">ХАБ · Нижний Новгород</div>
        <div className="footer-right">ул. Костина, 6 · © 2026 Сбер</div>
      </footer>
    </>
  );
}
