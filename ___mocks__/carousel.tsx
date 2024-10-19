// __mocks__/carousel.tsx
import React from 'react';

export const Carousel = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const CarouselContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const CarouselItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const CarouselNext = () => <button>Next</button>;
export const CarouselPrevious = () => <button>Previous</button>;
