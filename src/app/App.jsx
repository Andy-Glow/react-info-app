import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWindow from "./ModalWindows/ModalWindow.jsx";
import ModalBurgerWindow from "./ModalWindows/ModalBurgerWindow.jsx";
import projects from "./Projects";
import Theme from "./Theme.js";
import Resize from "./Resize.js";

import "./index.scss";

function App() {
  const { theme, setTheme } = Theme();
  const [showModal, setShowModal] = useState(false);
  const [showBurgerModal, setShowBurgerModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [modalType, setModalType] = useState("contacts");

  const isPortrait = Resize();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Функции скролла к разным частям страницы
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 1600) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: "smooth" });
  };

  // Функции для открытия разных модальных окон
  const handleOpenContactsModal = () => {
    setModalType("contacts");
    setShowModal(true);
  };

  const handleOpenToDoModal = () => {
    setModalType("todo");
    setShowModal(true);
  };

  const handleOpenSneakersModal = () => {
    setModalType("sneakers");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenBurgerModal = () => {
    setModalType("burger");
    setShowBurgerModal(true);
  };

  const handleCloseBurgerModal = () => {
    setShowBurgerModal(false);
  };

  return (
    <div>
      <header className={isPortrait ? "" : "mobile"}>
        {isPortrait ? (
          <div className='navigation'>
            <div className='menu'>
              <a onClick={scrollToTop}>Обо мне</a>
              <a onClick={() => scrollToBlock(650)}>Компетенции</a>
              <a onClick={() => scrollToBlock(1150)}>Портфолио</a>
            </div>

            <div className='header-buttons'>
              <button onClick={handleOpenContactsModal} className='btn'>
                Связаться
              </button>

              <div className='switch' onClick={toggleTheme}>
                <div
                  className={`theme ${theme}`}
                  style={{
                    transform: theme === "dark" ? "translateX(29px)" : "translate(0)",
                  }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className='navigation'>
            <a
              className={theme === "light" ? "icon-menu light" : "icon-menu dark"}
              onClick={handleOpenBurgerModal}
              draggable='false'
            />

            <div className='header-buttons-mobile'>
              <a
                href='https://t.me/andy_glow'
                target='_blank'
                className={theme === "light" ? "icon telegram light" : "icon telegram dark"}
              />
              <a
                href='mailto:golding@yandex.ru'
                target='_blank'
                className={theme === "light" ? "icon email light" : "icon email dark"}
              />
              <div className='switch switch-mobile' onClick={toggleTheme}>
                <div
                  className={`theme theme-mobile ${theme}`}
                  style={{
                    transform: theme === "dark" ? "translateX(29px)" : "translate(0)",
                  }}></div>
              </div>
            </div>
          </div>
        )}
      </header>

      <ModalBurgerWindow
        show={showBurgerModal}
        onClose={handleCloseBurgerModal}
        type={modalType}
        scrollToTop={scrollToTop}
        scrollToBlock={scrollToBlock}></ModalBurgerWindow>

      <ModalWindow
        style={{ fontSize: isPortrait ? "40px" : "15vw", marginTop: isPortrait ? "" : "0" }}
        show={showModal}
        onClose={handleCloseModal}
        type={modalType}></ModalWindow>

      {isPortrait ? (
        <div className='welcome-block'>
          <div className='first-block'>
            <h1>
              Доброго времени суток!
              <br />
              Меня зовут
              <br />
              Безуглов Андрей и я<br />
              <span className='title'>Frontend разработчик</span>
            </h1>
            <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
              Пишу код на <span style={{ color: "#2f9fcf" }}>React-JS</span>
            </h2>
            <h3>
              Занимаюсь программированием
              <br />
              на Java-Script более 2-х лет
            </h3>
          </div>
          <div className='main-image-box'>
            <img src='/ava.jpg' draggable='false' alt='avatar' />
          </div>
        </div>
      ) : (
        <div className='welcome-block mobile'>
          <div className='main-image-box mobile'>
            <img src='/ava-mobile.jpg' draggable='false' alt='avatar' />
          </div>

          <div className='first-block mobile'>
            <h1>
              Доброго времени суток!
              <br />
              Меня зовут
              <br />
              Безуглов Андрей и я<br />
              <span className='title'>Frontend разработчик</span>
            </h1>
            <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
              Пишу код на <span style={{ color: "#2f9fcf" }}>React-JS</span>
            </h2>
            <h3>
              Занимаюсь программированием
              <br />
              на Java-Script более 2-х лет
            </h3>
          </div>
          <button onClick={handleOpenContactsModal} className='btn'>
            Связаться
          </button>
        </div>
      )}

      <div className='competentions-block'>
        <h1 style={{ fontSize: isPortrait ? "52px" : "10vw" }}>Компетенции</h1>
        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>
          Развиваюсь, в основном, в направлении <span style={{ color: "#2f9fcf" }}>Frontend</span>,
          но на этом не ограничиваюсь.
          <br />
          Рост в профессии для меня - одна из главных целей!
        </p>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            JavaScript
          </p>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            HTML
          </p>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            CSS / SCSS
          </p>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            React
          </p>
        </div>
        <div style={{ display: "flex", gap: "15px", marginTop: "16px", flexWrap: "wrap" }}>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            Английский: C1
          </p>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            Node.js
          </p>
          <p className='tag'>
            <img className='tag-icon' src='/check.png' alt='check' />
            SQL
          </p>
        </div>
        <p style={{ fontSize: "27px" }}>
          Открыт для обсуждения вариантов сотрудничества.
          <br />
          Детальнее готов обсудить при{" "}
          <span style={{ color: "#0091DB", cursor: "pointer" }} onClick={handleOpenContactsModal}>
            личной переписке или встрече.
          </span>
        </p>
      </div>

      <div className='portfolio-block'>
        <div className='first-block'>
          <h1 className='main-title'>Примеры работ</h1>
          <img className='array-icon' src='/arrow.png' draggable='false' alt='icon' />
        </div>
        <div className='projects-grid'>
          {projects.map((project) => (
            <div
              key={project.id}
              className='project-card'
              onClick={() => navigate(`/${project.id}`)}>
              <img src={project.image} alt={project.title} className='project-image' />
              <div className='project-overlay'>
                <h3>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className='second-block'>
          <h1 className='main-title'>Отдельные проекты</h1>
          <img className='array-icon' src='/arrow.png' draggable='false' alt='icon' />
        </div>
        <div className='exteral-projects'>
          <img
            className=''
            onClick={handleOpenToDoModal}
            src='/projects/todo-app.png'
            draggable='false'
          />
          <img
            onClick={handleOpenSneakersModal}
            src='/projects/sneakers-app.png'
            draggable='false'
          />
        </div>
      </div>

      {/* Кнопка "Наверх" */}
      {showButton && <button className='btn-up' onClick={scrollToTop} aria-label='Наверх'></button>}
    </div>
  );
}

export default App;
