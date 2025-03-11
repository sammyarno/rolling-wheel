# Rolling Wheel

A React component library with TypeScript and Tailwind CSS.

## Installation

```bash
npm install rolling-wheel
# or
yarn add rolling-wheel
# or
pnpm add rolling-wheel
```

## Usage

```jsx
import { HelloWorld } from 'rolling-wheel';
import 'rolling-wheel/dist/style.css'; // Import styles

function App() {
  return (
    <div>
      <HelloWorld name="React" />
    </div>
  );
}
```

## Components

### HelloWorld

A simple greeting component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | 'World' | The name to display in the greeting |

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## License

MIT