"use client";

interface ZoomControlsProps {
  currentScale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onScaleChange: (scale: number) => void;
}

export default function ZoomControls({
  currentScale,
  onZoomIn,
  onZoomOut,
  onReset,
  onScaleChange,
}: ZoomControlsProps) {
  return (
    <div className="px-4 py-2 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onZoomOut();
        }}
        disabled={currentScale <= 0.5}
        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        title="축소"
      >
        <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <div className="flex items-center gap-2 min-w-[80px] justify-center">
        <span className="text-gray-900 dark:text-white text-sm font-medium">
          {Math.round(currentScale * 100)}%
        </span>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onZoomIn();
        }}
        disabled={currentScale >= 3.0}
        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        title="확대"
      >
        <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
      
      <input
        type="range"
        min="0.5"
        max="3"
        step="0.05"
        value={currentScale}
        onChange={(e) => {
          e.stopPropagation();
          const newValue = parseFloat(e.target.value);
          onScaleChange(newValue);
        }}
        className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((currentScale - 0.5) / 2.5) * 100}%, #e5e7eb ${((currentScale - 0.5) / 2.5) * 100}%, #e5e7eb 100%)`
        }}
      />
      
      {currentScale !== 1.0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="ml-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
          title="100%로 리셋"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}
    </div>
  );
}

