import { useRouter } from 'next/router';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/header/header';
import Logo from '@/images/logo.jpg';

// Simuler le hook `useRouter`
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/menu/navigation', () => ({
  Navigation: () => <div>Mocked Navigation</div>,
}));

jest.mock('@/components/menu/userNavigation', () => ({
  UserNavigation: () => <div>Mocked UserNavigation</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

describe('Header', () => {
  // Avant chaque test, simuler un comportement par défaut pour `useRouter`
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),  // Simuler une fonction `push`
      pathname: '/',    // Simuler une route par défaut
    });
  });

  it('renders the logo', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', Logo.src);
  });

  it('renders the Navigation component', () => {
    const { getByText } = render(<Header />);
    const navigation = getByText('Mocked Navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('renders the UserNavigation component', () => {
    const { getByText } = render(<Header />);
    const userNavigation = getByText('Mocked UserNavigation');
    expect(userNavigation).toBeInTheDocument();
  });

  it('renders the Link component with correct href', () => {
    const { getByRole } = render(<Header />);
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
