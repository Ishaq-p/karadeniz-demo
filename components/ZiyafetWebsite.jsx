"use client";

import { useEffect } from "react";

export default function ZiyafatWebsite() {
  useEffect(() => {
    const header = document.getElementById("header");
    const progress = document.getElementById("progress");

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
      const h = document.documentElement;
      progress.style.width =
        (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    };
    window.addEventListener("scroll", onScroll);

    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
      const hero = document.querySelector(".hero").getBoundingClientRect();
      if (my > hero.top && my < hero.bottom) {
        const glow = document.getElementById("hero-glow");
        glow.style.left = mx + "px";
        glow.style.top = my + "px";
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    let rafId;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const hoverEls = document.querySelectorAll("[data-hover]");
    const onEnter = () => {
      cursor.classList.add("hovering");
      ring.classList.add("hovering");
    };
    const onLeave = () => {
      cursor.classList.remove("hovering");
      ring.classList.remove("hovering");
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal,.stagger").forEach((el) => io.observe(el));

    let lastY = 0;
    const marquee = document.getElementById("marquee");
    const onScroll2 = () => {
      const cur = window.scrollY;
      marquee.style.animationDirection = cur > lastY ? "normal" : "reverse";
      lastY = cur;
    };
    window.addEventListener("scroll", onScroll2);

    // cleanup on unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll2);
      cancelAnimationFrame(rafId);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      io.disconnect();
    };
  }, []);

  return (
    <div className="ziyafat-root">

<style>{`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

.ziyafat-root{
  --burgundy: #6e1a1f;
  --burgundy-deep: #4a1014;
  --walnut: #241209;
  --walnut-deep: #170a04;
  --navy: #1c2438;
  --ivory: #f3ead9;
  --ivory-deep: #e8dcc2;
  --turquoise: #2c8c86;
  --turquoise-bright: #3fb0a8;
  --gold: #c9973f;
  --gold-bright: #e3b158;
  --serif: 'Fraunces', serif;
  --script: 'Cormorant Garamond', serif;
  --sans: 'Jost', sans-serif;
  --ease: cubic-bezier(.16,.84,.24,1);
  --border-w: 22px;

  background: var(--walnut-deep);
  color: var(--ivory);
  font-family: var(--sans);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  position: relative;
}
.ziyafat-root *{ box-sizing:border-box; }
.ziyafat-root ::selection{ background: var(--gold-bright); color: var(--walnut-deep); }

.ziyafat-root .grain{
  position: fixed; inset:0; pointer-events:none; z-index:600; opacity:.045; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ============ CURSOR — arrow woven like a rug corner ============ */
.ziyafat-root{
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cdefs%3E%3Cpattern id='w' width='5' height='5' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'%3E%3Crect width='5' height='5' fill='%236e1a1f'/%3E%3Crect width='2.5' height='5' fill='%23c9973f'/%3E%3C/pattern%3E%3C/defs%3E%3Cpath d='M5 2 L5 22 L9.5 18 L13 25 L16 23.5 L12.5 16.5 L19 16.5 Z' fill='url(%23w)' stroke='%23170a04' stroke-width='1.3' stroke-linejoin='round'/%3E%3Cpath d='M5 2 L5 22 L9.5 18 L13 25 L16 23.5 L12.5 16.5 L19 16.5 Z' fill='none' stroke='%23e3b158' stroke-width='0.6'/%3E%3Ccircle cx='7.5' cy='6' r='1.1' fill='%233fb0a8'/%3E%3C/svg%3E") 4 3, auto;
}
.ziyafat-root a,
.ziyafat-root button,
.ziyafat-root [data-hover]{
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cdefs%3E%3Cpattern id='w2' width='5' height='5' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'%3E%3Crect width='5' height='5' fill='%236e1a1f'/%3E%3Crect width='2.5' height='5' fill='%233fb0a8'/%3E%3C/pattern%3E%3C/defs%3E%3Cpath d='M5 2 L5 22 L9.5 18 L13 25 L16 23.5 L12.5 16.5 L19 16.5 Z' fill='url(%23w2)' stroke='%23170a04' stroke-width='1.3' stroke-linejoin='round'/%3E%3Cpath d='M5 2 L5 22 L9.5 18 L13 25 L16 23.5 L12.5 16.5 L19 16.5 Z' fill='none' stroke='%23e3b158' stroke-width='1'/%3E%3Ccircle cx='7.5' cy='6' r='1.6' fill='%23e3b158'/%3E%3C/svg%3E") 4 3, pointer;
}

#progress{ position:fixed; top:0; left:0; height:2px; background:var(--gold-bright); z-index:1000; width:0%; }

/* ============ WOVEN BORDER FRAME ============ */
.loom-border{ position: fixed; inset:0; z-index:300; pointer-events:none; }
.loom-border .edge{ position:absolute; background-repeat: repeat; }
.loom-border .top, .loom-border .bottom{
  left:0; right:0; height: var(--border-w);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%236e1a1f'/%3E%3Cpath d='M0 32 L16 8 L32 32 L48 8 L64 32 L48 56 L32 32 L16 56 Z' fill='none' stroke='%23c9973f' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%233fb0a8'/%3E%3C/svg%3E");
  background-size: 64px 64px;
  box-shadow: 0 0 0 1px var(--gold) inset;
}
.loom-border .top{ top:0; }
.loom-border .bottom{ bottom:0; }
.loom-border .left, .loom-border .right{
  top:0; bottom:0; width: var(--border-w);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%236e1a1f'/%3E%3Cpath d='M32 0 L8 16 L32 32 L8 48 L32 64 L56 48 L32 32 L56 16 Z' fill='none' stroke='%23c9973f' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%233fb0a8'/%3E%3C/svg%3E");
  background-size: 64px 64px;
}
.loom-border .left{ left:0; }
.loom-border .right{ right:0; }
.loom-border .corner{
  position:absolute; width: var(--border-w); height: var(--border-w); background: var(--burgundy);
  display:flex; align-items:center; justify-content:center; box-shadow: 0 0 0 1px var(--gold) inset;
}
.loom-border .corner svg{ width: 70%; height: 70%; }
.loom-border .tl{ top:0; left:0; } .loom-border .tr{ top:0; right:0; }
.loom-border .bl{ bottom:0; left:0; } .loom-border .br{ bottom:0; right:0; }

.stage{ margin: var(--border-w); position:relative; z-index:2; }

/* ============ NAV ============ */
header{
  position: fixed; top: var(--border-w); left: var(--border-w); right: var(--border-w); z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding: 22px 34px;
  background: linear-gradient(to bottom, rgba(23,10,4,.92), transparent);
  transition: all .5s var(--ease);
}
header.scrolled{ background: rgba(23,10,4,.94); backdrop-filter: blur(10px); padding: 12px 34px; }
.logo{ font-family: var(--serif); font-size:1.4rem; font-weight:500; color:var(--ivory); display:flex; align-items:baseline; gap:6px; }
.logo .dot{ color: var(--turquoise-bright); }
nav ul{ display:flex; gap:8px; list-style:none; align-items:center; }
nav a{
  color: var(--ivory); text-decoration:none; font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
  font-weight:400; padding: 8px 16px; position:relative; opacity:.8; transition:opacity .3s;
  display:flex; align-items:center; gap:8px;
}
nav a .gul-dot{ width:5px; height:5px; background:var(--gold); transform:rotate(45deg); transition: background .3s, transform .3s; }
nav a:hover{ opacity:1; }
nav a:hover .gul-dot{ background: var(--turquoise-bright); transform:rotate(45deg) scale(1.6); }
.nav-cta{
  padding:10px 22px; background: var(--gold-bright); color: var(--walnut-deep); text-decoration:none;
  font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; font-weight:600; transition: all .4s var(--ease);
  clip-path: polygon(8% 0,92% 0,100% 50%,92% 100%,8% 100%,0% 50%);
  padding-left: 26px; padding-right: 26px;
}
.nav-cta:hover{ background: var(--turquoise-bright); color: var(--ivory); }

/* ============ HERO ============ */
.hero{
  position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:
    radial-gradient(ellipse 80% 55% at 50% -5%, #2f1a0e 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 50% 105%, #3a1d10 0%, transparent 60%),
    linear-gradient(180deg, var(--walnut-deep) 0%, var(--walnut) 60%, #20100a 100%);
  overflow:hidden; text-align:center; padding: 60px 5vw;
}
#hero-glow{
  position:absolute; width:700px; height:700px; border-radius:50%;
  background: radial-gradient(circle, rgba(63,176,168,.12) 0%, transparent 70%);
  pointer-events:none; z-index:1; transform:translate(-50%,-50%); left:50%; top:40%;
  transition: left .6s var(--ease), top .6s var(--ease);
}
.hero-scatter{
  position:absolute; inset:0; z-index:1;
  background-image:
    radial-gradient(2px 2px at 20% 22%, var(--gold-bright), transparent),
    radial-gradient(1.5px 1.5px at 76% 68%, var(--turquoise-bright), transparent),
    radial-gradient(1.5px 1.5px at 88% 30%, var(--gold-bright), transparent),
    radial-gradient(1px 1px at 38% 82%, var(--turquoise-bright), transparent);
  opacity:.55; animation: twinkle 6s ease-in-out infinite;
}
@keyframes twinkle{ 0%,100%{opacity:.25;} 50%{opacity:.6;} }

.arch-frame{ position:relative; z-index:3; width:min(680px, 82vw); padding: 90px 50px 60px; }
.arch-frame svg.arch-outline{ position:absolute; inset:0; width:100%; height:100%; z-index:0; }
.hero-content{ position:relative; z-index:2; }

.hero-eyebrow{
  color: var(--turquoise-bright); font-size:.72rem; letter-spacing:.34em; text-transform:uppercase;
  display:flex; align-items:center; justify-content:center; gap:14px; margin-bottom:22px;
}
.hero-eyebrow::before,.hero-eyebrow::after{ content:''; width:28px; height:1px; background: var(--turquoise-bright); }

.hero h1{
  font-family: var(--serif); font-weight:400; font-size: clamp(2.6rem, 5.6vw, 4.6rem); line-height:1.02;
  color: var(--ivory); letter-spacing:-.01em;
}
.hero h1 .line{ display:block; overflow:hidden; }
.hero h1 .line span{ display:inline-block; transform:translateY(110%); animation: rise 1.1s var(--ease) forwards; }
.hero h1 .line:nth-child(2) span{ animation-delay:.15s; font-style:italic; font-weight:300; color: var(--gold-bright); }
@keyframes rise{ to{ transform:translateY(0); } }

.hero p.sub{
  font-family: var(--script); font-size:1.32rem; color: var(--ivory-deep); opacity:.85; max-width:480px;
  margin: 26px auto 34px; line-height:1.5; opacity:0; animation: fadeIn 1s var(--ease) .9s forwards;
}
@keyframes fadeIn{ to{opacity:.85;} }
.hero p.sub em{ font-style:italic; color: var(--turquoise-bright); }

.hero-btns{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; opacity:0; animation: fadeIn 1s var(--ease) 1.1s forwards; }
.btn-primary{
  padding:15px 30px; background: var(--gold-bright); color: var(--walnut-deep); text-decoration:none;
  font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; font-weight:600; position:relative; overflow:hidden;
  clip-path: polygon(6% 0,94% 0,100% 50%,94% 100%,6% 100%,0% 50%); padding-left:36px; padding-right:36px;
  transition: color .4s var(--ease);
}
.btn-primary::before{ content:''; position:absolute; inset:0; background: var(--turquoise); transform:translateY(101%); transition:transform .45s var(--ease); z-index:0; }
.btn-primary span{ position:relative; z-index:1; }
.btn-primary:hover{ color: var(--ivory); }
.btn-primary:hover::before{ transform:translateY(0); }
.btn-ghost{
  padding:15px 28px; background:transparent; border:1px solid rgba(243,234,217,.3); color: var(--ivory);
  text-decoration:none; font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; font-weight:500; transition: all .4s var(--ease);
}
.btn-ghost:hover{ border-color: var(--gold-bright); color: var(--gold-bright); }

.scroll-cue{
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%); z-index:3;
  display:flex; flex-direction:column; align-items:center; gap:10px; color: var(--ivory); opacity:.55;
  font-size:.64rem; letter-spacing:.16em; text-transform:uppercase;
}
.scroll-line{ width:1px; height:38px; position:relative; overflow:hidden; background: rgba(243,234,217,.15); }
.scroll-line::after{ content:''; position:absolute; top:-100%; left:0; width:100%; height:100%; background:var(--gold-bright); animation: scrollDown 1.8s ease-in-out infinite; }
@keyframes scrollDown{ 0%{top:-100%;} 60%{top:100%;} 100%{top:100%;} }

/* ============ marquee ============ */
.marquee-strip{ position:relative; z-index:3; background: var(--burgundy-deep); border-top:1px solid var(--gold); border-bottom:1px solid var(--gold); overflow:hidden; padding:15px 0; }
.marquee-track{ display:flex; gap:56px; white-space:nowrap; width:max-content; animation: scroll-left 30s linear infinite; }
.marquee-track span{ font-family: var(--serif); font-style:italic; font-size:.98rem; color: var(--gold-bright); }
.marquee-track span::after{ content:'✦'; margin-left:56px; color: var(--turquoise-bright); font-style:normal; }
@keyframes scroll-left{ from{transform:translateX(0);} to{transform:translateX(-50%);} }

/* ============ THE FIELD ============ */
.field-wrap{ background: var(--ivory); position:relative; padding: 100px 0 60px; }
.field-wrap::before{
  content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%236e1a1f' stroke-width='.5' opacity='0.15'%3E%3Cpath d='M60 10 L100 35 L100 85 L60 110 L20 85 L20 35 Z'/%3E%3Cpath d='M60 30 L82 44 L82 76 L60 90 L38 76 L38 44 Z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 120px 120px;
}

.field-head{ max-width:1200px; margin: 0 auto 70px; padding: 0 6vw; text-align:center; position:relative; z-index:2; }
.field-head .eyebrow{ justify-content:center; color: var(--burgundy); font-size:.72rem; letter-spacing:.3em; text-transform:uppercase; display:flex; gap:14px; align-items:center; margin-bottom:18px;}
.field-head .eyebrow::before,.field-head .eyebrow::after{ content:''; width:26px; height:1px; background: var(--burgundy); }
.field-head h2{ font-family: var(--serif); font-weight:400; font-size: clamp(2.1rem,4vw,3.2rem); color: var(--walnut); line-height:1.08; }
.field-head h2 em{ font-style:italic; color: var(--burgundy); }

.gul-field{
  max-width: 1280px; margin: 0 auto; position:relative; z-index:2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  padding: 0 5vw;
}
.gul-field .gul:nth-child(4n+3),
.gul-field .gul:nth-child(4n+4){ transform: translateY(38px); }

.gul{
  position:relative;
  aspect-ratio: 1 / 1.05;
  clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  background: var(--burgundy);
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
  padding: 14% 12%;
  overflow:hidden;
  transition: transform .5s var(--ease);
}
.gul::before{
  content:''; position:absolute; inset:6%;
  clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  border: 1px solid var(--gold); opacity:.5; pointer-events:none;
}
.gul:hover{ transform: scale(1.04) translateY(-4px); z-index:5; }
.gul.dark{ background: var(--walnut); }
.gul.teal{ background: var(--turquoise); }
.gul.stat{ background: var(--gold); }

.gul .g-icon{ width: 34px; height:34px; margin-bottom:10px; opacity:.9; }
.gul .g-num{ font-family: var(--serif); font-size: 1.7rem; color: var(--ivory); font-weight:500; line-height:1; margin-bottom:6px; }
.gul.stat .g-num{ color: var(--walnut-deep); }
.gul .g-label{ font-size:.62rem; letter-spacing:.12em; text-transform:uppercase; color: var(--ivory); opacity:.7; }
.gul.stat .g-label{ color: var(--walnut-deep); opacity:.75; }
.gul .g-title{ font-family: var(--serif); font-style:italic; font-size:1.05rem; color: var(--ivory); margin-bottom:4px; }
.gul .g-desc{ font-size: .68rem; color: var(--ivory); opacity:.6; line-height:1.4; }

@media (max-width: 900px){
  .gul-field{ grid-template-columns: repeat(2,1fr); }
  .gul-field .gul:nth-child(4n+3),.gul-field .gul:nth-child(4n+4){ transform:none; }
}

/* ============ MENU ============ */
.menu-section{ background: var(--walnut-deep); padding: 130px 0; position:relative; overflow:hidden;}
.menu-section::before{ content:''; position:absolute; inset:0; background: radial-gradient(ellipse 60% 40% at 85% 15%, rgba(44,140,134,.14), transparent); pointer-events:none; }
.menu-head{ max-width:1280px; margin:0 auto 50px; padding:0 6vw; display:flex; justify-content:space-between; align-items:end; gap:30px; flex-wrap:wrap; position:relative; z-index:2;}
.menu-head .eyebrow{ color: var(--turquoise-bright); }
.menu-head .eyebrow::before{ background: var(--turquoise-bright); }
.menu-head h2{ font-family: var(--serif); font-weight:400; font-size: clamp(2.1rem,4vw,3.2rem); color: var(--ivory); margin-top:14px; }
.menu-head h2 em{ font-style:italic; color: var(--gold-bright); }
.menu-hint{ font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color: var(--ivory); opacity:.5; }

.menu-scroll{
  display:flex; gap: 22px; overflow-x: auto; padding: 10px 6vw 30px; scroll-snap-type: x mandatory;
  position:relative; z-index:2;
}
.menu-scroll::-webkit-scrollbar{ height:4px; }
.menu-scroll::-webkit-scrollbar-thumb{ background: var(--gold); }
.menu-scroll::-webkit-scrollbar-track{ background: rgba(255,255,255,.06); }

.dish-card{
  flex: 0 0 320px; scroll-snap-align: start; background: #1f0f06;
  border: 1px solid rgba(201,151,63,.3); padding: 34px 30px; position:relative;
}
.dish-card::before{ content:''; position:absolute; top:-1px; left:24px; right:24px; height:3px; background: linear-gradient(90deg, var(--gold), var(--turquoise-bright), var(--gold)); }
.dish-motif{ width:44px; height:44px; margin-bottom: 22px; opacity: .9; }
.dish-tag{ display:inline-block; font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; padding:5px 12px; border:1px solid var(--turquoise-bright); color: var(--turquoise-bright); margin-bottom:18px; }
.dish-card h3{ font-family: var(--serif); font-size:1.5rem; font-weight:500; color: var(--ivory); margin-bottom:12px; line-height:1.15; }
.dish-card p{ font-size:.84rem; line-height:1.6; color: var(--ivory); opacity:.6; margin-bottom:20px; }
.dish-price{ font-family: var(--serif); font-style:italic; color: var(--gold-bright); font-size:1.1rem; }

/* ============ CTA ============ */
.cta-band{ padding: 140px 6vw; text-align:center; position:relative; background: var(--ivory); overflow:hidden; }
.cta-band .eyebrow{ justify-content:center; color: var(--burgundy); }
.cta-band .eyebrow::before,.cta-band .eyebrow::after{ background: var(--burgundy); }
.cta-band h2{ font-family: var(--serif); font-weight:400; font-size: clamp(2.3rem,4.8vw,4rem); line-height:1.06; margin: 24px auto 18px; max-width:760px; color: var(--walnut); }
.cta-band h2 em{ font-style:italic; color: var(--burgundy); }
.cta-band > p{ font-size:.98rem; color: var(--walnut); opacity:.6; max-width:480px; margin:0 auto 40px; }
.cta-btns{ display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
.btn-dark{ padding:17px 34px; background: var(--walnut); color: var(--ivory); text-decoration:none; font-size:.74rem; letter-spacing:.12em; text-transform:uppercase; font-weight:500; transition: all .4s var(--ease); clip-path: polygon(6% 0,94% 0,100% 50%,94% 100%,6% 100%,0% 50%); padding-left:38px; padding-right:38px;}
.btn-dark:hover{ background: var(--burgundy); transform: translateY(-3px); }
.btn-outline-dark{ padding:17px 34px; background:transparent; border:1px solid var(--walnut); color: var(--walnut); text-decoration:none; font-size:.74rem; letter-spacing:.12em; text-transform:uppercase; font-weight:500; transition: all .4s var(--ease); }
.btn-outline-dark:hover{ background: var(--walnut); color: var(--ivory); transform: translateY(-3px); }

/* ============ FOOTER ============ */
footer{ background: var(--walnut-deep); color: var(--ivory); padding: 60px 6vw 26px; border-top: 1px solid var(--gold); }
.footer-top{ max-width:1280px; margin:0 auto; display:grid; grid-template-columns: 1.3fr 1fr 1fr 1fr; gap:36px; padding-bottom:42px; border-bottom:1px solid rgba(201,151,63,.3); }
.footer-brand{ font-family: var(--serif); font-size:1.6rem; margin-bottom:12px; }
.footer-brand .dot{ color: var(--turquoise-bright); }
.footer-top p{ font-size:.83rem; opacity:.55; line-height:1.6; max-width:270px; }
.footer-col h4{ font-size:.66rem; letter-spacing:.14em; text-transform:uppercase; color: var(--gold-bright); margin-bottom:18px; }
.footer-col a{ display:block; color: var(--ivory); opacity:.7; text-decoration:none; font-size:.86rem; margin-bottom:11px; transition: opacity .3s, transform .3s; }
.footer-col a:hover{ opacity:1; transform: translateX(4px); }
.footer-bottom{ max-width:1280px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; padding-top:22px; font-size:.72rem; opacity:.45; flex-wrap:wrap; gap:10px;}
.footer-bottom .socials{ display:flex; gap:20px; }
.footer-bottom a{ color: var(--ivory); text-decoration:none; opacity:.7; }

.reveal{ opacity:0; transform: translateY(40px); transition: opacity 1s var(--ease), transform 1s var(--ease); }
.reveal.in{ opacity:1; transform:translateY(0); }
.stagger > *{ opacity:0; transform: translateY(24px) scale(.96); transition: opacity .7s var(--ease), transform .7s var(--ease); }
.stagger.in > *{ opacity:1; transform: translateY(0) scale(1); }
.stagger.in > *:nth-child(1){transition-delay:.03s;} .stagger.in > *:nth-child(2){transition-delay:.08s;}
.stagger.in > *:nth-child(3){transition-delay:.13s;} .stagger.in > *:nth-child(4){transition-delay:.18s;}
.stagger.in > *:nth-child(5){transition-delay:.23s;} .stagger.in > *:nth-child(6){transition-delay:.28s;}
.stagger.in > *:nth-child(7){transition-delay:.33s;} .stagger.in > *:nth-child(8){transition-delay:.38s;}

@media (max-width: 900px){
  .ziyafat-root{ --border-w: 20px; }
  nav ul{ display:none; }
  .footer-top{ grid-template-columns: 1fr 1fr; }
  .menu-head{ flex-direction:column; align-items:start; }
}
`}</style>
      <div className="grain"></div>
      <div id="progress"></div>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      {/* persistent woven rug border frame */}
      <div className="loom-border">
        <div className="edge top"></div>
        <div className="edge bottom"></div>
        <div className="edge left"></div>
        <div className="edge right"></div>
        <div className="corner tl">
          <svg viewBox="0 0 24 24">
            <path d="M12 2 L18 8 L18 16 L12 22 L6 16 L6 8 Z" fill="none" stroke="#c9973f" strokeWidth="1.4" />
            <circle cx="12" cy="12" r="2.5" fill="#3fb0a8" />
          </svg>
        </div>
        <div className="corner tr">
          <svg viewBox="0 0 24 24">
            <path d="M12 2 L18 8 L18 16 L12 22 L6 16 L6 8 Z" fill="none" stroke="#c9973f" strokeWidth="1.4" />
            <circle cx="12" cy="12" r="2.5" fill="#3fb0a8" />
          </svg>
        </div>
        <div className="corner bl">
          <svg viewBox="0 0 24 24">
            <path d="M12 2 L18 8 L18 16 L12 22 L6 16 L6 8 Z" fill="none" stroke="#c9973f" strokeWidth="1.4" />
            <circle cx="12" cy="12" r="2.5" fill="#3fb0a8" />
          </svg>
        </div>
        <div className="corner br">
          <svg viewBox="0 0 24 24">
            <path d="M12 2 L18 8 L18 16 L12 22 L6 16 L6 8 Z" fill="none" stroke="#c9973f" strokeWidth="1.4" />
            <circle cx="12" cy="12" r="2.5" fill="#3fb0a8" />
          </svg>
        </div>
      </div>

      <header id="header">
        <div className="logo">
          ZIYAFAT<span className="dot">.</span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#field" data-hover="true">
                <span className="gul-dot"></span>The Field
              </a>
            </li>
            <li>
              <a href="#menu" data-hover="true">
                <span className="gul-dot"></span>Menu
              </a>
            </li>
            <li>
              <a href="#" data-hover="true">
                <span className="gul-dot"></span>Events
              </a>
            </li>
          </ul>
        </nav>
        <a href="#" className="nav-cta" data-hover="true">
          Reserve
        </a>
      </header>

      <section className="hero">
        <div id="hero-glow"></div>
        <div className="hero-scatter"></div>

        <div className="arch-frame">
          <svg className="arch-outline" viewBox="0 0 400 500" preserveAspectRatio="none">
            <path
              d="M20 500 L20 180 Q20 40 200 20 Q380 40 380 180 L380 500"
              fill="none"
              stroke="#c9973f"
              strokeWidth="2"
              opacity="0.55"
            />
            <path
              d="M44 500 L44 190 Q44 66 200 46 Q356 66 356 190 L356 500"
              fill="none"
              stroke="#3fb0a8"
              strokeWidth="1"
              opacity="0.4"
            />
            <path d="M150 60 Q200 30 250 60" fill="none" stroke="#c9973f" strokeWidth="1" opacity="0.5" />
            <path d="M165 75 Q200 52 235 75" fill="none" stroke="#c9973f" strokeWidth="1" opacity="0.5" />
          </svg>
          <div className="hero-content">
            <div className="hero-eyebrow">Shahr-e-Naw · Kabul</div>
            <h1>
              <span className="line">
                <span>Every Table</span>
              </span>
              <span className="line">
                <span>Tells a Story</span>
              </span>
            </h1>
            <p className="sub">
              Woven like the rugs of our home — <em>thread by thread, guest by guest</em> — a five-star Kabul dining
              ritual, now carried into a platform built to the same standard.
            </p>
            <div className="hero-btns">
              <a href="#" className="btn-primary" data-hover="true">
                <span>Reserve a Table</span>
              </a>
              <a href="#field" className="btn-ghost" data-hover="true">
                Enter the Field
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <span>Unroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track" id="marquee">
          <span>Kabuli Palaw</span>
          <span>Mantu &amp; Ashak</span>
          <span>Chapli Kebab</span>
          <span>Woven Since Day One</span>
          <span>Live Music Fridays</span>
          <span>Herati Hospitality</span>
          <span>Kabuli Palaw</span>
          <span>Mantu &amp; Ashak</span>
          <span>Chapli Kebab</span>
          <span>Woven Since Day One</span>
          <span>Live Music Fridays</span>
          <span>Herati Hospitality</span>
        </div>
      </div>

      <section className="field-wrap" id="field">
        <div className="field-head reveal">
          <div className="eyebrow">The Field</div>
          <h2>
            Every gul in this rug
            <br />
            is a piece of <em>Ziyafat.</em>
          </h2>
        </div>

        <div className="gul-field stagger">
          <div className="gul stat" data-hover="true">
            <div className="g-num">4.9★</div>
            <div className="g-label">Guest Ratings</div>
          </div>
          <div className="gul dark" data-hover="true">
            <svg className="g-icon" viewBox="0 0 40 40" fill="none" stroke="#e3b158" strokeWidth="1.3">
              <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" />
              <path d="M20 12 L27 16 L27 24 L20 28 L13 24 L13 16 Z" />
            </svg>
            <div className="g-title">Terrace Seating</div>
          </div>
          <div className="gul teal" data-hover="true">
            <div className="g-num">EN·FA·AR</div>
            <div className="g-label">Full Multilingual</div>
          </div>
          <div className="gul" data-hover="true">
            <svg className="g-icon" viewBox="0 0 40 40" fill="none" stroke="#f3ead9" strokeWidth="1.3">
              <circle cx="20" cy="20" r="15" />
              <path d="M20 5 L20 35 M5 20 L35 20" opacity="0.5" />
            </svg>
            <div className="g-title">Chef's Table</div>
          </div>

          <div className="gul dark" data-hover="true">
            <svg className="g-icon" viewBox="0 0 40 40" fill="none" stroke="#e3b158" strokeWidth="1.3">
              <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" />
            </svg>
            <div className="g-title">Private Dining Suite</div>
          </div>
          <div className="gul stat" data-hover="true">
            <div className="g-num">24/7</div>
            <div className="g-label">Seating &amp; Delivery</div>
          </div>
          <div className="gul" data-hover="true">
            <svg className="g-icon" viewBox="0 0 40 40" fill="none" stroke="#f3ead9" strokeWidth="1.3">
              <path d="M20 6 L30 20 L20 34 L10 20 Z" />
            </svg>
            <div className="g-title">Evening Service</div>
          </div>
          <div className="gul teal" data-hover="true">
            <div className="g-num">100%</div>
            <div className="g-label">Owned Platform</div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="menu-head reveal">
          <div>
            <div className="eyebrow">The Loom of Dishes</div>
            <h2>
              Chef's Signature
              <br />
              <em>Selection.</em>
            </h2>
          </div>
          <div className="menu-hint">Scroll sideways →</div>
        </div>

        <div className="menu-scroll">
          <div className="dish-card" data-hover="true">
            <svg className="dish-motif" viewBox="0 0 40 40" fill="none" stroke="#c9973f" strokeWidth="1.2">
              <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" />
              <path d="M20 12 L27 16 L27 24 L20 28 L13 24 L13 16 Z" />
            </svg>
            <span className="dish-tag">Signature</span>
            <h3>Kabuli Palaw</h3>
            <p>Slow-braised lamb, saffron rice, raisins, carrots, roasted almonds.</p>
            <div className="dish-price">$18</div>
          </div>
          <div className="dish-card" data-hover="true">
            <svg className="dish-motif" viewBox="0 0 40 40" fill="none" stroke="#3fb0a8" strokeWidth="1.2">
              <path d="M20 6 L30 20 L20 34 L10 20 Z" />
            </svg>
            <span className="dish-tag">For the Table</span>
            <h3>Mantu &amp; Ashak Platter</h3>
            <p>Traditional dumplings, seasoned yogurt, herb oil, split-pea sauce.</p>
            <div className="dish-price">$14</div>
          </div>
          <div className="dish-card" data-hover="true">
            <svg className="dish-motif" viewBox="0 0 40 40" fill="none" stroke="#c9973f" strokeWidth="1.2">
              <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" />
            </svg>
            <span className="dish-tag">Grill</span>
            <h3>Chapli &amp; Lamb Kebab</h3>
            <p>Charcoal-grilled, sumac onions, fresh naan, house chutney.</p>
            <div className="dish-price">$21</div>
          </div>
          <div className="dish-card" data-hover="true">
            <svg className="dish-motif" viewBox="0 0 40 40" fill="none" stroke="#3fb0a8" strokeWidth="1.2">
              <circle cx="20" cy="20" r="15" />
            </svg>
            <span className="dish-tag">Sweet</span>
            <h3>Firni &amp; Khajoor</h3>
            <p>Rosewater milk pudding, pistachio, stuffed date pastries.</p>
            <div className="dish-price">$9</div>
          </div>
          <div className="dish-card" data-hover="true">
            <svg className="dish-motif" viewBox="0 0 40 40" fill="none" stroke="#c9973f" strokeWidth="1.2">
              <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" opacity="0.7" />
            </svg>
            <span className="dish-tag">Vegetarian</span>
            <h3>Borani Banjan</h3>
            <p>Fried eggplant, tomato garlic sauce, yogurt-mint drizzle.</p>
            <div className="dish-price">$11</div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="eyebrow reveal">Reserve Your Evening</div>
        <h2 className="reveal">
          Come hungry.
          <br />
          Leave <em>like family.</em>
        </h2>
        <p className="reveal">
          Tables fill quickly on weekends — reserve ahead, or order for delivery across Kabul in minutes.
        </p>
        <div className="cta-btns reveal">
          <a href="#" className="btn-dark" data-hover="true">
            Reserve a Table
          </a>
          <a href="#" className="btn-outline-dark" data-hover="true">
            Order Delivery
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              ZIYAFAT<span className="dot">.</span>
            </div>
            <p>
              A five-star dining experience in the heart of Kabul — woven with food, harmony, and laughter, served
              nightly since day one.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#" data-hover="true">The Field</a>
            <a href="#" data-hover="true">Menu</a>
            <a href="#" data-hover="true">Private Events</a>
          </div>
          <div className="footer-col">
            <h4>Visit</h4>
            <a href="#" data-hover="true">Shahr-e-Naw, Kabul</a>
            <a href="#" data-hover="true">Open Daily · 11am–1am</a>
            <a href="#" data-hover="true">+93 78 232 2222</a>
          </div>
          <div className="footer-col">
            <h4>Reach Us</h4>
            <a href="#" data-hover="true">WhatsApp Reservations</a>
            <a href="#" data-hover="true">hello@ziyafatrestaurants.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ziyafat Restaurant — City Mall, Shahr-e-Naw, Kabul</span>
          <div className="socials">
            <a href="#" data-hover="true">Instagram</a>
            <a href="#" data-hover="true">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}