import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
    const elRef = useRef(null) // Container to give ourself the same render every single time
    if (!elRef.current){
        // create an empty div
        elRef.current = document.createElement('div'); 
    }

    useEffect(() => {
        // useEffect will run once to 
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elRef.current);
        
        // Removes the modal after rendering (Unmounts the component to avoid infinite divs in the Modal Portal)
        return () => modalRoot.removeChild(elRef.current)
    }, []);

    return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;