import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import './StampSection.css';

const STAMPS = [
  { name: '포항', sub: '포스코와 철강도시', rot: -8, unlocked: true },
  { name: '경산', sub: '갓바위의 고장', rot: 6, unlocked: true },
  { name: '안동', sub: '하회마을과 선비의 도시', rot: -4, unlocked: true },
  { name: '경주', sub: '???', rot: -10, unlocked: false },
  { name: '울산', sub: '???', rot: 12, unlocked: false },
];

export default function StampSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const unlockedCount = STAMPS.filter((s) => s.unlocked).length;

  return (
    <section id="stamps" className="stamps" ref={ref}>
      <div className="container">
        <div className="stamps__head">
          <span className="eyebrow">02 · Unlock by Travel</span>
          <h2 className="stamps__title">
            내딛음으로 열리는
            <br />
            당신의 페이지
          </h2>
          <p className="stamps__text">
            지역의 오디오 스토리는 처음엔 잠겨 있습니다. 화면 속 지도가 아니라
            실제로 그 지역에 도착했을 때, 여권에 도장이 찍히듯 그 지역의 기록이
            잠금 해제됩니다. 다녀온 만큼만 들을 수 있고, 다녀온 만큼만 채워집니다.
          </p>

          <div className="stamps__progress">
            <div className="stamps__progress-track">
              <motion.div
                className="stamps__progress-fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: unlockedCount / STAMPS.length }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </div>
            <span>{unlockedCount} / {STAMPS.length} 지역 잠금 해제</span>
          </div>
        </div>

        <div className="stamps__field">
          <svg className="stamps__route" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M 10 150 C 140 40, 280 200, 420 90 S 700 30, 840 130 S 1080 60, 1190 110"
              fill="none"
              stroke="var(--stamp)"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="3 12"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <div className="stamps__grid">
            {STAMPS.map((s, i) => (
              <motion.div
                key={s.name}
                className={`stamp ${s.unlocked ? 'is-unlocked' : 'is-locked'}`}
                style={{ '--rot': `${s.rot}deg` }}
                initial={{ opacity: 0, scale: 2.1, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: s.rot }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 4) * 0.08,
                  type: 'spring',
                  stiffness: 220,
                  damping: 14,
                }}
                data-cursor={s.unlocked ? 'view' : 'stamp'}
                data-cursor-label={s.unlocked ? '재생' : '잠김'}
              >
                <span className="stamp__ring" />
                <span className="stamp__name">{s.name}</span>
                <span className="stamp__sub">{s.sub}</span>
                {!s.unlocked && (
                  <svg className="stamp__lock" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
