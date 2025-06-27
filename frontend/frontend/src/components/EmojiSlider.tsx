
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface EmojiSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const EmojiSlider = ({ value, onChange, disabled = false }: EmojiSliderProps) => {
  const emojis = ['😐', '🙂', '😊', '😃', '🤩'];
  const labels = ['Not really', 'Somewhat', 'Interested', 'Very excited', 'Can\'t wait!'];

  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'ArrowLeft' && value > 1) {
      onChange(value - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && value < 5) {
      onChange(value + 1);
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-4">
      {/* Emoji Display */}
      <div className="text-center">
        <div className="text-6xl mb-2" role="img" aria-label={labels[value - 1]}>
          {emojis[value - 1]}
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
          max={5}
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
        {emojis.map((emoji, index) => (
          <button
            key={index}
            type="button"
            onClick={() => !disabled && onChange(index + 1)}
            className={`transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg p-1 ${
              value === index + 1 ? 'scale-110' : 'opacity-50'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={disabled}
            aria-label={`Set excitement level to ${labels[index]}`}
            role="img"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSlider;
