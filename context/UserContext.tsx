import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { User } from '@/types/auth';
import { UserProviderProps } from '@/types/context';

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUserId = localStorage.getItem('currentUserId');
      if (!currentUserId) {
        console.warn('No user ID found in localStorage.');
        setLoading(false);
        return;
      }

      const { data: profile, error } = await supabase.from('users').select('*').eq('id', currentUserId);

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (profile && profile.length > 0) {
        setUser({
          id: profile[0].id,
          name: profile[0].name,
          firstname: profile[0].firstname,
          username: profile[0].username,
          email: profile[0].email,
          address: profile[0].address,
          zipcode: profile[0].zipcode,
          city: profile[0].city,
          country: profile[0].country,
          is_seller: profile[0].is_seller,
          is_buyer: profile[0].is_buyer,
          bio: profile[0].bio,
          avatar_url: profile[0].avatar_url,
          instagram: profile[0].instagram,
          awards: profile[0].awards,
          banner_url: profile[0].banner_url,
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
