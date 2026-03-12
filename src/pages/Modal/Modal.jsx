import { useState } from "react";
import BackToPortfolioButton from "../../app/BackToPortfolioButton/BackToPortfolioButton";
import "./index.scss";

const ModalWindow = ({ open, setOpen, children }) => (
  <div className={`overlay animated ${open ? "show" : ""}`}>
    <div className='modal'>
      <svg onClick={() => setOpen(false)} height='200' viewBox='0 0 200 200' width='200'>
        <title />
        <path d='M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z' />
      </svg>
      {children}
    </div>
  </div>
);

function Modal() {
  const [open, setOpen] = useState(false);

  return (
    <div className='modal-window'>
      <button onClick={() => setOpen(true)} className='open-modal-btn'>
        ✨ Открыть окно
      </button>
      <ModalWindow open={open} setOpen={setOpen}>
        <div>
          <img src='https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif' />
          <h3 style={{ color: "black" }}>
            <b>Динамическое содержимое компонента</b>
          </h3>
          <button onClick={() => setOpen(false)} className='open-modal-btn'>
            ✨ Динамическая кнопка ✨
          </button>
        </div>
      </ModalWindow>
      <div className='back-btn'>
        <BackToPortfolioButton />
      </div>
    </div>
  );
}

export default Modal;
