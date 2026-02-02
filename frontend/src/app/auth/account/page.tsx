'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SavedTitlesSection from '@/components/sections/SavedTitlesSection';
import Main from '@/components/common/Main';
import Header from '@/components/common/Header';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

// Accept params prop for Next.js App Router type compatibility
import type { SavedTitle } from '@/lib/hooks/useSavedTitles';
type AccountPageProps = { params?: Record<string, unknown> };
export default function Account({}: AccountPageProps) {
  const [greeting] = useState('Good Evening'); // setGreeting unused
  const [userName, setUserName] = useState('Scott');
  const [isGuest, setIsGuest] = useState(false);
  const [savedTitles, setSavedTitles] = useState<SavedTitle[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {/* Account Details */}
        {userName !== 'Guest' && (
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

        {/* Mood Trend Section - REMOVED */}
        {/* Music Player - REMOVED */}

        {/* Saved Titles Section */}
        <Section>
          <SavedTitlesSection titles={savedTitles} />
        </Section>
      </Main>
    </div>
  );
}
