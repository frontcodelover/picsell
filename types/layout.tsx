import { ReactNode } from 'react';

export interface CollectionLayoutProps {
  children: ReactNode;
}

export interface ProfileLayoutProps {
  children: ReactNode;
}

export type TextBoxProps = {
  text: string; // Prop 'text' de type string
  style?: string; // Prop 'style' de type string
};
