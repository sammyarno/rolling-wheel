import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import {
  DEFAULT_AUTOSTART,
  DEFAULT_DELAY,
  DEFAULT_DURATION,
  DEFAULT_PLACEHOLDER,
  DEFAULT_RESULT,
  DEFAULT_RESULT_TYPE,
  DEFAULT_SIZE,
  sizes,
} from '@/utils/constants';
import { cx } from '@/utils/formatter';

import type { RollingWheelProps, RollingWheelRef } from './types';

const RollingWheel = forwardRef<RollingWheelRef, RollingWheelProps>((props, ref) => {
  const {
    className,
    itemClassName = 'w-full',
    onStart,
    onSuccess,
    render,
    result = DEFAULT_RESULT,
    resultType = DEFAULT_RESULT_TYPE,
    size = DEFAULT_SIZE,
    startDelay = DEFAULT_DELAY,
    duration = DEFAULT_DURATION,
    autoStart = DEFAULT_AUTOSTART,
    placeholder = DEFAULT_PLACEHOLDER,
  } = props;
  const resultLength = useMemo(() => result.length, [result]);
  const getRandomValue = useCallback((): string => {
    if (resultType === 'DIGIT') return Math.floor(Math.random() * 10).toString();
    if (resultType === 'TEXT') {
      const isUpperCase = result.length > 0 && result === result.toUpperCase();
      const charCode = Math.floor(Math.random() * 26) + 97; // 97 is 'a' in ASCII
      const letter = String.fromCharCode(charCode);
      return isUpperCase ? letter.toUpperCase() : letter;
    }

    return '';
  }, [result, resultType]);

  const [revealedResults, setRevealedResults] = useState<string[]>(
    Array(resultLength).fill(placeholder)
  );
  const [rollingValues, setRollingValues] = useState<string[]>(Array(resultLength).fill(''));
  const [rollingIntervals, setRollingIntervals] = useState<number[]>([]);
  const [revealTimeouts, setRevealTimeouts] = useState<number[]>([]);

  const startAnimation = useCallback(() => {
    // Reset state
    setRevealedResults(Array(resultLength).fill(null));
    setRollingValues(Array(resultLength).fill(''));
    clearAllTimers();

    // Start rolling
    if (onStart) onStart();

    // Set up rolling intervals
    const intervals: number[] = [];

    for (let i = 0; i < resultLength; i++) {
      const interval = window.setInterval(() => {
        setRollingValues((prev) => {
          const newValues = [...prev];
          newValues[i] = getRandomValue();
          return newValues;
        });
      }, 100);
      intervals.push(interval);
    }
    setRollingIntervals(intervals);

    // Set up reveal timeouts
    const totalDurationInMilliSecond = duration * 1000;
    const revealInterval = Math.floor(totalDurationInMilliSecond / resultLength);
    const timeouts: number[] = [];

    for (let i = 0; i < resultLength; i++) {
      const timeout = window.setTimeout(
        () => {
          setRevealedResults((prev) => {
            const newDigits = [...prev];
            newDigits[i] = result[i];
            return newDigits;
          });

          // Clear the rolling interval for this digit
          if (intervals[i]) window.clearInterval(intervals[i]);

          // If this is the last digit, finish animation
          if (i === resultLength - 1) {
            window.setTimeout(() => {
              if (onSuccess) onSuccess();
            }, 500);
          }
        },
        startDelay * 1000 + (i + 1) * revealInterval
      );

      timeouts.push(timeout);
    }
    setRevealTimeouts(timeouts);
  }, [result, resultLength, duration, onStart, onSuccess, getRandomValue, startDelay]);

  const clearAllTimers = useCallback(() => {
    rollingIntervals.forEach((interval) => window.clearInterval(interval));
    revealTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, [rollingIntervals, revealTimeouts]);

  const renderItem = (value: string) => {
    if (render) return render(value);

    return <span className={sizes[size].fontSize}>{value}</span>;
  };

  useEffect(() => {
    return clearAllTimers;
  }, [clearAllTimers]);

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
  }, [autoStart, startAnimation]);

  useImperativeHandle(ref, () => ({
    start: startAnimation,
  }));

  const containerClass = useMemo(() => cx('w-full flex justify-center', className), [className]);
  const itemClass = useMemo(() => cx(sizes[size].container, itemClassName), [size, itemClassName]);

  return (
    <div className={containerClass}>
      {Array(resultLength)
        .fill('')
        .map((_, index) => (
          <span
            key={index}
            className={itemClass}
          >
            {renderItem(
              revealedResults[index] !== null ? revealedResults[index] : rollingValues[index]
            )}
          </span>
        ))}
    </div>
  );
});

export default RollingWheel;
