import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';

interface User {
  id: string;
  name: string;
  firstname: string;
  username: string;
  email: string;
  address: string;
  zipcode: number;
  city: string;
  country: string;
	instagram: string;
	is_seller: boolean;
	is_buyer: boolean;
	is_admin: boolean;
}

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUserId = localStorage.getItem('currentUserId');
      console.log('currentUserId in context:', currentUserId); // Log si l'ID est récupéré

      if (!currentUserId) {
        console.warn('No user ID found in localStorage.');
        setLoading(false);
        return;
      }

      const { data: profile, error } = await supabase.from('profiles').select('*').eq('user_id', currentUserId);

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (profile && profile.length > 0) {
        console.log('User profile in context:', profile[0]); // Log les données utilisateur
        setUser({
          id: profile[0].user_id,
          name: profile[0].name,
          firstname: profile[0].firstname,
          username: profile[0].username,
          email: profile[0].email,
          address: profile[0].address,
          zipcode: profile[0].zipcode,
          city: profile[0].city,
          country: profile[0].country,
					instagram: profile[0].instagram,
					is_seller: profile[0].is_seller,
					is_buyer: profile[0].is_buyer,
					is_admin: profile[0].is_admin,
        });
      } else {
        console.warn('No profile found for this user in context.');
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  console.log('User in UserProvider:', user); // Vérifier si les données sont propagées

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
