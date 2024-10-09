export interface DisplayPageProps {
  username: string;
  bio: string;
  image_url: string;
  banner_url: string;
  user_id: string; // Ajouter user_id dans les props
  onBioUpdate: (newBio: string) => void; // Ajouter une fonction pour mettre à jour la bio
  photos: {
    id: number;
    title: string;
    image_url: string;
    width: number;
    height: number;
    prix: number;
  }[];
}