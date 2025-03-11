import type { ReactNode } from 'react';

import { type ResultType, sizes } from '@/utils/constants';

export interface IRollingWheelProps {
  autoStart?: boolean;
  className?: string;
  itemClassName?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  render?: () => ReactNode;
  result: string;
  resultType?: ResultType;
  size?: keyof typeof sizes;
  startDelay?: number;
  duration?: number;
  placeholder?: string | ReactNode;
}

export interface RollingWheelRef {
  start: () => void;
}
