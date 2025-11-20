import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { AppWindow } from 'lucide-react';

const Apps: React.FC = () => {
  const { dailyStats, fetchStats } = useAppStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const getAppDisplayName = (processName: string) => {
    const appNameMap: { [key: string]: string } = {
      'chrome.exe': 'Google Chrome',
      'firefox.exe': 'Mozilla Firefox',
      'msedge.exe': 'Microsoft Edge',
      'opera.exe': 'Opera',
      'safari.exe': 'Safari',
      'brave.exe': 'Brave',
      'vivaldi.exe': 'Vivaldi',
      'code.exe': 'Visual Studio Code',
      'notepad++.exe': 'Notepad++',
      'notepad.exe': 'Notepad',
      'word.exe': 'Microsoft Word',
      'excel.exe': 'Microsoft Excel',
      'powerpnt.exe': 'Microsoft PowerPoint',
      'outlook.exe': 'Microsoft Outlook',
      'teams.exe': 'Microsoft Teams',
      'slack.exe': 'Slack',
      'discord.exe': 'Discord',
      'zoom.exe': 'Zoom',
      'spotify.exe': 'Spotify',
      'vlc.exe': 'VLC Media Player',
      'photoshop.exe': 'Adobe Photoshop',
      'illustrator.exe': 'Adobe Illustrator',
      'premiere.exe': 'Adobe Premiere Pro',
      'aftereffects.exe': 'Adobe After Effects',
      'vscode.exe': 'Visual Studio Code',
      'sublime_text.exe': 'Sublime Text',
      'atom.exe': 'Atom',
      'pycharm.exe': 'PyCharm',
      'webstorm.exe': 'WebStorm',
      'intellij.exe': 'IntelliJ IDEA',
      'eclipse.exe': 'Eclipse',
      'netbeans.exe': 'NetBeans',
      'filezilla.exe': 'FileZilla',
      'putty.exe': 'PuTTY',
      'winrar.exe': 'WinRAR',
      '7z.exe': '7-Zip',
      'steam.exe': 'Steam',
      'epicgameslauncher.exe': 'Epic Games Launcher',
      'origin.exe': 'Origin',
      'uplay.exe': 'Ubisoft Connect',
      'battle.net.exe': 'Battle.net',
      'riotclient.exe': 'Riot Client',
      'minecraft.exe': 'Minecraft',
      'fortnite.exe': 'Fortnite',
      'csgo.exe': 'Counter-Strike: Global Offensive',
      'valorant.exe': 'Valorant',
      'leagueoflegends.exe': 'League of Legends',
      'dota2.exe': 'Dota 2',
      'overwatch.exe': 'Overwatch',
      'wow.exe': 'World of Warcraft',
      'firefox': 'Mozilla Firefox',
      'chrome': 'Google Chrome',
      'code': 'Visual Studio Code',
      'spotify': 'Spotify',
      'slack': 'Slack',
      'discord': 'Discord',
      'zoom': 'Zoom',
      'steam': 'Steam',
    };

    // Remove .exe extension for lookup
    const baseName = processName.toLowerCase().replace(/\.exe$/, '');
    return appNameMap[baseName] || appNameMap[processName.toLowerCase()] || processName;
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Applications</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed usage stats per application</p>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Application</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-right">Duration</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-right">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {dailyStats.map((app, index) => {
                const totalTime = dailyStats.reduce((acc, curr) => acc + curr.total_duration, 0);
                const percentage = totalTime > 0 ? (app.total_duration / totalTime) * 100 : 0;
                
                return (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                          <AppWindow className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{getAppDisplayName(app.process_name)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300 font-mono">
                      {formatDuration(app.total_duration)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400 w-12">{percentage.toFixed(1)}%</span>
                        <div className="w-24 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {dailyStats.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    No usage data available for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Apps;
