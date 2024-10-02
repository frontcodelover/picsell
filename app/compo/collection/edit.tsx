import React, { useState } from 'react';
import { supabase } from '@/lib/initSupabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; 
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import { LuPencil } from 'react-icons/lu';

const EditCollection = ({ collectionId, collectionTitle, collectionDescription, onUpdate }) => {
  const { t } = useUserAndTranslation();
  const [title, setTitle] = useState(collectionTitle);
  const [description, setDescription] = useState(collectionDescription);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

  // Fonction pour mettre à jour la collection dans la base de données
  const handleEdit = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('collections')
      .update({ title, description })
      .eq('id', collectionId);

    setLoading(false);
    if (error) {
			console.error('Erreur lors de la mise à jour de la collection :', error);
			setMessage(t('collections.errorupdating'));
    } else {
      onUpdate(collectionId, title, description); // Callback pour mettre à jour la liste dans le parent
			setMessage(t('collections.collectionupdated'));
		}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-white text-foreground border hover:bg-primary hover:text-white'><LuPencil /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('collections.editcollection')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('collections.collectionname')}
            disabled={loading}
          />
          <Textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('collections.collectiondescription')}
            disabled={loading}
          />
          <Button onClick={handleEdit} disabled={loading}>
            {loading ? t('collections.saving') : t('collections.savechanges')}
					</Button>
					{message && <p className='text-primary'>{message}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollection;
