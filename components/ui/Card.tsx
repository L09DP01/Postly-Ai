import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = &apos;&apos;, 
  hover = false 
}) => {
  const baseClasses = &apos;rounded-2xl border-2 border-gray-300 bg-white shadow-lg transition-all duration-200&apos;;
  const hoverClasses = hover ? &apos;hover:shadow-xl hover:scale-[1.02] hover:border-blue-400&apos; : &apos;;
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};