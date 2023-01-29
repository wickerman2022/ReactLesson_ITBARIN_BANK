// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";
import styled from "styled-components";

// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================

const START_BALANCE = 0;
const LIMIT_BALANCE = 100000;
const GET_MONEY = 100;
const PRICE = 150;

export default function App() {
  // ФУНКЦІОНАЛ БАЛАНСУ ========================

  // Ось тут тримаємо актуальне значення балансу

  const [balance, setBalance] = React.useState(START_BALANCE);
  const [payment, setPayment] = React.useState([]);
  // Функція для прямого поповнення балансу

  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  //Функціонал транзакцій

  const sendMoney = () => {
    setBalance(balance + GET_MONEY);

    setPayment([
      ...payment,
      {
        name: "Поповнення",
        amount: GET_MONEY,
        type: "+"
      }
    ]);
  };

  const getMoney = () => {
    setBalance(balance - GET_MONEY);
    setPayment([
      ...payment,
      {
        name: "Зняття",
        amount: GET_MONEY,
        type: "-"
      }
    ]);
  };
  const payMoney = () => {
    setBalance(balance - PRICE);

    setPayment([
      ...payment,
      {
        name: "Покупка",
        amount: PRICE,
        type: "-"
      }
    ]);
  };
  const catMoney = () => {
    setBalance(balance - GET_MONEY / 2);

    setPayment([
      ...payment,
      {
        name: "Котики",
        amount: GET_MONEY / 2,
        type: "-"
      }
    ]);
  };

  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================
  const LOGIN = "cat";
  const PASSWORD = "black";

  const [isLogged, setLogged] = React.useState(false);

  // авторизація
  const doLogin = () => {
    const login = prompt("Ваш логін");
    const password = prompt("Ваш пароль");
    if (login === LOGIN && password === PASSWORD) {
      alert("Ви увійшли");
      setLogged(true);
    } else {
      alert("Помилка");
    }
  };

  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція doLogin
      */}

      <Header name="IT-BRAINS BANK" onClick={doLogin} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      {isLogged && <Balance balance={balance} />}

      {/* Компонент меню з кнопками */}
      {isLogged && (
        <Menu
          // ось сюди ми передаємо конфігурацію кнопок
          config={[
            {
              name: "Поповнити баланс",
              onClick: sendMoney,
              img: "/icon/send.svg"
            },
            {
              name: "Зняти гроші",
              onClick: getMoney,
              img: "/icon/get.svg"
            },
            {
              name: "Оплатити покупку",
              onClick: payMoney,
              img: "/icon/payment.svg"
            },

            {
              name: "Дати котику",
              onClick: catMoney,
              img: "/icon/cat.svg"
            }
          ]}
        />
      )}
      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      {isLogged && <Payment payment={payment} />}
      {!isLogged && <NotLogged>Вам потрібно увійти в аккаунт</NotLogged>}
    </Page>
  );
}

const NotLogged = styled.div`
  padding: 100px, 30px;
  color: #fff;
  text-align: center;
  margin-top: 100px;
`;
