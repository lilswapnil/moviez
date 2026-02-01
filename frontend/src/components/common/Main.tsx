import React from 'react';

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Main: React.FC<MainProps> = ({ children, className = '', ...props }) => (
  <main className={`max-w-6xl mx-auto ${className}`} {...props}>
    {children}
  </main>
);

export default Main;
