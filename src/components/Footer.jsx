import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <svg viewBox="0 0 40 40" className="footer__mark" aria-hidden="true">
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
          <span className="footer__word">
            스토리<span>로드</span>
          </span>
        </div>

        <p className="footer__tag">사진 대신 목소리, 손 딸깍 대신 발걸음</p>

        <nav className="footer__links">
          <a href="#audio">오디오 다이어리</a>
          <a href="#stamps">도장깨기</a>
          <a href="#places">지역 정보</a>
          <a href="#how">이용 방법</a>
        </nav>

        <div className="footer__bottom">
          <span>© 2026 StoryRoad. 듣는 여행 다이어리.</span>
          <span>Beta · 경상북도 </span>
        </div>
      </div>
    </footer>
  );
}
