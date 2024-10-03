import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BioProfil from '@/app/compo/photographer/bioprofil';

const DisplayPage = () => {
  const router = useRouter();
  const { username } = router.query;
  console.log(username);

  return (
    <>
      <BioProfil username={username} />
    </>
  );
};

export default DisplayPage;
