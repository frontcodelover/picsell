import { supabase } from '@/lib/initSupabase'

const Logout = () => {
	const logout = async () => {
		await supabase.auth.signOut()
		window.location.href = '/login'
	}

	return (
		<div onClick={logout}>logout</div>
	)
}

export default Logout