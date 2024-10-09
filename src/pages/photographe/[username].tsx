import { supabase } from '@/lib/initSupabase'
import { GetServerSideProps } from 'next'

// composant qui affiche les informations de l'utilisateur

const Photographe = ({ userInfos }: { userInfos: any }) => {
	return (
		<div>
			<h1>Profile</h1>
			<div>Email: {userInfos?.email}</div>
			<div>Id: {userInfos?.id}</div>
			<div>username : {userInfos?.username}</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { username } = context.params!;
	const { data: userInfos, error: photosError } = await supabase.from('users').select('id, email, username').eq('username', username).single();

	if (photosError) {
		return { notFound: true };
	}

	return {
		props: {
			userInfos,
		},
	};
}

export default Photographe;