import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []); // The empty array indicates there are no dependencies
  // Specifying this should make the useEffect run only once each render of Modal

  return createPortal(<div>{children}</div>, elRef.current);
};

// Not trapping focus in the modal. Need to add!
export default Modal;
