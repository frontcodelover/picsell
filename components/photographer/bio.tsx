import React, { useState } from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation'; // Importer le hook pour l'utilisateur et les traductions
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BioSplit from './bioSplit';
import { User } from '@/types/user';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

// Import de ReactQuill avec désactivation du SSR

const BioProfil = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const authUser = useUser();
  const [profilePic, setProfilePic] = useState(user?.avatar_url);
  const [bannerPic, setBannerPic] = useState(user?.banner_url);

  let bioshorted = user.bio ? user?.bio?.substring(0, 210) + (user?.bio?.length > 210 ? '...' : '') : t('photographerspage.nobio');

  return (
    <div>
      <div className='relative h-80 mb-10'>
        {bannerPic ? (
          <Image src={bannerPic} alt={user.username || 'default-alt-text'} className='object-cover w-full h-80' width={1920} height={1080} />
        ) : (
          <div className='flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700'>
            <svg className='w-10 h-10 text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
              <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
            </svg>
          </div>
        )}
      </div>
      <section className='flex items-center justify-center flex-col gap-8 xl:w-10/12 max-w-full m-auto'>
        <div className='relative w-40 h-40'>
          {profilePic ? (
            <Image src={profilePic} alt={user.username || 'default-alt-text'} className='object-cover w-full h-full rounded-full' width={160} height={160} />
          ) : (
            <div className='flex items-center justify-center w-full h-full rounded-full bg-gray-300 dark:bg-gray-700'>
              <svg className='w-10 h-10 text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
          )}
        </div>
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
              <Link href='#longbio' className='text-sm underline'>
                {t('photographerspage.readmore')}
              </Link>
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