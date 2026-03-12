import { useState } from "react";
import BackToPortfolioButton from "../../app/BackToPortfolioButton/BackToPortfolioButton";

import "./index.scss";

function CountPage() {
  const [count, setCount] = useState(0);

  const onClickPlus = () => {
    setCount(count + 1);
  };

  const onClickMinus = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <div className='back-btn'>
        <BackToPortfolioButton />
      </div>
      <div className='count-page-content'>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <div className='buttons'>
          <button onClick={onClickMinus} className='minus'>
            - Минус
          </button>
          <button onClick={onClickPlus} className='plus'>
            Плюс +
          </button>
        </div>
      </div>
      <div className='back-btn'>
        <BackToPortfolioButton />
      </div>
    </div>
  );
}

export default CountPage;
