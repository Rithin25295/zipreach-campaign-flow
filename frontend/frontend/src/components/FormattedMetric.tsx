
import React from 'react';
import { useMetricMode } from '@/contexts/MetricModeContext';
import { formatMetric, getProTerm } from '@/utils/formatMetric';
import { HelpCircle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface FormattedMetricProps {
  type: 'ROAS' | 'CPA' | 'CTR' | 'Sales' | 'Spend' | 'ConversionRate';
  value: number;
  extra?: { clicks?: number; buyers?: number; views?: number; conversions?: number };
  className?: string;
}

const FormattedMetric: React.FC<FormattedMetricProps> = ({ type, value, extra, className }) => {
  const { metricMode } = useMetricMode();
  const formattedValue = formatMetric(type, value, metricMode, extra);
  const proTerm = getProTerm(type);

  return (
    <span className={className}>
      {formattedValue}
      {metricMode === 'simple' && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <HelpCircle className="inline-block ml-1.5 w-3.5 h-3.5 text-muted-foreground/60 hover:text-muted-foreground cursor-help transition-colors duration-200" />
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-auto p-3 bg-popover/95 backdrop-blur-sm border border-border/50 shadow-lg"
            side="top"
            align="center"
          >
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">Pro term</p>
              <p className="text-sm font-semibold text-foreground">{proTerm}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </span>
  );
};

export default FormattedMetric;
