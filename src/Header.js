import { useState } from "react";

const Header = ({ headerCategory, startGame, category }) => {
  const [catValue, setCatValue] = useState(category);

  return (
    <header className="header">
      <h1 onClick={() => window.location.reload()}>Quizzical</h1>
      <select
        //value={category}
        //onChange={(e) => setCategory(e.target.value)}
        //onBlur={(e) => setCategory(e.target.value)}
        value={catValue}
        onChange={(e) => setCatValue(e.target.value)}
        onBlur={(e) => setCatValue(e.target.value)}
        className="trivia-category"
        ref={headerCategory}
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
      </select>{" "}
      <button onClick={startGame}>New Game</button>
    </header>
  );
};

export default Header;
