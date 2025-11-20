import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import DailyUsageChart from '../components/charts/DailyUsageChart';
import { Clock, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isTracking, dailyStats, fetchStats } = useAppStore();

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, [fetchStats]);

  const totalDuration = dailyStats.reduce((acc, curr) => acc + curr.total_duration, 0);
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your activity today</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
          isTracking ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          {isTracking ? 'Tracking Active' : 'Tracking Paused'}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Time</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatDuration(totalDuration)}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Most Used</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                {dailyStats[0]?.process_name || 'N/A'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Daily Usage</h3>
        <DailyUsageChart data={dailyStats} />
      </div>
    </div>
  );
};

export default Dashboard;
