export interface User {
	id: string;
  bio: string;
	username: string;
	avatar_url?: string;
	banner_url?: string;
	is_seller?: boolean;
	is_buyer?: boolean;
	email?: string;
	address?: string;
	zipcode?: number;
	city?: string;
	country?: string;
	instagram?: string;
	awards?: string;
}