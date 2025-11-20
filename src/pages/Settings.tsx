import React, { useEffect, useState } from 'react';
import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';
import { Power, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const [autostartEnabled, setAutostartEnabled] = useState(false);

  const checkAutostart = async () => {
    try {
      const active = await isEnabled();
      setAutostartEnabled(active);
    } catch (error) {
      console.error('Failed to check autostart:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAutostart();
  }, []);

  const toggleAutostart = async () => {
    try {
      if (autostartEnabled) {
        await disable();
      } else {
        await enable();
      }
      setAutostartEnabled(!autostartEnabled);
    } catch (error) {
      console.error('Failed to toggle autostart:', error);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage application preferences</p>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Autostart</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Launch UsagePilot automatically when Windows starts</p>
            </div>
          </div>
          <button
            onClick={toggleAutostart}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              autostartEnabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autostartEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Clear Data</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Delete all usage history permanently</p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            onClick={() => alert('Not implemented yet')}
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
