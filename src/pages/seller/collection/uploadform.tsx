import { useState } from 'react';

const UploadForm = ({ onUpload, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file, title, description);
    }
  };

  const handleFileChange = (e) => {
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
      <div>
        <label>Titre</label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Photo</label>
        <input type='file' onChange={handleFileChange} required />
      </div>
      <button type='submit' disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Ajouter la photo'}
      </button>
    </form>
  );
};

export default UploadForm;
