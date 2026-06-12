import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import './Nav.css';

const LINKS = [
  { href: '#audio', label: '오디오 다이어리' },
  { href: '#stamps', label: '도장깨기' },
  { href: '#places', label: '지역 정보' },
  { href: '#how', label: '이용 방법' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" data-cursor="view" data-cursor-label="처음으로">
          <svg viewBox="0 0 40 40" className="nav__mark" aria-hidden="true">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M11 23 L14 14 L17 26 L20 11 L23 27 L26 16 L29 21"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav__word">
            스토리<span>로드</span>
          </span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-cursor="view" data-cursor-label="이동">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#cta" className="btn btn-ghost nav__cta" data-cursor="view" data-cursor-label="시작">
          사전 알림 받기
        </a>
      </div>
    </motion.header>
  );
}
