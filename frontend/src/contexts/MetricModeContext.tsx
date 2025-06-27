
import React, { createContext, useContext, useState, useEffect } from 'react';

type MetricMode = 'pro' | 'simple';

interface MetricModeContextType {
  metricMode: MetricMode;
  setMetricMode: (mode: MetricMode) => void;
}

const MetricModeContext = createContext<MetricModeContextType | undefined>(undefined);

export const useMetricMode = () => {
  const context = useContext(MetricModeContext);
  if (!context) {
    throw new Error('useMetricMode must be used within a MetricModeProvider');
  }
  return context;
};

export const MetricModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metricMode, setMetricModeState] = useState<MetricMode>('pro');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('metricMode') as MetricMode;
    if (saved === 'pro' || saved === 'simple') {
      setMetricModeState(saved);
    }
  }, []);

  const setMetricMode = (mode: MetricMode) => {
    setMetricModeState(mode);
    localStorage.setItem('metricMode', mode);
  };

  return (
    <MetricModeContext.Provider value={{ metricMode, setMetricMode }}>
      {children}
    </MetricModeContext.Provider>
  );
};
