import React from 'react';

// Skeleton pulse animation base
const Pulse = ({ className = '' }) => (
  <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-lg ${className}`} />
);

// ─── Repo Card Skeleton ─────────────────────────────────────────────────────────
export const RepoCardSkeleton = () => (
  <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
    <div className="flex items-center justify-between">
      <Pulse className="h-4 w-24" />
      <Pulse className="h-5 w-16 rounded-full" />
    </div>
    <Pulse className="h-3 w-full" />
    <Pulse className="h-3 w-4/5" />
    <Pulse className="h-3 w-3/5" />
    <div className="flex items-center gap-2 pt-2">
      <Pulse className="h-5 w-14 rounded-md" />
      <Pulse className="h-5 w-14 rounded-md" />
      <Pulse className="h-5 w-14 rounded-md" />
    </div>
    <div className="flex items-center justify-between pt-2">
      <div className="flex gap-3">
        <Pulse className="h-3 w-10" />
        <Pulse className="h-3 w-10" />
      </div>
      <Pulse className="h-3 w-20" />
    </div>
  </div>
);

// ─── Stats Section Skeleton ─────────────────────────────────────────────────────
export const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
        <Pulse className="h-8 w-16" />
        <Pulse className="h-3 w-24" />
        <Pulse className="h-2 w-16" />
      </div>
    ))}
  </div>
);

// ─── Language Bar Skeleton ──────────────────────────────────────────────────────
export const LangBarSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Pulse className="h-3 w-20" />
        <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <Pulse className="h-3 w-8" />
      </div>
    ))}
  </div>
);

// ─── README Skeleton ────────────────────────────────────────────────────────────
export const ReadmeSkeleton = () => (
  <div className="space-y-3 p-4">
    <Pulse className="h-6 w-48 rounded" />
    <Pulse className="h-3 w-full" />
    <Pulse className="h-3 w-5/6" />
    <Pulse className="h-3 w-4/6" />
    <div className="pt-2">
      <Pulse className="h-5 w-32 rounded mb-3" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-3/4" />
    </div>
    <div className="pt-2">
      <Pulse className="h-5 w-40 rounded mb-3" />
      <Pulse className="h-24 w-full rounded-lg" />
    </div>
  </div>
);
