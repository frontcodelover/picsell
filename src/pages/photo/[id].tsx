import React from 'react';
import { useRouter } from 'next/router';

const PhotoId = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>{id}</div>;
};

export default PhotoId;
