import "./styles.css";
import { SimpleTable } from "./SimpleTable";
import { Wrapper } from "./FetchContext";
import { useState, useEffect } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <App2 />
      <AppOne />
      <h2>Start editing to see some magic happen!</h2>
      <h3>table 1</h3>
      <SimpleTable />
      <Wrapper />
    </div>
  );
}

function A() {
  console.log("render A");
  return null;
}

function App2() {
  const [_state, setState] = useState(false);
  console.log("render App");
  return (
    <div>
      <button
        onClick={() => {
          console.log("click");
          setState(true);
        }}
      >
        click me
      </button>
      <A />
    </div>
  );
}

function AppOne() {
  const [state] = useState(0);
  console.log(1);

  const start = Date.now();
  while (Date.now() - start > 50) {
    window.timestamp = Date.now();
    break;
  }

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => console.log(3));

  setTimeout(() => console.log(4), 0);

  return null;
}
