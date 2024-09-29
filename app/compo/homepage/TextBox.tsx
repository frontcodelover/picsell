import React from 'react';

type TextBoxProps = {
  text: string; // Prop 'text' de type string
  style?: string; // Prop 'style' de type string
};

const TextBox = ({ text, style }: TextBoxProps) => {
  return <div className={style}>{text}</div>;
};

export default TextBox;
