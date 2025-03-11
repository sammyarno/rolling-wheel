import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import HelloWorld from '@/components/HelloWorld';

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <HelloWorld name="Developer" />
  </StrictMode>
);
