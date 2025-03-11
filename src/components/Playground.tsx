import { useState } from 'react';

import { type ResultType, sizes } from '@/utils/constants';

import RollingWheel from './RollingWheel';

const Playground = () => {
  const [result, setResult] = useState('DEFAULT');
  const [duration, setDuration] = useState(60);
  const [delay, setDelay] = useState(0);
  const [size, setSize] = useState<keyof typeof sizes>('small');
  const [resultType, setResultType] = useState<ResultType>('TEXT');

  return (
    <div className="p-4 bg-slate-500/20 w-full h-dvh overflow-hidden">
      <div className="flex flex-col justify-center items-center w-4/5 mx-auto text-center gap-5">
        <h1 className="text-2xl font-extrabold tracking-widest uppercase">Default Component</h1>
        <div className="border border-slate-800 rounded p-3 w-3/5">
          <RollingWheel
            result={result}
            resultType={resultType}
            duration={duration}
            size={size}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="font-bold text-left">Props</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-start">
              <p>
                <small>Result</small>
              </p>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="bg-slate-50 border border-slate-800 rounded px-2 py-1 tracking-wider"
              />
            </div>
            <div className="flex flex-col items-start">
              <p>
                <small>Total Duration in Second</small>
              </p>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="bg-slate-50 border border-slate-800 rounded px-2 py-1 tracking-wider"
              />
            </div>
            <div className="flex flex-col items-start">
              <p>
                <small>Start Delay in Second</small>
              </p>
              <input
                type="number"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="bg-slate-50 border border-slate-800 rounded px-2 py-1 tracking-wider"
              />
            </div>
            <div className="flex flex-col items-start">
              <p>
                <small>Result Type</small>
              </p>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="resultType"
                  value="TEXT"
                  checked={resultType === 'TEXT'}
                  onChange={() => setResultType('TEXT')}
                  className="form-radio"
                />
                <span>Text</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="resultType"
                  value="DIGIT"
                  checked={resultType === 'DIGIT'}
                  onChange={() => setResultType('DIGIT')}
                />
                <span>Digit</span>
              </label>
            </div>
            <div className="flex flex-col items-start">
              <p>
                <small>Size</small>
              </p>
              {Object.keys(sizes).map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="size"
                    value={item}
                    checked={size === item}
                    onChange={() => setSize(item as keyof typeof sizes)}
                  />
                  <span className="capitalize">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="font-bold text-left">FAQ</p>
          <div className="col-span-3 text-left flex flex-col gap-2">
            <p>Can I control the start from the container?</p>
            <pre className="p-2 rounded border border-slate-700 bg-slate-400/20">
              <code className="w-full h-full text-sm">
                {`// Import the ref interface
import type { RollingWheelRef } from 'rolling-wheel';

// Create the ref
const ref = useRef<RollingWheelRef>(null);

// Use it on the component
<RollingWheel
  ref={ref}
  {...otherProps}
/>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
