import type { ReactNode } from 'react';

import { type ResultType, sizes } from '@/utils/constants';

/**
 * Props for the RollingWheel component.
 *
 * This component creates an animated rolling/slot machine effect that reveals characters one by one.
 */
export interface RollingWheelProps {
  /**
   * Whether the animation should start automatically when the component mounts or when the result changes.
   * @default true
   */
  autoStart?: boolean;

  /**
   * Additional CSS class name for the container element.
   */
  className?: string;

  /**
   * Additional CSS class name for each individual character container.
   * @default 'w-full'
   */
  itemClassName?: string;

  /**
   * Callback function that is called when the animation starts.
   */
  onStart?: () => void;

  /**
   * Callback function that is called when the animation completes successfully.
   */
  onSuccess?: () => void;

  /**
   * Custom render function for the component's item.
   */
  render?: (value: string) => ReactNode;

  /**
   * The final string to be revealed by the animation.
   * Each character will be revealed one by one.
   * @required
   */
  result: string;

  /**
   * The type of characters to display during the rolling animation.
   * - 'DIGIT': Random digits (0-9)
   * - 'TEXT': Random letters (a-z), will match case with the result
   * @default 'DIGIT'
   */
  resultType?: ResultType;

  /**
   * The size of the component.
   * @default 'small'
   */
  size?: keyof typeof sizes;

  /**
   * Delay in seconds before the animation starts.
   * @default 0
   */
  startDelay?: number;

  /**
   * Total duration of the animation in seconds.
   * The time will be divided equally among all characters in the result.
   * @default 60
   */
  duration?: number;

  /**
   * Placeholder character or node to display before the animation starts.
   * @default 'X'
   */
  placeholder?: string | ReactNode;
}

export interface RollingWheelRef {
  start: () => void;
}
