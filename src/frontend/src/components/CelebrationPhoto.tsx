import { useState, useEffect, useRef } from 'react';

interface CelebrationPhotoProps {
  src: string;
  alt: string;
}

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 800;

export default function CelebrationPhoto({ src, alt }: CelebrationPhotoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<number | null>(null);

  // Reset state when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
    retryCountRef.current = 0;
    setRetryKey(prev => prev + 1);
    
    // Clear any pending retry timeout
    if (retryTimeoutRef.current !== null) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, [src]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const handleError = () => {
    // If we haven't exceeded max retries, schedule a retry
    if (retryCountRef.current < MAX_RETRIES) {
      retryCountRef.current += 1;
      
      retryTimeoutRef.current = window.setTimeout(() => {
        // Force re-mount by changing key
        setRetryKey(prev => prev + 1);
      }, RETRY_DELAY_MS);
    } else {
      // All retries exhausted, show error fallback
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    retryCountRef.current = 0; // Reset retry count on successful load
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
