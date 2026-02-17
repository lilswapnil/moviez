'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SavedTitlesSection from '@/components/sections/SavedTitlesSection';
import Main from '@/components/common/Main';
import Header from '@/components/common/Header';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollControls from '@/components/common/ScrollControls';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import PosterCard from '@/components/common/PosterCard';
import useHorizontalScroll from '@/lib/hooks/useHorizontalScroll';
import { getImageUrl } from '@/lib/api/tmdb-client';
import { getTitleUrl } from '@/lib/utils/url';

// Accept params prop for Next.js App Router type compatibility
import type { SavedTitle } from '@/lib/hooks/useSavedTitles';
import type { RecommendationResult } from '@/lib/recommendations/tmdb-recommender';
type AccountPageProps = { params?: Record<string, unknown> };
export default function Account({}: AccountPageProps) {
  const [greeting] = useState('Good Evening'); // setGreeting unused
  const [userName, setUserName] = useState('Scott');
  const [isGuest, setIsGuest] = useState(false);
  const [savedTitles, setSavedTitles] = useState<SavedTitle[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    // Only update state if needed
    const userIsGuest = localStorage.getItem('isGuest') === 'true';
    if (isGuest !== userIsGuest) setIsGuest(userIsGuest);
    if (userIsGuest && userName !== 'Guest') setUserName('Guest');

    // Load saved titles from localStorage
    const saved = localStorage.getItem('savedTitles');
    if (saved) {
      setSavedTitles(JSON.parse(saved));
    }
    setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isActive = true;

    const buildPrompt = (titles: SavedTitle[]) => {
      if (titles.length === 0) {
        return 'popular action adventure sci-fi';
      }

      const quoted = titles
        .slice(0, 5)
        .map((title) => `"${title.title}"`)
        .join(' ');
      return `Similar to ${quoted}`;
    };

    const determineType = (titles: SavedTitle[]): 'movie' | 'show' => {
      if (titles.length === 0) return 'movie';
      const movieCount = titles.filter((title) => title.type === 'movie').length;
      return movieCount >= titles.length - movieCount ? 'movie' : 'show';
    };

    const loadRecommendations = async () => {
      setRecommendationsLoading(true);
      setRecommendationsError(null);
      try {
        const res = await fetch('/api/v1/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: buildPrompt(savedTitles),
            type: determineType(savedTitles),
            limit: 12,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to load recommendations');
        }

        const data = (await res.json()) as { recommendations?: RecommendationResult[] };
        if (isActive) {
          const savedIds = new Set(savedTitles.map((title) => title.id));
          const next = Array.isArray(data.recommendations) ? data.recommendations : [];
          setRecommendations(next.filter((item) => !savedIds.has(item.id)));
        }
      } catch (error) {
        console.error('Recommendations error:', error);
        if (isActive) {
          setRecommendationsError('Unable to load recommendations right now.');
        }
      } finally {
        if (isActive) {
          setRecommendationsLoading(false);
        }
      }
    };

    void loadRecommendations();

    return () => {
      isActive = false;
    };
  }, [savedTitles]);

  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll({
    itemWidth: 190,
    gap: 16,
    deps: [recommendations.length],
  });

  return (
    <div className="mt-4 px-12 py-16">
      <Main className="space-y-12">
        {/* Greeting */}
        <Header className="mb-4">
          <h1 className="text-4xl font-bold text-white mb-2">{greeting}, {userName}!</h1>
          <p className="text-gray-300">Manage your account and preferences</p>
        </Header>

        {/* User Profile Card */}
        <Card variant="elevatedHover" radius="xl" className="p-6">
          <div className="flex items-start gap-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${
              userName === 'Guest' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <span className="text-4xl font-bold">{userName[0].toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{userName}</h2>
              {userName !== 'Guest' ? (
                <>
                  <p className="text-gray-400 mb-2">bijprnh5hmq@privaterelay.appleid.com</p>
                  <p className="text-gray-400 mb-4">1 followers</p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 mb-4">Guest user • No account linked</p>
                  <Button href="/signup" variant="gradient" size="sm" className="mt-2">
                    Create Account
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Saved Titles Section */}
        <Section>
          <SavedTitlesSection titles={savedTitles} />
        </Section>

        {/* Mood Trend Section - REMOVED */}
        {/* Music Player - REMOVED */}

        {/* Recommendations Section */}
        <Section className="py-4">
          <SectionHeader
            title="Recommended For You"
            rightSlot={
              recommendations.length > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Based on your saved titles</span>
                  <ScrollControls
                    onScrollLeft={scrollLeft}
                    onScrollRight={scrollRight}
                    canScrollLeft={canScrollLeft}
                    canScrollRight={canScrollRight}
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400">Based on your saved titles</span>
              )
            }
          />
          {recommendationsLoading ? (
            <div className="text-sm text-gray-400">Loading recommendations...</div>
          ) : recommendationsError ? (
            <div className="text-sm text-red-400">{recommendationsError}</div>
          ) : savedTitles.length === 0 ? (
            <Card variant="default" radius="xl" className="text-center py-12">
              <p className="text-gray-400 mb-2">Browse and save titles to get recommendations</p>
              <p className="text-gray-500 text-sm">We will personalize picks based on what you save.</p>
            </Card>
          ) : recommendations.length === 0 ? (
            <div className="text-sm text-gray-400">Save a few titles to personalize recommendations.</div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex items-start justify-start gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            >
              {recommendations.map((item) => {
                const imageUrl = item.poster_path ? getImageUrl(item.poster_path, 'w500') : null;
                const href = getTitleUrl(item.kind === 'movie' ? 'movies' : 'shows', item.id);

                return (
                  <PosterCard
                    key={`${item.kind}-${item.id}`}
                    href={href}
                    title={item.title}
                    imageUrl={imageUrl}
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 190px"
                    linkClassName="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start"
                    overlayMeta={<span>⭐ {item.vote_average.toFixed(1)}</span>}
                  />
                );
              })}
            </div>
          )}
        </Section>

        {/* Account Details */}
        {isHydrated && !isGuest && (
        <Section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Account Details</h2>
            <span className="text-sm text-gray-400">Your account information</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contact Card */}
            <Card variant="elevatedHover" radius="xl" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">✉️</span>
                <h3 className="text-xl font-semibold text-white">Contact</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Email:</label>
                  <p className="text-white mt-1">bijprnh5hmq@privaterelay.appleid.com</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div>
                    <label className="text-gray-400 text-sm">Profile:</label>
                  </div>
                  <Button
                    type="button"
                    variant="text"
                    size="sm"
                    className="px-0 py-0 text-sm font-medium text-gray-400 hover:text-red-500"
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>

            {/* Settings Card */}
            <Card variant="elevatedHover" radius="xl" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">⚙️</span>
                <h3 className="text-xl font-semibold text-white">Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Country:</label>
                  <p className="text-white mt-1">US</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Type:</label>
                  <p className="text-white mt-1">
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-sm font-medium">
                      Premium
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Filtering:</label>
                  <p className="text-white mt-1">Allowed</p>
                </div>
              </div>
            </Card>
          </div>
        </Section>
        )}
      </Main>
    </div>
  );
}
