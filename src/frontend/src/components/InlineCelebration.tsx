import { Heart } from 'lucide-react';
import CelebrationPhoto from './CelebrationPhoto';
import { getAssetUrl } from '../utils/assetUrl';

export default function InlineCelebration() {
  return (
    <div className="inline-celebration-container">
      {/* Floating hearts background */}
      <div className="floating-hearts">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Photos at the top */}
      <div className="inline-photos-container">
        <CelebrationPhoto
          src={getAssetUrl('assets/generated/valentine-photo-1.jpg')}
          alt="Valentine Photo 1"
        />
        <CelebrationPhoto
          src={getAssetUrl('assets/generated/valentine-photo-2.jpg')}
          alt="Valentine Photo 2"
        />
      </div>

      {/* Celebration text beneath photos */}
      <div className="inline-celebration-text">
        <h1 className="inline-celebration-title">
          Perfect Choice! 💕
        </h1>
        
        <div className="inline-celebration-message">
          <p>
            Good choice, Zainab Hamza! 😊 This is the start of something beautiful! 💖
          </p>
          <p className="mt-4">
            Okayyyy periodddd 😭💗 we're officially a duo.
          </p>
          <p className="mt-2">
            I'm down bad and proud—you're my favorite notification 📲💞
          </p>
          <p className="mt-2">
            No cap, you're the vibe I've been manifesting 🌙✨💕
          </p>
          <p className="mt-2">
            Literally obsessed—you're my Roman Empire fr fr 🏛️💗😍
          </p>
          <p className="mt-4">
            I love you sooo much! I hope whatever universe has for us, it's written us together for the rest of our lives.
          </p>
          <p className="mt-4 font-semibold">
            Your Hamza loves you soo muchieee
          </p>
          <p className="mt-4 text-xl font-bold">
            PLEASE BE MY WIFE AND THE MOTHER OF MY KIDS I LOVE YOU INFINTE TIMES
          </p>
        </div>
      </div>
    </div>
  );
}
