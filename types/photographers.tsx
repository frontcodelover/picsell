export interface Photo {
  id: string;
  title: string;
  description: string;
  price: number;
  is_available: boolean;
  photographer_id: string;
  image_url: string;
  number: number;
  paper: string;
  impression: string;
  shipping_delay: number;
  shipping_method: string;
  format: string;
  frame: boolean;
  weight: number;
  slug: string;
}

export interface PhotosProps {
  photos: Photo[];
}

export interface Photographer {
	id: string;
	username: string;
	email: string;
	is_seller: boolean;
	avatar_url: string;
	bio: string;
	website: string;
	instagram: string;
	facebook: string;
	twitter: string;
	pinterest: string;
	linkedin: string;
	youtube: string;
	tiktok: string;
	slug: string;
}