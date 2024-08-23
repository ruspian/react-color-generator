import { useState } from "react";
function App() {
  return (
    <>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          margin: "50px",
        }}
      >
        <Notes />
        <ColorGenerator />
      </div>
    </>
  );
}

const Notes = () => {
  const [note, setNote] = useState([
    {
      id: 1,
      text: "Ini adalah note pertama",
    },
  ]);
  const [inputNote, setInputNote] = useState("");

  const inputHandler = (event) => {
    setInputNote(event.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    if (inputNote.trim() !== "") {
      const newNote = {
        id: Date.now(),
        text: inputNote,
      };
      setNote([...note, newNote]);
      setInputNote("");
    }
  };

  const deleteNote = (id) => {
    const newNote = note.filter((note) => note.id !== id);
    setNote(newNote);
  };
  return (
    <div className="app">
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Enter Note"
          value={inputNote}
          onChange={inputHandler}
        />
        <button>Add</button>
      </form>
      <ul>
        {note.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ColorGenerator = () => {
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(1);

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const handleOpacityChange = (event) => {
    const opacityValue = Number(event.target.value);
    setOpacity(opacityValue);
  };

  const getOpacityPercentage = () => {
    const percentage = Math.round(opacity * 100);
    return `${percentage}%`;
  };

  const getRGB = () => {
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const getCSSCode = () => {
    const cssCode = `background-color: ${color}; opacity: ${opacity} 
    /* Tambahkan Style Lainnya Disini */`;
    return cssCode.trim();
  };

  return (
    <div>
      <h1>Color Generator</h1>
      <input type="color" value={color} onChange={handleChange} />
      <br />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={opacity}
        onChange={handleOpacityChange}
      />
      <br />
      <div style={{ backgroundColor: getRGB(), opacity: opacity }}>
        <p>{color}</p>
      </div>
      <br />
      <p>Hex: {color}</p>
      <p>RGB: {getRGB()}</p>
      <p>Opacity: {getOpacityPercentage()}</p>
      <pre>
        <code>{getCSSCode()}</code>
      </pre>
    </div>
  );
};

export default App;
