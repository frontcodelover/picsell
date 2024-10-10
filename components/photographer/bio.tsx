import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation'; // Importer le hook pour l'utilisateur et les traductions
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BioSplit from './bioSplit';
import { User } from '@/types/user';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { Button } from '../ui/button';

// Import de ReactQuill avec désactivation du SSR

const BioProfil = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const authUser = useUser();

  let bioshorted = user.bio ? user?.bio?.substring(0, 200) + (user?.bio?.length > 200 ? '...' : '') : t('photographerspage.nobio');

  return (
    <div>
      {/* <img src={banner_url} alt='banner' className='w-full h-60 object-cover mb-6' /> */}
      <section className='flex items-center justify-center flex-col gap-8 xl:w-10/12 max-w-full m-auto'>
        <div>{/* <img src={image_url} alt={username} className='object-cover max-w-40 rounded-full' /> */}</div>
        <div>
          <h1 className='text-3xl font-extrabold uppercase'>{user?.username}</h1>
          {authUser?.id === user?.id ? (
            <div className='py-4 text-center'>
              <Link href={`/photographe/${user.username}/edit`}>
                <Button> {t('photographerspage.edit')}</Button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p className='text-lg text-center'>
            <div dangerouslySetInnerHTML={{ __html: bioshorted }} />
            <span>
              <a href='#longbio' className='font-bold'>
                {t('photographerspage.readmore')}
              </a>
            </span>
          </p>
        </div>

        {/* <Photos photos={photos} /> */}

        <Card id='longbio' className='w-full'>
          <CardHeader className='text-xl uppercase font-extrabold ml-4 mb-[-25px]'>
            {t('photographerspage.about')} {user?.username}
          </CardHeader>
          <CardContent className='w-full'>
            <BioSplit user={user} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default BioProfil;
