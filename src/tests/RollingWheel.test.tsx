import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import RollingWheel from '../components/RollingWheel';
import type { RollingWheelRef } from '../components/types';

// Mock timers for animation testing
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RollingWheel Component', () => {
  test('renders with default props', () => {
    render(<RollingWheel result="1234" />);

    // Check that the component renders with the correct number of items
    const items = screen
      .getAllByRole('generic')
      .filter((el) => el.tagName.toLowerCase() === 'span' && el.className.includes('w-full'));
    expect(items).toHaveLength(4);
  });

  test('renders with custom props', () => {
    const customPlaceholder = 'O';
    render(
      <RollingWheel
        result="ABC"
        resultType="TEXT"
        size="large"
        placeholder={customPlaceholder}
      />
    );

    // Check that the component renders with the correct number of items
    const items = screen
      .getAllByRole('generic')
      .filter((el) => el.tagName.toLowerCase() === 'span' && el.className.includes('w-full'));
    expect(items).toHaveLength(3);
  });

  test('starts animation automatically when autoStart is true', () => {
    const onStartMock = vi.fn();

    render(
      <RollingWheel
        result="123"
        autoStart={true}
        onStart={onStartMock}
      />
    );

    // onStart should be called immediately
    expect(onStartMock).toHaveBeenCalledTimes(1);
  });

  test('does not start animation when autoStart is false', () => {
    const onStartMock = vi.fn();

    render(
      <RollingWheel
        result="123"
        autoStart={false}
        onStart={onStartMock}
      />
    );

    // onStart should not be called
    expect(onStartMock).not.toHaveBeenCalled();
  });

  test('can be started programmatically using ref', () => {
    const onStartMock = vi.fn();
    const ref = createRef<RollingWheelRef>();

    render(
      <RollingWheel
        ref={ref}
        result="123"
        autoStart={false}
        onStart={onStartMock}
      />
    );

    // Animation should not start automatically
    expect(onStartMock).not.toHaveBeenCalled();

    // Start animation programmatically
    act(() => {
      ref.current?.start();
    });

    // onStart should be called after manual start
    expect(onStartMock).toHaveBeenCalledTimes(1);
  });

  test('calls onSuccess when animation completes', () => {
    const onSuccessMock = vi.fn();
    const result = '123';

    render(
      <RollingWheel
        result={result}
        duration={1} // Short duration for testing
        onSuccess={onSuccessMock}
      />
    );

    // Fast-forward through the animation
    act(() => {
      vi.advanceTimersByTime(2000); // More than enough time to complete
    });

    // onSuccess should be called after animation completes
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });

  test('restarts animation when result changes', () => {
    const onStartMock = vi.fn();
    const { rerender } = render(
      <RollingWheel
        result="123"
        onStart={onStartMock}
      />
    );

    // onStart should be called once for initial render
    expect(onStartMock).toHaveBeenCalledTimes(1);

    // Change the result prop
    rerender(
      <RollingWheel
        result="456"
        onStart={onStartMock}
      />
    );

    // onStart should be called again after result change
    expect(onStartMock).toHaveBeenCalledTimes(2);
  });

  test('uses custom render function when provided', () => {
    const customRender = (value: string) => <div data-testid="custom-render">{value}</div>;

    render(
      <RollingWheel
        result="123"
        render={customRender}
      />
    );

    // Custom render function should be used
    const customElements = screen.getAllByTestId('custom-render');
    expect(customElements).toHaveLength(3);
  });
});
