import React from "react";
import { Collection } from "./Collection";
import BackToPortfolioButton from "../../app/BackToPortfolioButton/BackToPortfolioButton";

import "./index.scss";

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function PhotoCollection() {
  const [categoryId, setCategoryId] = React.useState(0);
  // const [page, setPage] = React.useState(1); Пока недоступно из-за backend-сервера
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(`https://2b694d80923013f1.mokky.dev/photocollection?${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  return (
    <div className='photo-page'>
      <div className='back-btn'>
        <BackToPortfolioButton />
      </div>
      <div className='photo'>
        <h1>Моя коллекция фотографий</h1>
        <div className='top'>
          <ul className='tags'>
            {cats.map((obj, i) => (
              <li
                onClick={() => setCategoryId(i)}
                className={categoryId === i ? "active" : ""}
                key={obj.name}>
                {obj.name}
              </li>
            ))}
          </ul>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='search-input'
            placeholder='Поиск по названию'
          />
        </div>
        <div className='content'>
          {isLoading ? (
            <h2>Идёт загрузка</h2>
          ) : (
            collections
              .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
          )}
        </div>

        {/* <ul className='pagination'>
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? "active" : ""}>
            {i + 1}
          </li>
        ))}
      </ul> */}
      </div>
    </div> // Пагинация пока что не работает из-за бэкэнд-сервера
  );
}

export default PhotoCollection;
