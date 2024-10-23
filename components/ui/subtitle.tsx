import React from 'react';

type SubtitleProps = {
  text: string;
  size: string;
};

export const Subtitle = ({ text, size }: SubtitleProps) => {
  return <h3 className={`text-${size}`}>{text}</h3>;
};
