import { useState, useCallback, useEffect } from "react";
import "./ModalBurgerWindow.scss";

const ModalBurgerWindow = ({ show, onClose, type = "contacts", scrollToTop, scrollToBlock }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, handleKeyDown]);

  const handleMenuClick = (action) => {
    action();
    onClose();
  };

  if (!show && !isVisible) return null;

  return (
    <div className={`modal-menu-backdrop ${show ? "show" : ""}`} onClick={onClose}>
      <div className='modal-menu-content' onClick={(e) => e.stopPropagation()}>
        {type === "burger" && (
          <>
            <a onClick={() => handleMenuClick(scrollToTop)}>Обо мне</a>
            <a onClick={() => handleMenuClick(() => scrollToBlock(750))}>Компетенции</a>
            <a onClick={() => handleMenuClick(() => scrollToBlock(1500))}>Портфолио</a>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalBurgerWindow;
