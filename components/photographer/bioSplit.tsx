import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { User } from '@/types/user';

const BioSplit = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const splitBioAtPeriod = (bio: string | undefined) => {
    if (!bio) return ['', ''];
    const middle = Math.floor(bio.length / 2.5);
    const secondHalf = bio.slice(middle);
    const firstPeriodIndex = secondHalf.indexOf('.');
    if (firstPeriodIndex === -1) return [bio.slice(0, middle), bio.slice(middle)];
    const cutIndex = middle + firstPeriodIndex + 1;
    return [bio.slice(0, cutIndex), bio.slice(cutIndex)];
  };

  const [firstHalf, secondHalf] = splitBioAtPeriod(user?.bio);

  return (
    <>
      {user.bio ? (
        <>
          {[firstHalf, secondHalf].map((chunk, index) => (
            <div key={index} className='p-4'>
              <div dangerouslySetInnerHTML={{ __html: chunk }} />
            </div>
          ))}
        </>
      ) : (
        <div className='p-4'>{t('photographerspage.nobio')}</div>
      )}
    </>
  );
};
export default BioSplit;
