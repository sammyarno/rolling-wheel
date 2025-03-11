# Rolling Wheel

A React component library with TypeScript and Tailwind CSS that creates an animated rolling/slot machine effect that reveals characters one by one.

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
import { RollingWheel } from 'rolling-wheel';
import 'rolling-wheel/dist/style.css';

// Import styles

function App() {
  return (
    <div>
      <RollingWheel
        result="12345"
        resultType="DIGIT"
        duration={30}
        size="medium"
      />
    </div>
  );
}
```

## Components

### RollingWheel

A component that creates an animated rolling/slot machine effect that reveals characters one by one.

#### Props

| Prop          | Type                           | Default   | Description                                                                                                     |
| ------------- | ------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------- |
| autoStart     | boolean                        | true      | Whether the animation should start automatically when the component mounts or when the result changes           |
| className     | string                         | undefined | Additional CSS class name for the container element                                                             |
| itemClassName | string                         | 'w-full'  | Additional CSS class name for each individual character container                                               |
| onStart       | () => void                     | undefined | Callback function that is called when the animation starts                                                      |
| onSuccess     | () => void                     | undefined | Callback function that is called when the animation completes successfully                                      |
| result        | string                         | 'XXXX'    | The final string to be revealed by the animation. Each character will be revealed one by one                    |
| resultType    | 'DIGIT' \| 'TEXT'              | 'DIGIT'   | The type of characters to display during the rolling animation                                                  |
| size          | 'small' \| 'medium' \| 'large' | 'small'   | The size of the component                                                                                       |
| startDelay    | number                         | 0         | Delay in seconds before the animation starts                                                                    |
| duration      | number                         | 60        | Total duration of the animation in seconds. The time will be divided equally among all characters in the result |
| placeholder   | string \| ReactNode            | 'X'       | Placeholder character or node to display before the animation starts                                            |

#### Controlling the Animation Programmatically

You can control the animation programmatically using a ref:

```jsx
import { useRef } from 'react';
import { RollingWheel, RollingWheelRef } from 'rolling-wheel';

function App() {
  const rollingWheelRef = useRef < RollingWheelRef > null;

  const handleStartAnimation = () => {
    rollingWheelRef.current?.start();
  };

  return (
    <div>
      <RollingWheel
        ref={rollingWheelRef}
        result="12345"
        resultType="DIGIT"
        autoStart={false}
      />
      <button onClick={handleStartAnimation}>Start Animation</button>
    </div>
  );
}
```

## Examples

### Digit Rolling Animation

```jsx
<RollingWheel
  result="12345"
  resultType="DIGIT"
  duration={30}
  size="medium"
/>
```

### Text Rolling Animation

```jsx
<RollingWheel
  result="HELLO"
  resultType="TEXT"
  duration={20}
  size="large"
/>
```

### Custom Styling

```jsx
<RollingWheel
  result="CUSTOM"
  resultType="TEXT"
  className="bg-blue-100 p-4 rounded"
  itemClassName="mx-1 bg-white p-2 rounded shadow"
/>
```

### Custom Item Rendering

```jsx
<RollingWheel
  result="CUSTOM"
  resultType="TEXT"
  render={(value) => <div>{value}</div>}
/>
```

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
