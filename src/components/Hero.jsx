import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Waveform from './Waveform';
import './Hero.css';

const LINES = ['여행은 쓰는 게 아니라', '들려주는 거니까'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero__route" aria-hidden="true">
        <svg viewBox="0 0 1400 800" preserveAspectRatio="none">
          <motion.path
            d="M -50 620 C 220 520, 360 700, 560 540 S 900 280, 1080 380 S 1380 180, 1480 120"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeDasharray="2 14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </svg>
      </div>

      <motion.div className="container hero__inner" style={{ opacity: fade }}>
        <motion.div className="hero__text" style={{ y: textY }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Audio Travel Journal
          </motion.span>

          <h1 className="hero__title">
            {LINES.map((line, i) => (
              <span className="hero__line-wrap" key={line}>
                <motion.span
                  className="hero__line"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            사진과 텍스트로 가득한 피드 대신, 그 자리에서 남긴 소리 한 점.
            스토리로드는 듣는 여행 다이어리이자, 다녀온 곳을 직접 잠금 해제하는
            여행 기록장입니다.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <a href="#cta" className="btn btn-primary" data-cursor="view" data-cursor-label="시작">
              사전 알림 받기
            </a>
            <a href="#audio" className="hero__more" data-cursor="view" data-cursor-label="더보기">
              <span>어떻게 다른가요</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M12 4v15M5 12l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            className="hero__beta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <span className="hero__beta-dot" />
            현재 경상북도 에서 베타로 기록을 모으고 있어요
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <div className="hero__card">
            <div className="hero__card-top">
              <span className="hero__card-place">경상북도</span>
              <span className="hero__card-time">0:42</span>
            </div>
            <div className="hero__card-wave">
              <Waveform bars={34} playing />
            </div>
            <div className="hero__card-foot">
              <span>2026.04.12 오후 5:32</span>
              <span className="hero__card-tag">잠금 해제됨</span>
            </div>
          </div>

          <div className="hero__stamp">
            <svg viewBox="0 0 200 200" className="hero__stamp-ring">
              <defs>
                <path id="stampCircle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 6" />
              <text fill="currentColor">
                <textPath href="#stampCircle" startOffset="0%">
                  STORYROAD · TRAVEL DIARY · STORYROAD · TRAVEL DIARY ·
                </textPath>
              </text>
            </svg>
            <div className="hero__stamp-center">
              <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
                <path d="M11 23 L14 14 L17 26 L20 11 L23 27 L26 16 L29 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="hero__scroll-line" />
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
}
