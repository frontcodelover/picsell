import { supabase } from '@/lib/initSupabase';
import { GetServerSideProps } from 'next';
import BioProfil from '@/components/photographer/bio';
import { useRouter } from 'next/router';
import { User } from '@/types/user';
// composant qui affiche les informations de l'utilisateur

const Photographe = ({ userInfos }: { userInfos: User }) => {
  const router = useRouter();

  if (!userInfos.is_seller) {
    router.push('/');
  }

  return (
    <div>
      <BioProfil user={userInfos} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params!;
  const { data: userInfos, error: photosError } = await supabase.from('users').select('*').eq('username', username).single();

  if (photosError) {
    return { notFound: true };
  }

  return {
    props: {
      userInfos,
    },
  };
};

export default Photographe;
