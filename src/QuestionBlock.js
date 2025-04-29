import { useEffect, useState } from "react";
import { decode } from "html-entities";

export default function QuestionBlock({
  question,
  ans,
  options,
  setCount,
  index,
  score
}) {
  const [selected, setSelected] = useState(null);
  const [choises, setChoises] = useState([]);
  const [bgColor, setBgColor] = useState(["#D6DBF5"]);

  useEffect(() => {
    const ops = [...options];
    ops.splice(Math.floor(Math.random() * (ops.length + 1)), 0, ans);
    setChoises(ops);
    // console.log(options);
    // console.log(ops);

    setSelected(null);
  }, [question]);

  const renderChoises = choises.map((item) => (
    <div
      onClick={() => handleClick(item)}
      key={item}
      className={item === ans && score !== null ? "success" : ""}
      style={{ backgroundColor: item === selected ? bgColor : null }}
    >
      {printable(item)}
    </div>
  ));

  useEffect(() => {
    if (score !== null) {
      if (selected === ans) {
        setBgColor("#94D7A2");
      } else {
        setBgColor("#F8BCBC");
      }
    }
  }, [score]);

  function handleClick(id) {
    // console.log(id, "ans was clicked");
    setSelected(id);
    if (id === ans) {
      setCount(index, true);
    } else {
      setCount(index, false);
    }
  }

  function printable(item) {
    return item.replace(
      /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
      (match) => decode(match)
    );
  }

  return (
    <section className="question-block">
      <div className="question">{printable(question)}</div>
      <div className="ans">{renderChoises}</div>
    </section>
  );
}
