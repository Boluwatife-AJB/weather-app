import React from 'react';

interface LoadingRingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingRing: React.FC<LoadingRingProps> = ({
  size = 'lg',
  color = 'gray',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const ringClasses = `animate-spin rounded-full border-4 border-solid border-${color}-800 border-t-transparent`;

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
      <div className={`${ringClasses} ${sizeClasses[size]}`} />
    </div>
  );
};

export default LoadingRing;
