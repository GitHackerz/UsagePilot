import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';
import { AppState } from '../types';

// Mock data for web preview
const MOCK_STATS = [
  { process_name: 'Code.exe', total_duration: 3600 },
  { process_name: 'chrome.exe', total_duration: 1800 },
  { process_name: 'spotify.exe', total_duration: 900 },
  { process_name: 'explorer.exe', total_duration: 300 },
];

// Detect system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Get initial theme from localStorage or system
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) return savedTheme;
    return getSystemTheme();
  }
  return 'light';
};

export const useAppStore = create<AppState>((set, get) => ({
  isTracking: true, // Default to true
  dailyStats: [],
  theme: getInitialTheme(),
  toggleTracking: async () => {
    const { isTracking } = get();
    try {
      if (isTracking) {
        await invoke('stop_tracker');
      } else {
        await invoke('start_tracker');
      }
      set({ isTracking: !isTracking });
    } catch (error) {
      console.warn('Tracking toggle failed (likely in browser), toggling UI state only.');
      set({ isTracking: !isTracking });
    }
  },
  fetchStats: async () => {
    try {
      const stats = await invoke<[string, number][]>('get_daily_stats_command');
      // Map tuple to object
      const formattedStats = stats.map(([process_name, total_duration]) => ({
        process_name,
        total_duration,
      }));
      set({ dailyStats: formattedStats });
    } catch (error) {
      console.warn('Failed to fetch stats (likely in browser), using mock data.');
      set({ dailyStats: MOCK_STATS });
    }
  },
  setTheme: (theme) => {
    set({ theme });
    // Persist theme preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));

// Apply initial theme on store creation
if (typeof window !== 'undefined') {
  const initialTheme = getInitialTheme();
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    // Only auto-switch if user hasn't set a preference
    if (!savedTheme) {
      const newTheme = e.matches ? 'dark' : 'light';
      useAppStore.getState().setTheme(newTheme);
    }
  });
}
