import React from 'react';
import ProfileLayout from './layout';  // Vérifie que le bon layout est importé
import { useUser } from '@/lib/context/UserContext';

const Security = () => {
  const user = useUser();
  console.log('usercontexte in Security:', user); // Ceci devrait afficher des logs si le contexte fonctionne

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  return (
    <ProfileLayout>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          Email : {user.email ? user.email : 'Email non disponible'}
          <br />
          Nom : {user.name ? user.name : 'Nom non renseigné'}
        </div>
      </main>
    </ProfileLayout>
  );
};

export default Security;
