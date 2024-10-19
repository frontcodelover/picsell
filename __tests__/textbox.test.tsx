import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextBox from '../components/homepage/TextBox';

describe('TextBox Component', () => {
  it('renders the text passed as a prop', () => {
    const { getByText } = render(<TextBox text='Hello, World!' style='test-style' />);
    expect(getByText('Hello, World!')).toBeInTheDocument();
  });

  it('applies the correct style class', () => {
    const { container } = render(<TextBox text='Styled Text' style='test-style' />);
    expect(container.firstChild).toHaveClass('test-style');
  });
});
