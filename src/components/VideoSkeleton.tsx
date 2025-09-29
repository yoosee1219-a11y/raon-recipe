"use client";

import React from "react";

interface VideoSkeletonProps {
  variant?: "default" | "large" | "compact" | "grid";
  showDetails?: boolean;
  className?: string;
}

export const VideoSkeleton: React.FC<VideoSkeletonProps> = ({
  variant = "default",
  showDetails = true,
  className = "",
}) => {
  const pulseClass = "animate-pulse bg-gray-200";

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-4 p-4 ${className}`}>
        {/* Video thumbnail */}
        <div className={`w-16 h-16 ${pulseClass} rounded-lg flex-shrink-0`} />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className={`h-4 ${pulseClass} rounded mb-2`} />
          <div className={`h-3 ${pulseClass} rounded w-3/4 mb-2`} />
          <div className="flex gap-3">
            <div className={`h-3 ${pulseClass} rounded w-12`} />
            <div className={`h-3 ${pulseClass} rounded w-12`} />
          </div>
        </div>
        
        {/* Action button */}
        <div className={`w-8 h-8 ${pulseClass} rounded-full`} />
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div className={`bg-white rounded-xl overflow-hidden shadow-lg ${className}`}>
        {/* Video area */}
        <div className={`relative h-80 ${pulseClass}`}>
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 ${pulseClass} rounded-full`} />
          </div>
          
          {/* Top badges */}
          <div className="absolute top-4 left-4">
            <div className={`w-20 h-6 ${pulseClass} rounded-full`} />
          </div>
          <div className="absolute top-4 right-4">
            <div className={`w-8 h-8 ${pulseClass} rounded-full`} />
          </div>
          
          {/* Bottom overlay content */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`h-6 ${pulseClass} rounded mb-2`} />
            <div className={`h-4 ${pulseClass} rounded w-3/4`} />
          </div>
        </div>
        
        {showDetails && (
          <div className="p-6">
            {/* Stats row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <div className={`h-4 ${pulseClass} rounded w-16`} />
                <div className={`h-4 ${pulseClass} rounded w-16`} />
              </div>
              <div className={`h-4 ${pulseClass} rounded w-12`} />
            </div>
            
            {/* Tags and difficulty */}
            <div className="flex items-center justify-between">
              <div className={`h-6 ${pulseClass} rounded-full w-16`} />
              <div className="flex gap-2">
                <div className={`h-5 ${pulseClass} rounded-full w-12`} />
                <div className={`h-5 ${pulseClass} rounded-full w-12`} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`bg-white rounded-xl overflow-hidden border border-gray-200 ${className}`}>
        {/* Video thumbnail */}
        <div className={`relative h-48 ${pulseClass}`}>
          {/* Badges */}
          <div className="absolute top-3 left-3">
            <div className={`w-16 h-5 ${pulseClass} rounded-full`} />
          </div>
          <div className="absolute top-3 right-3">
            <div className={`w-8 h-8 ${pulseClass} rounded-full`} />
          </div>
          <div className="absolute bottom-3 right-3">
            <div className={`w-6 h-6 ${pulseClass} rounded-full`} />
          </div>
        </div>
        
        {showDetails && (
          <div className="p-4">
            {/* Title */}
            <div className={`h-5 ${pulseClass} rounded mb-2`} />
            
            {/* Description */}
            <div className={`h-4 ${pulseClass} rounded mb-1`} />
            <div className={`h-4 ${pulseClass} rounded w-2/3 mb-3`} />
            
            {/* Stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-3">
                <div className={`h-4 ${pulseClass} rounded w-12`} />
                <div className={`h-4 ${pulseClass} rounded w-12`} />
              </div>
              <div className={`h-4 ${pulseClass} rounded w-10`} />
            </div>
            
            {/* Tags and difficulty */}
            <div className="flex items-center justify-between">
              <div className={`h-5 ${pulseClass} rounded-full w-12`} />
              <div className="flex gap-1">
                <div className={`h-5 ${pulseClass} rounded-full w-10`} />
                <div className={`h-5 ${pulseClass} rounded-full w-10`} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white rounded-xl overflow-hidden border border-gray-200 ${className}`}>
      {/* Video player area */}
      <div className={`relative h-64 ${pulseClass}`}>
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 ${pulseClass} rounded-full`} />
        </div>
        
        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className={`h-4 ${pulseClass} rounded w-20`} />
            <div className="flex gap-2">
              <div className={`w-8 h-8 ${pulseClass} rounded`} />
              <div className={`w-8 h-8 ${pulseClass} rounded`} />
            </div>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="p-4">
          {/* Recipe title */}
          <div className={`h-6 ${pulseClass} rounded mb-2`} />
          
          {/* Recipe meta info */}
          <div className="flex items-center gap-4 mb-3">
            <div className={`h-4 ${pulseClass} rounded w-16`} />
            <div className={`h-4 ${pulseClass} rounded w-16`} />
            <div className={`h-4 ${pulseClass} rounded w-16`} />
          </div>
          
          {/* Description */}
          <div className={`h-4 ${pulseClass} rounded mb-2`} />
          <div className={`h-4 ${pulseClass} rounded w-4/5 mb-4`} />
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <div className={`h-10 ${pulseClass} rounded flex-1`} />
            <div className={`h-10 ${pulseClass} rounded w-20`} />
            <div className={`h-10 ${pulseClass} rounded w-20`} />
          </div>
        </div>
      )}
    </div>
  );
};

// List skeleton component
export const VideoSkeletonList: React.FC<{
  count?: number;
  variant?: "default" | "large" | "compact" | "grid";
  className?: string;
}> = ({ count = 3, variant = "default", className = "" }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <VideoSkeleton key={index} variant={variant} className="mb-4" />
      ))}
    </div>
  );
};

// Grid skeleton component
export const VideoSkeletonGrid: React.FC<{
  count?: number;
  columns?: number;
  className?: string;
}> = ({ count = 6, columns = 3, className = "" }) => {
  const gridClass = `grid gap-6 ${
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : `grid-cols-${columns}`
  }`;

  return (
    <div className={`${gridClass} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <VideoSkeleton key={index} variant="grid" />
      ))}
    </div>
  );
};

export default VideoSkeleton;
