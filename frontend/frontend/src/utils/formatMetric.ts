
export function formatMetric(
  type: 'ROAS' | 'CPA' | 'CTR' | 'Sales' | 'Spend' | 'ConversionRate',
  value: number,
  mode: 'pro' | 'simple',
  extra?: { clicks?: number; buyers?: number; views?: number; conversions?: number }
): string {
  if (mode === 'pro') {
    switch (type) {
      case 'ROAS':
        return `${value.toFixed(1)}×`;
      case 'CPA':
        return `$${value.toFixed(2)}`;
      case 'CTR':
        return `${value.toFixed(1)}%`;
      case 'ConversionRate':
        return `${value.toFixed(1)}%`;
      case 'Sales':
        return `$${value.toLocaleString()}`;
      case 'Spend':
        return `$${value.toLocaleString()}`;
    }
  }
  
  // Simple mode
  switch (type) {
    case 'ROAS':
      return `Earned $${value.toFixed(2)} per $1 spent`;
    case 'CPA':
      return `Each buyer cost you $${value.toFixed(2)}`;
    case 'CTR':
      return `${value.toFixed(1)}% clicked (${extra?.clicks ?? Math.round((extra?.views ?? 1000) * value / 100)} people)`;
    case 'ConversionRate':
      return `${value.toFixed(1)}% became buyers (${extra?.conversions ?? Math.round((extra?.clicks ?? 100) * value / 100)} people)`;
    case 'Sales':
      return `${extra?.buyers ?? 0} buyers ($${value.toLocaleString()} sales)`;
    case 'Spend':
      return `$${value.toLocaleString()} spent`;
  }
}

export function getProTerm(type: 'ROAS' | 'CPA' | 'CTR' | 'Sales' | 'Spend' | 'ConversionRate'): string {
  switch (type) {
    case 'ROAS':
      return 'Return on Ad Spend';
    case 'CPA':
      return 'Cost Per Acquisition';
    case 'CTR':
      return 'Click Through Rate';
    case 'ConversionRate':
      return 'Conversion Rate';
    case 'Sales':
      return 'Total Sales';
    case 'Spend':
      return 'Total Spend';
  }
}
