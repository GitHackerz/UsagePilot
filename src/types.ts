export interface AppUsage {
  process_name: string;
  total_duration: number;
}

export interface AppState {
  isTracking: boolean;
  dailyStats: AppUsage[];
  theme: 'light' | 'dark';
  toggleTracking: () => Promise<void>;
  fetchStats: () => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => void;
}
