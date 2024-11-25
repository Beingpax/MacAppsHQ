import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative inline-flex h-9 w-16 items-center justify-center rounded-full
        bg-gradient-to-br from-gray-100 to-gray-200 
        dark:from-gray-700 dark:to-gray-800
        border border-gray-200 dark:border-gray-600/50
        transition-colors duration-300
        hover:from-gray-200 hover:to-gray-300
        dark:hover:from-gray-600 dark:hover:to-gray-700"
      aria-label="Toggle theme"
    >
      {/* Track */}
      <div className="absolute inset-1.5 rounded-full bg-white dark:bg-gray-800
        shadow-inner dark:shadow-gray-950/50"></div>

      {/* Sliding circle with icons */}
      <div className={`absolute h-7 w-7 rounded-full 
        transform transition-transform duration-300
        ${theme === 'dark' ? 'translate-x-3.5' : '-translate-x-3.5'}
        bg-gradient-to-br from-primary to-primary/90
        dark:from-primary-light dark:to-primary
        shadow-lg shadow-primary/20 dark:shadow-primary/30
        flex items-center justify-center
        `}
      >
        {/* Sun icon */}
        <svg 
          className={`w-4 h-4 text-white absolute transition-all duration-300 
            ${theme === 'light' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" 
          />
        </svg>

        {/* Moon icon */}
        <svg 
          className={`w-4 h-4 text-white absolute transition-all duration-300
            ${theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      </div>

      {/* Subtle highlight effects */}
      <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 blur"></div>
      </div>
    </button>
  );
}