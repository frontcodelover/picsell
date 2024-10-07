export interface Photo {
  id: number;
  title: string;
  image_url: string;
  width: number;
  height: number;
  prix: number;
}

export interface PhotosProps {
  photos: Photo[];
}