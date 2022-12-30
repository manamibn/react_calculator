// import "./App.css";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonWrapper from "./components/ButtonWrapper";
import Button from "./components/Button";
import { useState } from "react";

const buttonValues = [
  ["AC", "+/-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const getButtonClass = (btn) => {
  if (btn === "/" || btn === "x" || btn === "+" || btn === "-") {
    return "operatorColumn";
  } else if (btn === "=") {
    return "equal";
  } else if (btn === 0) {
    return "zero";
  } else {
    return "";
  }
};

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calculation, setCalculation] = useState({
    sign: "",
    number: 0,
    result: 0,
  });

  const btnClickHandler = (e, btn) => {
    return btn === "/" || btn === "x" || btn === "-" || btn === "+"
      ? signClickHandler(e)
      : btn === "AC"
      ? resetClickHandler(e)
      : btn === "+/-"
      ? invertClickHandler(e)
      : btn === "%"
      ? percentClickHandler(e)
      : btn === "="
      ? equalsClickHandler(e)
      : btn === "."
      ? decimalClickHandler(e)
      : numberClickHandler(e);
  };

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calculation.number).length < 14) {
      setCalculation({
        ...calculation,
        number:
          calculation.number === 0 && value === "0"
            ? "0"
            : removeSpaces(calculation.number) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calculation.number + value)))
            : toLocaleString(calculation.number + value),
        result: !calculation.sign ? 0 : calculation.result,
      });
    }
  };

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculation({
      ...calculation,
      number: !calculation.number.toString().includes(".")
        ? calculation.number + value
        : calculation.number,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculation({
      ...calculation,
      sign: value,
      result:
        !calculation.result && calculation.number
          ? calculation.number
          : calculation.result,
      number: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calculation.sign && calculation.number) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;
      console.log("calc--", calculation);
      setCalculation({
        ...calculation,
        result:
          calculation.number === "0" && calculation.sign === "/"
            ? "Can't divide with 0"
            : math(
                Number(removeSpaces(calculation.result)),
                Number(removeSpaces(calculation.number)),
                calculation.sign
              ),
        sign: "",
        number: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalculation({
      ...calculation,
      number: calculation.number
        ? toLocaleString(removeSpaces(calculation.number) * -1)
        : 0,
      result: calculation.result
        ? toLocaleString(removeSpaces(calculation.result) * -1)
        : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let number = calculation.number
      ? parseFloat(removeSpaces(calculation.number))
      : 0;
    let result = calculation.result
      ? parseFloat(removeSpaces(calculation.result))
      : 0;

    setCalculation({
      ...calculation,
      number: (number /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalculation({
      ...calculation,
      sign: "",
      number: 0,
      result: 0,
    });
  };

  return (
    <Wrapper>
      <Screen
        value={calculation.number ? calculation.number : calculation.result}
      />
      <ButtonWrapper>
        {buttonValues.flat().map((button, index) => {
          return (
            <Button
              key={index}
              className={getButtonClass(button)}
              value={button}
              onClick={(e) => btnClickHandler(e, button)}
            />
          );
        })}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default App;
