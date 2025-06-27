
export interface Asset {
  id: string;
  title: string;
  channel: string;
  type: 'video' | 'image' | 'carousel' | 'search' | 'newsletter';
  thumbnail: string;
  cta: string;
  cpa: number;
  status: 'performing' | 'average' | 'underperforming';
}
