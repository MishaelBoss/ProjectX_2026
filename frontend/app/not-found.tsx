'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isDark, setIsDark] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('hubTheme');
    if (saved === 'light') setIsDark(false);
    else if (saved === 'dark') setIsDark(true);
    else {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(darkMode);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark, isClient]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Manrope:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        [data-theme="dark"] {
          --bg: #07070e;
          --text: #f0eef8;
          --muted: rgba(240,238,248,0.5);
          --card-bg: rgba(18, 18, 18, 0.288);
          --card-border: rgba(255,255,255,0.08);
          --peach: #f4a582;
          --pink: #e8609a;
          --blue: #5bc8f5;
          --gradient: linear-gradient(135deg, #f4a582, #e8609a);
          --btn-bg: linear-gradient(135deg, #f4a582, #e8609a);
          --btn-hover: translateY(-3px);
          --btn-shadow: 0 0 30px rgba(244,165,130,0.35);
          --secondary-bg: rgba(255,255,255,0.05);
          --secondary-border: rgba(255,255,255,0.1);
          --secondary-hover-bg: rgba(255,255,255,0.1);
          --orb-1: rgba(244,165,130,0.15);
          --orb-2: rgba(232,96,154,0.12);
          --orb-3: rgba(91,200,245,0.08);
        }

        [data-theme="light"] {
          --bg: #f4f4f8;
          --text: #111420;
          --muted: rgba(0,0,0,0.52);
          --card-bg: rgba(255,255,255,0.75);
          --card-border: rgba(0,0,0,0.08);
          --peach: #d4845e;
          --pink: #c84d82;
          --blue: #3a9ec9;
          --gradient: linear-gradient(135deg, #d4845e, #c84d82);
          --btn-bg: linear-gradient(135deg, #d4845e, #c84d82);
          --btn-hover: translateY(-3px);
          --btn-shadow: 0 0 20px rgba(212,132,94,0.3);
          --secondary-bg: rgba(0,0,0,0.04);
          --secondary-border: rgba(0,0,0,0.1);
          --secondary-hover-bg: rgba(0,0,0,0.08);
          --orb-1: rgba(212,132,94,0.12);
          --orb-2: rgba(200,77,130,0.1);
          --orb-3: rgba(58,158,201,0.07);
        }

        body {
          font-family: 'Manrope', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow: hidden;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.35s, color 0.25s;
        }

        @keyframes float    { 0%,100%{transform:translateY(0)}     50%{transform:translateY(-16px)} }
        @keyframes float2   { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-22px) rotate(3deg)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orb-pulse { 0%,100%{opacity:0.18; transform:scale(1)} 50%{opacity:0.3; transform:scale(1.08)} }
        @keyframes glitch {
          0%,95%,100% { clip-path: none; transform: none; }
          96% { clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); transform: translate(-4px); }
          97% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(4px); }
          98% { clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%); transform: translate(-2px); }
        }
        @keyframes star-twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.5} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
      `}</style>

      <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:700, height:700, top:-200, right:-200, borderRadius:'50%', background:`radial-gradient(circle, var(--orb-1) 0%, transparent 65%)`, filter:'blur(60px)', animation:'orb-pulse 8s ease-in-out infinite' }} />
        <div style={{ position:'absolute', width:500, height:500, bottom:-150, left:-100, borderRadius:'50%', background:`radial-gradient(circle, var(--orb-2) 0%, transparent 65%)`, filter:'blur(60px)', animation:'orb-pulse 11s ease-in-out infinite 3s' }} />
        <div style={{ position:'absolute', width:400, height:400, top:'40%', left:'20%', borderRadius:'50%', background:`radial-gradient(circle, var(--orb-3) 0%, transparent 65%)`, filter:'blur(60px)', animation:'orb-pulse 14s ease-in-out infinite 6s' }} />

        <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)', pointerEvents:'none' }} />
        <Image
          src="/brandbook/20.png"
          alt=""
          style={{ position:'absolute', width:380, height:380, right:-60, top:'5%', opacity:0.35, animation:'float2 10s ease-in-out infinite', filter:'hue-rotate(20deg)' }}
        />
        <Image
          src="/brandbook/27.png"
          alt=""
          style={{ position:'absolute', width:300, height:300, left:-80, bottom:-60, opacity:0.12, animation:'spin-slow 40s linear infinite' }}
        />
        <Image
          src="/brandbook/34.png"
          alt=""
          style={{ position:'absolute', width:160, height:160, left:'10%', top:'8%', opacity:0.2, animation:'float 12s ease-in-out infinite 2s' }}
        />
        <Image
          src="/brandbook/16.png"
          alt=""
          style={{ position:'absolute', width:60, height:60, right:'22%', top:'15%', opacity:0.3, animation:'star-twinkle 3s ease-in-out infinite' }}
        />
        <Image
          src="/brandbook/16.png"
          alt=""
          style={{ position:'absolute', width:40, height:40, left:'30%', bottom:'20%', opacity:0.2, animation:'star-twinkle 4s ease-in-out infinite 1s' }}
        />
        <Image
          src="/brandbook/32.png"
          alt=""
          style={{ position:'absolute', width:280, height:280, right:'5%', bottom:'-40px', opacity:0.25, animation:'float 16s ease-in-out infinite 4s' }}
        />
      </div>

      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>
        <div style={{ position:'relative', marginBottom:8 }}>
          <div style={{
            fontFamily:'Unbounded,sans-serif',
            fontSize:'clamp(100px, 18vw, 200px)',
            fontWeight:900,
            lineHeight:1,
            background:'linear-gradient(90deg, var(--peach), var(--pink), var(--blue))',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            letterSpacing:'-0.04em',
            animation:'glitch 6s infinite',
            userSelect:'none',}}>
            404
          </div>
          <div style={{
            fontFamily:'Unbounded,sans-serif',
            fontSize:'clamp(100px, 18vw, 200px)',
            fontWeight:900,
            lineHeight:1,
            color:'rgba(91,200,245,0.25)',
            letterSpacing:'-0.04em',
            position:'absolute',
            top:3,
            left:3,
            userSelect:'none',
            pointerEvents:'none',}}>
            404
          </div>
        </div>
        <div style={{ animation:'float 4s ease-in-out infinite', marginBottom:32, filter:'drop-shadow(0 0 30px var(--peach))' }}>
          <video src="sber_cat_error.webm" loop autoPlay muted playsInline style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
        <h1 style={{
          fontFamily:'Unbounded,sans-serif',
          fontSize:'clamp(20px, 3vw, 32px)',
          fontWeight:700,
          marginBottom:12,
          letterSpacing:'-0.02em',
          color: 'var(--text)',}}>
          Страница потерялась...
        </h1>

        <p style={{
          fontSize:16,
          color:'var(--muted)',
          lineHeight:1.7,
          maxWidth:420,
          marginBottom:40,}}>
          Кажется, эта страница ушла гулять и не вернулась.<br/>
          Кот тоже расстроен — он уже ищет.
        </p>

        <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
            <Link href="/" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'14px 32px', borderRadius:100,
              background:'var(--btn-bg)',
              color:'#12001a', fontWeight:700, fontSize:15,
              textDecoration:'none', fontFamily:'Manrope,sans-serif',
              boxShadow:'var(--btn-shadow)',
              transition:'all .25s',
            }}
            aria-label="Home"
            onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
            На главную
          </Link>

          <button
            onClick={() => window.history.back()}
            style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'14px 32px', borderRadius:100,
              background:'var(--secondary-bg)',
              border:'1px solid var(--secondary-border)',
              color:'var(--text)', fontWeight:600, fontSize:15,
              cursor:'pointer', fontFamily:'Manrope,sans-serif',
              transition:'all .25s',
            }}
            aria-label="Back"
            onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
            Назад
          </button>
        </div>

        <p style={{ marginTop:48, fontSize:12, color:'var(--muted)', letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.5 }}>
          ХАБ · Сбер · Костина, 6
        </p>
      </div>
    </>
  );
}