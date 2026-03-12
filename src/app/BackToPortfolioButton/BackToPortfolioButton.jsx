import { useNavigate } from "react-router-dom";
import "./index.scss";

const BackToPortfolioButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");

    setTimeout(() => {
      const portfolioBlock = document.querySelector(".portfolio-block");
      if (portfolioBlock) {
        const portfolioPosition = portfolioBlock.offsetTop;
        window.scrollTo({ top: portfolioPosition, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <button className='back-to-portfolio-btn' onClick={handleClick}>
      Вернуться к портфолио
    </button>
  );
};

export default BackToPortfolioButton;
