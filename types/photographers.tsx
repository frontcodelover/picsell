export interface Photo {
  id: number;
  title: string;
  image_url: string;
  width: number;
  height: number;
	price: number;
	user: any;
	slug: string;
}

export interface PhotosProps {
  photos: Photo[];
}