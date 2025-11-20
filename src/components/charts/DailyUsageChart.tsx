import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AppUsage } from '../../types';

interface DailyUsageChartProps {
  data: AppUsage[];
}

const DailyUsageChart: React.FC<DailyUsageChartProps> = ({ data }) => {
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

  // Transform data to include display names
  const chartData = data.map(item => ({
    ...item,
    display_name: getAppDisplayName(item.process_name)
  }));

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="display_name" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tickFormatter={(val) => formatDuration(val)} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number) => [formatDuration(value), 'Duration']}
          />
          <Bar dataKey="total_duration" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyUsageChart;
