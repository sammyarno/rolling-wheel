import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HelloWorld from '@/components/HelloWorld';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelloWorld name="Developer" />
  </StrictMode>
);