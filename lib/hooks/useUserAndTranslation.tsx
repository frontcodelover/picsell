import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/initSupabase';

const useUserAndTranslation = () => {
  const { t, i18n } = useTranslation('common'); // Traductions
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true); // Indiquer que le composant est prêt à rendre côté client
      const storageUserId = localStorage.getItem('currentUserId');
      setCurrentUserId(storageUserId);

      // Vérifier la langue actuellement sélectionnée dans localStorage
      const lang = localStorage.getItem('i18nextLng') || 'fr'; // Langue par défaut : français
      i18n.changeLanguage(lang); // Appliquer la langue correcte

      // Écouter les changements d'état d'authentification
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userId = session.user.id;
          localStorage.setItem('currentUserId', userId);
          setCurrentUserId(userId);
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('currentUserId');
          setCurrentUserId(null);
        }
      });

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }
  }, [i18n]);

  return {
    t,               // La fonction de traduction
    currentUserId,    // L'ID de l'utilisateur
    ready,            // Indique si l'état est prêt
  };
};

export default useUserAndTranslation;
