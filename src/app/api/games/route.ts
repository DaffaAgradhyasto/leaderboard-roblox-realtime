import { NextResponse } from 'next/server';
import { getPopularGames } from '@/lib/roblox-api';
import { ChartCategory } from '@/types/game';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get('category') || 'top-playing-now') as ChartCategory;
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

  try {
    const games = await getPopularGames(category, limit);
    
    return NextResponse.json({
      success: true,
      category,
      timestamp: new Date().toISOString(),
      count: games.length,
      data: games,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      }
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch games data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
