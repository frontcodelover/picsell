import React from 'react';
import { useUser } from '@/context/UserContext';
import EditBioPage from '@/components/photographer/editBioPage';

const edit = () => {
  const authUser = useUser();

  return <EditBioPage user={authUser} />;
};

export default edit;
