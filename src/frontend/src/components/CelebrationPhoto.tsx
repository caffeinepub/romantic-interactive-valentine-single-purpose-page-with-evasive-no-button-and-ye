import { useState, useEffect } from 'react';

interface CelebrationPhotoProps {
  src: string;
  alt: string;
}

export default function CelebrationPhoto({ src, alt }: CelebrationPhotoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Reset state when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
    setRetryKey(prev => prev + 1);
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  if (hasError) {
    return (
      <div className="inline-photo-fallback">
        <p className="text-center text-muted-foreground">
          Photo could not be loaded
        </p>
      </div>
    );
  }

  return (
    <div className="inline-photo-wrapper">
      <img
        key={retryKey}
        src={src}
        alt={alt}
        className={`inline-photo ${isLoaded ? 'inline-photo-loaded' : 'inline-photo-loading'}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
