import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50',
        variant === 'primary' && 'bg-cyan-500 hover:bg-cyan-600 text-white',
        variant === 'secondary' && 'bg-gray-800 hover:bg-gray-700 text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}