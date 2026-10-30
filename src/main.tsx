import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Mamdouh Store Caught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 text-center font-['Cairo',sans-serif]">
          <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-900 border border-amber-500/30 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              📱
            </div>
            <h2 className="text-xl font-bold text-white mb-2">متجر ممدوح للموبايلات</h2>
            <p className="text-sm text-neutral-300 mb-4">
              حدث خطأ بسيط أثناء التحميل. اضغط على الزر أدناه لإعادة تشغيل الموقع.
            </p>
            <p className="text-xs text-neutral-500 mb-6 font-mono">
              موقع تجريبي • تم برمجته بواسطة عبد الله
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              إعادة تحميل متجر ممدوح
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

