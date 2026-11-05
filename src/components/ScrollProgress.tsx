import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#C83B28] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(200,59,40,0.6)] relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Subtle luminous highlight point at the leading edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff7360] shadow-[0_0_6px_#C83B28] opacity-80" />
      </div>
    </div>
  );
}
