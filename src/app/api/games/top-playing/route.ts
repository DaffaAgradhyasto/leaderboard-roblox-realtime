import { NextResponse } from 'next/server';
import { getTopPlayingGames } from '@/lib/roblox-api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const games = await getTopPlayingGames(limit);

    return NextResponse.json({
      success: true,
      games,
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 60000).toISOString(),
      totalCount: games.length,
      sortType: 'top-playing',
    });
  } catch (error) {
    console.error('Error fetching top playing games:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch top playing games',
        games: [],
        lastUpdated: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
