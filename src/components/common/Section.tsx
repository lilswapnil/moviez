import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', ...props }) => (
  <section className={className} {...props}>
    {children}
  </section>
);

export default Section;
