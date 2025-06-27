
import React from 'react';
import { useMetricMode } from '@/contexts/MetricModeContext';

const MetricModeToggle: React.FC = () => {
  const { metricMode, setMetricMode } = useMetricMode();

  const handleToggle = () => {
    setMetricMode(metricMode === 'pro' ? 'simple' : 'pro');
  };

  return (
    <div className="flex items-center space-x-1.5">
      <span className={`text-xs font-medium transition-all duration-300 ${
        metricMode === 'pro' ? 'text-sidebar-foreground/90' : 'text-sidebar-foreground/40'
      }`}>Pro</span>
      <button
        onClick={handleToggle}
        aria-pressed={metricMode === 'simple'}
        className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-sidebar focus:ring-sidebar-ring ${
          metricMode === 'simple'
            ? 'bg-gradient-to-r from-emerald-400/80 via-teal-400/70 to-blue-400/60 shadow-sm'
            : 'bg-sidebar-accent border border-sidebar-border/50 hover:bg-sidebar-accent/80'
        }`}
      >
        <span className="sr-only">Toggle metric mode</span>
        <span
          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition-all duration-300 ease-in-out ${
            metricMode === 'simple' ? 'translate-x-3.5 shadow-md' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className={`text-xs font-medium transition-all duration-300 ${
        metricMode === 'simple' ? 'text-sidebar-foreground/90' : 'text-sidebar-foreground/40'
      }`}>Simple</span>
    </div>
  );
};

export default MetricModeToggle;
