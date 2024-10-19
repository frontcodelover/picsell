import '@testing-library/jest-dom';

jest.mock('@/images/logo.jpg', () => ({
  __esModule: true,
  default: '/img.jpg', // Spécifie le chemin correct du logo
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Simule la fonction t pour retourner la clé
    i18n: {
      changeLanguage: jest.fn(), // Simule changeLanguage
    },
  }),
}));

jest.mock('./lib/initSupabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(), // Moquer l'appel à `unsubscribe`
          },
        },
      })),
    },
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));
