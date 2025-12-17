'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameChartItem, ChartCategory } from '@/types/game';

interface LeaderboardData {
  success: boolean;
  category: ChartCategory;
  timestamp: string;
  count: number;
  data: GameChartItem[];
}

interface UseLeaderboardResult {
  data: GameChartItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useLeaderboard(
  category: ChartCategory = 'top-playing-now',
  refreshInterval: number = 60000 // 1 minute
): UseLeaderboardResult {
  const [data, setData] = useState<GameChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/games?category=${category}&limit=50`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: LeaderboardData = await response.json();
      
      if (!result.success) {
        throw new Error('Failed to fetch data');
      }
      
      setData(result.data);
      setLastUpdated(new Date(result.timestamp));
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
    
    // Set up interval for real-time updates
    const interval = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  };
}
