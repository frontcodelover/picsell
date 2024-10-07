export interface BioProfilProps {
  username: string;
  image_url: string;
  banner_url: string;
  bio_html: string;
  user_id: string; // On récupère aussi le user_id du photographe
  photos: any[]; // Ajuster le type des photos si nécessaire
  onBioUpdate: (newBio: string) => void;
}
