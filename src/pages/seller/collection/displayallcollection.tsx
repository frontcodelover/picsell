import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import DeleteCollection from '@/app/compo/collection/delete';
import EditCollection from '@/app/compo/collection/edit';

interface Collection {
  id: string;
  title: string;
  description: string;
}

interface DisplayCollectionsForUserProps {
  allCollections: Collection[];
  onDelete: (id: string) => void;
	onUpdate: (id: string, title: string, description: string) => void;
	handleClick: (id: string) => void;
}

const DisplayCollectionsForUser: React.FC<DisplayCollectionsForUserProps> = ({ allCollections, onDelete, onUpdate,handleClick }) => {
  const { t } = useUserAndTranslation();

  return (
    <div className='grid gap-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px] font-bold'>{t('collections.title')}</TableHead>
            <TableHead className='font-bold'>{t('collections.description')}</TableHead>
            <TableHead className='text-right font-bold'>{t('collections.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCollections.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className='text-center'>
                {t('collections.nocollection')}
              </TableCell>
            </TableRow>
          ) : (
            allCollections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell className='font-medium'>{collection.title}</TableCell>
                <TableCell>{collection.description}</TableCell>
                <TableCell className='text-right'>
									<div className='flex justify-end space-x-1'>
									<button onClick={() => handleClick(collection.id)}>
                Voir la collection
              </button>
                    <DeleteCollection collectionId={collection.id} collectionTitle={collection.title} onDelete={onDelete} />
                    <EditCollection collectionId={collection.id} collectionTitle={collection.title} collectionDescription={collection.description} onUpdate={onUpdate} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayCollectionsForUser;
