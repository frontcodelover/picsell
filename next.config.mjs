/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr'], // Langues disponibles
    defaultLocale: 'fr', // Langue par défaut
    localeDetection: false, // Désactive la détection de la langue
  },
  images: {
    domains: ['dqqwbvtouglhiutfehvr.supabase.co'], // Domaine autorisé pour les images
  },
  reactStrictMode: true, // Mode strict de React activé
};

export default nextConfig;
