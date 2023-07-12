import { useState } from "react";

export const useModal = (initialState = false) => {
  const [modal, setModal] = useState(initialState);

  const showModal = () => {
    setModal(!modal);
  };

  return { showModal: modal, setShowModal: showModal };
};
