"use client";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * TextShimmer (Poin 6: Magic UI inspired micro-effect)
 * A soft, organic gradient light sweep across text accents.
 */
export default function TextShimmer({
  children,
  className = "",
  duration = 3.5,
}: TextShimmerProps) {
  return (
    <span
      className={`text-shimmer ${className}`}
      style={{ animationDuration: `${duration}s` }}
    >
      {children}
    </span>
  );
}
