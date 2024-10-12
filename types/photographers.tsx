export interface Photo {
  id: number;
  title: string;
  image_url: string;
  width: number;
  height: number;
	price: number;
	user: any;
}

export interface PhotosProps {
  photos: Photo[];
}