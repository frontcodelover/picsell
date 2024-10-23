import React from 'react';

type TitleProps = {
  text: string;
  size: string;
};

export const Title = ({ text, size }: TitleProps) => {
  return <h2 className={`text-${size} font-extrabold tracking-[-.075em] mt-8`}>{text}</h2>;
};
