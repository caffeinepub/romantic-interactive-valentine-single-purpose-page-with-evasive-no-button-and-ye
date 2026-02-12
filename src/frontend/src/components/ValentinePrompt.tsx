import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import InlineCelebration from './InlineCelebration';

export default function ValentinePrompt() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionAreaRef = useRef<HTMLDivElement>(null);
  const lastMoveTimeRef = useRef<number>(0);

  // Initialize No button position after mount
  useEffect(() => {
    if (!isNoButtonPositioned && noButtonRef.current && interactionAreaRef.current) {
      const container = interactionAreaRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      // Start centered in the interaction area
      setNoButtonPosition({ 
        x: (container.width - button.width) / 2, 
        y: (container.height - button.height) / 2 
      });
      setIsNoButtonPositioned(true);
    }
  }, [isNoButtonPositioned]);

  const moveNoButton = () => {
    if (!interactionAreaRef.current || !noButtonRef.current || !yesButtonRef.current) return;

    const container = interactionAreaRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();
    const yesButton = yesButtonRef.current.getBoundingClientRect();

    const padding = 20;
    const minDistance = 140; // Minimum distance from Yes button

    let newX: number;
    let newY: number;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      // Generate random position within container bounds
      newX = Math.random() * (container.width - noButton.width - padding * 2) + padding;
      newY = Math.random() * (container.height - noButton.height - padding * 2) + padding;

      // Calculate distance from Yes button (relative to container)
      const yesRelativeX = yesButton.left - container.left;
      const yesRelativeY = yesButton.top - container.top;
      const yesCenterX = yesRelativeX + yesButton.width / 2;
      const yesCenterY = yesRelativeY + yesButton.height / 2;
      const noCenterX = newX + noButton.width / 2;
      const noCenterY = newY + noButton.height / 2;
      
      const distanceFromYes = Math.sqrt(
        Math.pow(noCenterX - yesCenterX, 2) +
        Math.pow(noCenterY - yesCenterY, 2)
      );

      if (distanceFromYes > minDistance) {
        break;
      }

      attempts++;
    } while (attempts < maxAttempts);

    // Clamp to container bounds
    newX = Math.max(padding, Math.min(newX, container.width - noButton.width - padding));
    newY = Math.max(padding, Math.min(newY, container.height - noButton.height - padding));

    setNoButtonPosition({ x: newX, y: newY });
  };

  const checkProximityAndMove = (clientX: number, clientY: number) => {
    if (!interactionAreaRef.current || !noButtonRef.current) return;

    // Throttle to avoid excessive moves
    const now = Date.now();
    if (now - lastMoveTimeRef.current < 50) return;
    lastMoveTimeRef.current = now;

    const container = interactionAreaRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();

    // Calculate pointer position relative to container
    const pointerX = clientX - container.left;
    const pointerY = clientY - container.top;

    // Calculate distance from pointer to No button center
    const buttonCenterX = noButton.left - container.left + noButton.width / 2;
    const buttonCenterY = noButton.top - container.top + noButton.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(pointerX - buttonCenterX, 2) +
      Math.pow(pointerY - buttonCenterY, 2)
    );

    // Evade if pointer is within 100px (increased from previous threshold)
    const evadeThreshold = 100;
    if (distance < evadeThreshold) {
      moveNoButton();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    checkProximityAndMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      checkProximityAndMove(touch.clientX, touch.clientY);
    }
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  };

  const handleYesClick = () => {
    setHasAccepted(true);
  };

  return (
    <div ref={containerRef} className="valentine-container">
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <Card className="valentine-card">
        {!hasAccepted ? (
          <>
            <CardHeader>
              <CardTitle className="text-center space-y-4">
                <Heart className="heart-icon" fill="currentColor" />
                <h1 className="question-text">
                  Will you be my Valentine?
                </h1>
                <p className="text-lg md:text-xl mt-4 font-normal">
                  Zainab Hamza, be so fr… you + me = main character energy ✨💞
                </p>
                <p className="text-lg md:text-xl mt-2 font-normal">
                  Say yes and I'll simp respectfully forever 😌🖤🌸
                </p>
                <p className="text-lg md:text-xl mt-2 font-normal">
                  You're giving soulmate vibes and I'm here for it 🥺💖🫶
                </p>
                <p className="text-lg md:text-xl mt-2 font-normal">
                  Catch me blushing every time you exist 😳💗✨
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={interactionAreaRef} 
                className="buttons-container"
                onPointerMove={handlePointerMove}
                onTouchMove={handleTouchMove}
              >
                <Button
                  ref={yesButtonRef}
                  onClick={handleYesClick}
                  size="lg"
                  className="yes-button"
                >
                  👅 Yes!
                </Button>
                <Button
                  ref={noButtonRef}
                  onPointerEnter={handleNoInteraction}
                  onPointerDown={handleNoInteraction}
                  onTouchStart={handleNoInteraction}
                  onMouseEnter={handleNoInteraction}
                  onMouseDown={handleNoInteraction}
                  onClick={handleNoInteraction}
                  size="lg"
                  variant="outline"
                  className="no-button no-button-evade"
                  style={
                    isNoButtonPositioned
                      ? {
                          position: 'absolute',
                          transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                        }
                      : undefined
                  }
                >
                  😔 No
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <InlineCelebration />
        )}
      </Card>
    </div>
  );
}
