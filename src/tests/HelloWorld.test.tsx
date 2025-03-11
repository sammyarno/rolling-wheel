import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HelloWorld from '../components/Playground';

describe('HelloWorld Component', () => {
  test('renders with default name', () => {
    render(<HelloWorld />);
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome to the Rolling Wheel component library./i)
    ).toBeInTheDocument();
  });

  test('renders with custom name', () => {
    render(<HelloWorld name="React" />);
    expect(screen.getByText(/Hello, React!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome to the Rolling Wheel component library./i)
    ).toBeInTheDocument();
  });
});
