import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const baseClasses = 'rounded-2xl border-2 border-gray-300 bg-white shadow-lg transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02] hover:border-blue-400' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};