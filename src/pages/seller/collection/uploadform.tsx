import { useState } from 'react';
import { Card, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


interface UploadFormProps {
  onUpload: (file: File, title: string, description: string) => void;
  loading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [messageLimitCaractere, setMessageLimitCaractere] = useState('');
  const maxTitleLength = 50;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file && title.length <= maxTitleLength) {
      onUpload(file, title, description);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (newTitle.length > maxTitleLength) {
      setMessageLimitCaractere(`Le titre ne doit pas dépasser ${maxTitleLength} caractères.`);
    } else {
      setMessageLimitCaractere(''); // Réinitialise le message si tout va bien
    }

    setTitle(newTitle);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const selectedFile = e.target.files[0];

    // Limiter la taille des fichiers à 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Maximum 5MB.');
      return;
    }
    setFile(selectedFile);
  };

  return (
		<form onSubmit={handleSubmit}>
			<Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
      <div>
        <label>Titre</label>
        <input
          type='text'
          value={title}
          onChange={handleTitleChange} // Appelle handleTitleChange pour vérifier la longueur
          required
        />
      </div>
      {messageLimitCaractere && <p style={{ color: 'red' }}>{messageLimitCaractere}</p>} {/* Affichage en rouge */}
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Photo</label>
        <input type='file' onChange={handleFileChange} required />
      </div>
      <button type='submit' disabled={loading || title.length > maxTitleLength}>
        {loading ? 'Envoi en cours...' : 'Ajouter la photo'}
      </button>
    </form>
  );
};

export default UploadForm;
