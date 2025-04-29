import "./styles.css";
import { useEffect, useState, useRef } from "react";
import QuestionBlock from "./QuestionBlock";
import Confetti from "react-confetti";
import Header from "./Header";
// import useWindowSize from "react-use/lib/useWindowSize";

//import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);
  const [score, setScore] = useState(null);
  const [category, setCategory] = useState(31);
  const [newGame, setNewGame] = useState(0);
  const headerCategory = useRef(null);
  // const { width, height } = useWindowSize();
  //const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${category}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));

    let allFalse = [];
    for (let i = 0; i < 5; i++) {
      let item = {};
      item.id = i;
      item.pass = false;
      allFalse.push(item);
    }
    setCorrectAns(allFalse);
    setScore(null);
  }, [newGame]);

  function updateCorrect(id, value) {
    setCorrectAns((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pass: value } : item))
    );
  }

  const renderQues = questions.map((question, index) => {
    return (
      <QuestionBlock
        key={index}
        question={question.question}
        ans={question.correct_answer}
        options={question.incorrect_answers}
        index={index}
        setCount={updateCorrect}
        score={score}
      />
    );
  });

  function result() {
    let count = 0;
    for (let ele of correctAns) {
      if (ele.pass === true) count++;
    }
    setScore(count);
  }

  function startGame() {
    // setCategory( headerCategory == null ? 31 : headerCategory.current.value )
    // console.warn('headerCategory is', headerCategory, headerCategory === null);
    // console.log('useref in round', headerCategory == null )//? 31 : headerCategory.current.value)
    setCategory(
      headerCategory.current ? headerCategory.current.value : category
    );
    setNewGame((prev) => prev + 1);
    setQuestions([]);
  }

  return newGame ? (
    questions.length ? (
      <>
        <Header
          // setCategory={setCategory}
          headerCategory={headerCategory}
          startGame={startGame}
          category={category}
        />
        <main>
          {score !== null && score > 0 && (
            <Confetti
              width={window.innerWidth + window.scrollX}
              height={window.innerHeight + window.scrollY + 100}
            />
          )}
          <div style={score ? { zIndex: -1, position: "relative" } : {}}>
            {renderQues}
          </div>
          {score !== null && (
            <div className="score">You scored {score}/5 correct answers</div>
          )}
          <button onClick={score !== null ? startGame : result}>
            {score !== null ? "New Game" : "Check answers"}
          </button>
        </main>
      </>
    ) : (
      <h1 className="loading"> Loading ... </h1>
    )
  ) : (
    <>
      <h1 className="firstLoad"> Quizzical </h1>
      <h2>
        {" "}
        A simple <br />
        <span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onBlur={(e) => setCategory(e.target.value)}
            className="trivia-category"
          >
            <option value="any">Mix Bag</option>
            <option value="9">General Knowledge</option>
            <option value="10">Books</option>
            <option value="11">Film</option>
            <option value="12">Music</option>
            <option value="13">Musicals &amp; Theatres</option>
            <option value="14">Television</option>
            <option value="15">Video Games</option>
            <option value="16">Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Computer Science</option>
            <option value="19">Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Comics</option>
            <option value="30">Gadgets</option>
            <option value="31">Anime &amp; Manga</option>
            <option value="32">Cartoon &amp; Animations</option>{" "}
          </select>
        </span>{" "}
        <br />
        Quiz Game{" "}
      </h2>
      <button className="first-button" onClick={startGame}>
        {" "}
        Start Quiz{" "}
      </button>
    </>
  );
}
