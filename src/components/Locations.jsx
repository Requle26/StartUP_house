import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import './Locations.css';

const PLACES = [
  {
    name: '포항',
    tag: '포스코와 철강도시',
    weather: '18° 맑음',
    audios: 12,
    course: '스페이스워크 → 영일대해수욕장 → 죽도시장',
    scene: 'pohang',
  },
  {
    name: '경산',
    tag: '갓바위의 고장',
    weather: '22° 흐림',
    audios: 9,
    course: '진량역 → 갓바위 → 남천변',
    scene: 'gyeongsan',
  },
  {
    name: '안동',
    tag: '하회마을과 선비의 도시',
    weather: '15° 맑음',
    audios: 7,
    course: '안동역 → 하회마을 → 월영교',
    scene: 'andong',
  },
];

function Scene({ type }) {
  if (type === 'pohang') {
    return (
      <svg viewBox="0 0 200 130" className="loc-scene__svg" preserveAspectRatio="none" aria-hidden="true">
        <path className="scene-layer scene-layer--1" d="M0 92 L46 38 L78 92 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle className="scene-layer scene-layer--1" cx="46" cy="33" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path className="scene-layer scene-layer--2" d="M70 100 L120 60 L168 100 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path className="scene-layer scene-layer--3" d="M0 118 H200" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
        <path className="scene-layer scene-layer--3" d="M120 112 a10 6 0 0 1 20 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (type === 'gyeongsan ') {
    return (
      <svg viewBox="0 0 200 130" className="loc-scene__svg" preserveAspectRatio="none" aria-hidden="true">
        <g className="scene-layer scene-layer--1">
          <rect x="20" y="58" width="14" height="56" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="40" y="40" width="14" height="74" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="60" y="64" width="14" height="50" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </g>
        <path className="scene-layer scene-layer--2" d="M0 100 Q 50 80 100 100 T 200 100" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path className="scene-layer scene-layer--3" d="M0 118 H200" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 130" className="loc-scene__svg" preserveAspectRatio="none" aria-hidden="true">
      <path className="scene-layer scene-layer--1" d="M0 90 Q 50 70 100 90 T 200 90" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path className="scene-layer scene-layer--2" d="M0 104 Q 50 86 100 104 T 200 104" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <g className="scene-layer scene-layer--3">
        <rect x="138" y="60" width="40" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M150 60 V46 M150 46 h12 v8 h-12" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function LocationCard({ place, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="loc-card"
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="view"
      data-cursor-label="둘러보기"
    >
      <div className="loc-card__scene">
        <Scene type={place.scene} />
        <span className="loc-card__num">0{index + 1}</span>
      </div>
      <div className="loc-card__body">
        <div className="loc-card__top">
          <h3>{place.name}</h3>
          <span className="loc-card__weather">{place.weather}</span>
        </div>
        <p className="loc-card__tag">{place.tag}</p>
        <p className="loc-card__course">{place.course}</p>
        <div className="loc-card__foot">
          <span className="loc-card__audios">
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M12 4v15M5 12l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="0" /><path d="M9 18a3 3 0 1 0 6 0V6l8-2v12a3 3 0 1 0-2-2.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            오디오 {place.audios}개
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Locations() {
  return (
    <section id="places" className="locations">
      <div className="container">
        <div className="locations__head">
          <span className="eyebrow">03 · Local Notes</span>
          <h2 className="locations__title">
            도착 전에, 먼저
            <br className="br-mobile" /> 동네를 걸어본다
          </h2>
          <p className="locations__text">
            각 지역 페이지에는 사진과 함께 날씨, 추천 동선, 그리고 그곳에서
            남겨진 오디오 개수가 함께 표시됩니다. 도장을 깨기 전이라도,
            그 동네의 분위기를 먼저 살펴볼 수 있어요.
          </p>
        </div>

        <div className="locations__grid">
          {PLACES.map((place, i) => (
            <LocationCard place={place} index={i} key={place.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
