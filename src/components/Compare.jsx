import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import './Compare.css';

const ROWS = [
  {
    n: '01',
    label: '소통 방식',
    before: '사진,텍스트 진부하디 진부한 피드',
    after: '답장을 기다리지 않는 단방향 기록. 남기고, 공유하세요',
  },
  {
    n: '02',
    label: '기록의 형태',
    before: '진부하게 고른 사진과 다듬어진 문장으로 편집된 장면',
    after: '현장의 소음, 숨소리, 바람 — 그 순간의 공기 그대로 담긴 소리',
  },
  {
    n: '03',
    label: '여행의 흔적',
    before: '끝없이 아래로 흐르는 피드 속에 묻혀 사라지는 기록들',
    after: '여권에 찍히는 도장처럼 남는 다이어리. 다녀온 지역만큼 채워지는 지도',
  },
  {
    n: '04',
    label: '듣는 사람',
    before: '무슨 피드이든 누구나 볼수있는 공간',
    after: '그 장소에 직접 가야만 재생되는 이야기. 같은 자리에 선 사람만의 것',
  },
];

export default function Compare() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const reveal = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useTransform(reveal, (v) => `inset(${v}% 0 0 0)`);
  const dialRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const dialColor = useTransform(scrollYProgress, [0.4, 0.6], ['var(--ink-faint)', 'var(--paper)']);

  return (
    <section className="compare" ref={ref}>
      <div className="compare__stage">
        <div className="compare__panel compare__panel--before">
          <PanelContent side="before" />
        </div>

        <motion.div className="compare__panel compare__panel--after" style={{ clipPath: clip }}>
          <PanelContent side="after" />
        </motion.div>

        <motion.div className="compare__dial" style={{ color: dialColor }}>
          <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
            <circle cx="30" cy="30" r="27" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
            <motion.line x1="30" y1="30" x2="30" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ rotate: dialRotate, originX: '30px', originY: '30px' }} />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function PanelContent({ side }) {
  const isAfter = side === 'after';
  return (
    <div className="container compare__inner">
      <div className="compare__head">
        <span className="eyebrow">{isAfter ? 'StoryRoad' : 'Old SNS'}</span>
        <h2 className="compare__title">
          {isAfter ? (
            <>
              스토리로드는
              <br />
              듣는 여행 다이어리
            </>
          ) : (
            <>
              우리가 익숙한
              <br />
              SNS의 방식
            </>
          )}
        </h2>
      </div>

      <div className="compare__rows">
        {ROWS.map((row) => (
          <div className="compare__row" key={row.n}>
            <span className="compare__row-n">{row.n}</span>
            <span className="compare__row-label">{row.label}</span>
            <p className="compare__row-text">{isAfter ? row.after : row.before}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
