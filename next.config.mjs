/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr'],     // Langues disponibles
    defaultLocale: 'fr',        // Langue par défaut
    localeDetection: false,     // Désactive la détection de la langue pour tester
  },
};

export default nextConfig;
