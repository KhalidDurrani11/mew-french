import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackSources?: string[];
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  fallbackSources = [],
  alt = '',
  className = '',
  ...props
}: ImageWithFallbackProps) {
  // Collect all available candidate URLs in order of preference
  const candidates: string[] = [];
  if (src) candidates.push(src);
  if (fallbackSrc && !candidates.includes(fallbackSrc)) candidates.push(fallbackSrc);
  for (const s of fallbackSources) {
    if (s && !candidates.includes(s)) candidates.push(s);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  const currentSource = candidates[currentIndex] || src || '';

  const handleError = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <img
      src={currentSource}
      alt={alt}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      loading="lazy"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      {...props}
    />
  );
}

