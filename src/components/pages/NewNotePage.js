import React from 'react';
import SolanaNoteCreator from './SolanaNoteCreator';

const NewNotePage = () => {
  return (
    <div>
      <h1>Create a Note</h1>
      <SolanaNoteCreator programId="your_program_id_here" />
    </div>
  );
};

export default NewNotePage;
