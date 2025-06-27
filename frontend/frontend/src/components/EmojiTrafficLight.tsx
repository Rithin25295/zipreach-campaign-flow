
import React from 'react';

interface EmojiTrafficLightProps {
  status: 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const EmojiTrafficLight = ({ status, size = 'md', showLabel = false }: EmojiTrafficLightProps) => {
  const getEmoji = (status: string) => {
    switch (status) {
      case 'green': return '🟢';
      case 'yellow': return '🟡';
      case 'red': return '🔴';
      default: return '⚪';
    }
  };

  const getLabel = (status: string) => {
    switch (status) {
      case 'green': return 'Excellent';
      case 'yellow': return 'Warning';
      case 'red': return 'Critical';
      default: return 'Unknown';
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-2xl';
      default: return 'text-base';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={getSizeClass(size)}>{getEmoji(status)}</span>
      {showLabel && (
        <span className={`font-medium ${
          status === 'green' ? 'text-green-700' :
          status === 'yellow' ? 'text-yellow-700' :
          'text-red-700'
        }`}>
          {getLabel(status)}
        </span>
      )}
    </div>
  );
};

export default EmojiTrafficLight;
