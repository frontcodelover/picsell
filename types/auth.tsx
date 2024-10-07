export interface User {
  id: string;
  name: string;
  firstname: string;
  username: string;
  email: string;
  address: string;
  zipcode: number;
  city: string;
  country: string;
	is_seller: boolean;
	is_buyer: boolean;
	is_admin: boolean;
}