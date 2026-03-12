import { useState, useCallback, useEffect } from "react";
import Resize from "../Resize";

import "./ModalWindow.scss";

const ModalWindow = ({ show, onClose, type = "contacts" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const isPortrait = Resize();

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

  if (!show && !isVisible) return null;

  return (
    <div className={`modal-backdrop ${show ? "show" : ""}`} onClick={onClose}>
      <div style={{ scale: isPortrait ? "1" : "0.8" }}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className='modal-close-button' aria-label='Close modal' />
          {type === "contacts" && (
            <>
              <h2 style={{ fontSize: "40px" }}>Контакты</h2>
              <p style={{ fontSize: "22px" }}>
                Вы можете написать мне в телеграм или на электронную почту
              </p>
              <div className='social-buttons-container'>
                <a href='https://t.me/andy_glow' target='_blank' className='social-button telegram'>
                  Telegram
                </a>
                <a href='mailto:golding@yandex.ru' className='social-button email'>
                  E-mail
                </a>
              </div>
            </>
          )}

          {type === "todo" && (
            <>
              <div>
                <h2 style={{ fontSize: "28px", textDecoration: "underline" }}>
                  Приложение: Список задач
                </h2>
                <p
                  style={{
                    fontSize: "26px",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}>
                  Технологии:
                </p>
                <div className='tag-container'>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    ReactJS + Хуки / кастомные хуки
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    Использование Local Storage
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    SCSS / CSS-модули
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    React Context
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    Роутинг
                  </div>
                </div>
                <a href='https://andy-glow.github.io/todo-react/' target='_blank' rel='noopener'>
                  <button className='btn'>Перейти на сайт</button>
                </a>
              </div>
            </>
          )}

          {type === "sneakers" && (
            <>
              <div>
                <h2 style={{ fontSize: "28px", textDecoration: "underline" }}>
                  Приложение: Кроссовки
                </h2>
                <p
                  style={{
                    fontSize: "26px",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}>
                  Технологии:
                </p>
                <div className='tag-container'>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    ReactJS + Хуки
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    Axios
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    SCSS / CSS-модули
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    React Context
                  </div>

                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    React Router
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    React Skeleton
                  </div>
                  <div className='tag'>
                    <img className='tag-icon' src='/check.png' alt='check' />
                    Backend-сервер Mokky.dev
                  </div>
                </div>
                <a
                  href='https://andy-glow.github.io/React-Sneakers/'
                  target='_blank'
                  rel='noopener'>
                  <button className='btn'>Перейти на сайт</button>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
