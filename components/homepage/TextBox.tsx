import React from 'react';
import { TextBoxProps } from '@/types/layout';

const TextBox = ({ text, style }: TextBoxProps) => {
  return <div className={style}>{text}</div>;
};

export default TextBox;
