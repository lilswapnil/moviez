import React from 'react';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className = '', ...props }) => (
  <header className={className} {...props}>
    {children}
  </header>
);

export default Header;
