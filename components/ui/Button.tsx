import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: &apos;primary&apos; | &apos;secondary&apos; | &apos;outline&apos; | &apos;ghost&apos;;
  size?: &apos;sm&apos; | &apos;md&apos; | &apos;lg;
  children: React.ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = &apos;primary&apos;,
  size = &apos;md&apos;,
  children,
  isLoading = false,
  className = &apos;&apos;,
  disabled,
  asChild = false,
  ...props
}) => {
  const baseClasses = &apos;inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed&apos;;
  
  const variants = {
    primary: &apos;bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl&apos;,
    secondary: &apos;bg-gray-100 text-gray-900 hover:bg-gray-200&apos;,
    outline: &apos;border border-gray-300 text-gray-700 hover:bg-gray-50&apos;,
    ghost: &apos;text-gray-700 hover:bg-gray-100&apos;
  };
  
  const sizes = {
    sm: &apos;px-3 py-2 text-sm&apos;,
    md: &apos;px-6 py-3 text-base&apos;,
    lg: &apos;px-8 py-4 text-lg
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const buttonContent = isLoading ? (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span>Chargement...</span>
    </div>
  ) : (
    children
  );

  if (asChild) {
    return (
      <div className={classes}>
        {buttonContent}
      </div>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {buttonContent}
    </button>
  );
};