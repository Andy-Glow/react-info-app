import { useState, useEffect, useRef } from "react";
import { Block } from "./Block";
import BackToPortfolioButton from "../../app/BackToPortfolioButton/BackToPortfolioButton";

import "./index.scss";

function Currency() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const ratesRef = useRef({});

  useEffect(() => {
    fetch("https://2b694d80923013f1.mokky.dev/currencies")
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json[0].rates;
        // Устанавливаем начальное значение
        setFromPrice(1);
        setToPrice(convertCurrency(1, "RUB", "USD"));
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию о курсах валют");
      });
  }, []);

  // Функция конвертации валюты
  const convertCurrency = (amount, from, to) => {
    if (Object.keys(ratesRef.current).length === 0) return 0;

    // Если валюты одинаковые, возвращаем ту же сумму
    if (from === to) return Number(amount).toFixed(3);

    // Переводим сумму в рубли, а потом из рублей в нужную валюту
    // amount - это сумма в валюте from
    // rates[from] - сколько рублей стоит 1 единица валюты from
    // rates[to] - сколько рублей стоит 1 единица валюты to

    // Сначала переводим сумму в рубли
    const amountInRUB = amount * ratesRef.current[from];
    // Потом переводим рубли в целевую валюту
    const result = amountInRUB / ratesRef.current[to];

    return Number(result).toFixed(3);
  };

  // Обработчик изменения левого поля
  const onChangeFromPrice = (value) => {
    setFromPrice(value);
    setToPrice(convertCurrency(value, fromCurrency, toCurrency));
  };

  // Обработчик изменения правого поля
  const onChangeToPrice = (value) => {
    setToPrice(value);

    // Конвертируем обратно: из to в from
    const amountInRUB = value * ratesRef.current[toCurrency];
    const result = amountInRUB / ratesRef.current[fromCurrency];

    setFromPrice(Number(result).toFixed(3));
  };

  // Обработчик смены левой валюты
  const onChangeFromCurrency = (currency) => {
    setFromCurrency(currency);
    setToPrice(convertCurrency(fromPrice, currency, toCurrency));
  };

  // Обработчик смены правой валюты
  const onChangeToCurrency = (currency) => {
    setToCurrency(currency);
    setToPrice(convertCurrency(fromPrice, fromCurrency, currency));
  };

  return (
    <div className='curr-page'>
      <div className='back-btn'>
        <BackToPortfolioButton />
      </div>
      <div className='currency'>
        <Block
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={onChangeToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
    </div>
  );
}

export default Currency;
