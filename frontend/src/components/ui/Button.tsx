import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  primary?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type = 'button', primary = false, onClick, children }) => (
  <button
    type={type}
    onClick={onClick}
    className={ounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 }
  >
    {children}
  </button>
);