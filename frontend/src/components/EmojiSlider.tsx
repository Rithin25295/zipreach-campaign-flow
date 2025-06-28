import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface EmojiSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

interface FaceProps { level: number; className?: string; }

const FaceIcon: React.FC<FaceProps> = ({ level, className }) => {
  const commonStroke = "stroke-current";
  const size = 48;
  const mouthY = 38;

  switch (level) {
    case 1: // frown / neutral low
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={cn(commonStroke, className)} strokeWidth={4} strokeLinecap="round">
          <circle cx="32" cy="32" r="28" />
          <line x1="22" y1={mouthY} x2="42" y2={mouthY} />
          <circle cx="24" cy="24" r="2" />
          <circle cx="40" cy="24" r="2" />
        </svg>
      );
    case 2: // slight smile
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={cn(commonStroke, className)} strokeWidth={4} strokeLinecap="round">
          <circle cx="32" cy="32" r="28" />
          <path d="M24 40c2 4 12 4 16 0" />
          <circle cx="24" cy="24" r="2" />
          <circle cx="40" cy="24" r="2" />
        </svg>
      );
    case 3: // smile
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={cn(commonStroke, className)} strokeWidth={4} strokeLinecap="round">
          <circle cx="32" cy="32" r="28" />
          <path d="M22 38c3 6 17 6 20 0" />
          <circle cx="24" cy="24" r="2" />
          <circle cx="40" cy="24" r="2" />
        </svg>
      );
    case 4: // big smile
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={cn(commonStroke, className)} strokeWidth={4} strokeLinecap="round">
          <circle cx="32" cy="32" r="28" />
          <path d="M20 36c4 10 20 10 24 0" />
          <circle cx="24" cy="24" r="2" />
          <circle cx="40" cy="24" r="2" />
        </svg>
      );
    default:
      return null;
  }
};

const EmojiSlider = ({ value, onChange, disabled = false }: EmojiSliderProps) => {
  const labels = ['Not really', 'Somewhat', 'Interested', 'Very excited'];

  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'ArrowLeft' && value > 1) {
      onChange(value - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && value < 4) {
      onChange(value + 1);
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-4">
      {/* Emoji Display */}
      <div className="text-center">
        <div className="mb-2 flex items-center justify-center" role="img" aria-label={labels[value - 1]}>
          <FaceIcon level={value} className="text-primary" />
        </div>
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
          {labels[value - 1]}
        </p>
      </div>

      {/* Slider */}
      <div className="px-4">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          min={1}
          max={4}
          step={1}
          disabled={disabled}
          className="w-full"
          onKeyDown={handleKeyDown}
          aria-label="Excitement level slider"
          tabIndex={disabled ? -1 : 0}
        />
      </div>

      {/* Emoji Scale */}
      <div className="flex justify-between px-4 text-2xl">
        {[1,2,3,4].map((lvl, index) => (
          <button
            key={index}
            type="button"
            onClick={() => !disabled && onChange(index + 1)}
            className={`transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full p-1 ${
              value === index + 1 ? 'opacity-100' : 'opacity-60'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={disabled}
            aria-label={`Set excitement level to ${labels[index]}`}
            role="img"
          >
            <FaceIcon level={lvl} className="h-8 w-8 text-primary" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSlider;
