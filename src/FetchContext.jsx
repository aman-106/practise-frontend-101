import { useContext, useEffect, useState, createContext } from "react";

const datacontext = createContext(null);

async function fetchData(page) {
  let url = "https://swapi.dev/api/people/";
  if (page) {
    url = page;
    a;
  }
  const res = await fetch(url);
  // if (!response.ok) {
  //   throw new Error(`Server error: ${response.status}`);
  // }
  return await res.json();
}

function Parent(props) {
  const [recods, setrecods] = useState(null);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getNext() {
    if (recods.next) {
      // pasrse to next
      handlefetchData(recods.next);
    }
  }

  function handleNameSort() {
    // recods &&
    const list = [...recods?.results];
    console.log("list before", list);

    list.sort((a, b) => a.name.localeCompare(b.name));
    console.log("list", list);
    setrecods({
      ...recods,
      results: list,
    });
  }

  async function handlefetchData(page) {
    try {
      setLoading(true);
      const data = await fetchData(page);
      debugger;
      setrecods(data);
      console.log(data);
    } catch (err) {
      setError("something went wrong");
      // if (error.name === 'AbortError') {
      //   setError('Request canceled'); // Handle cancellation specifically
      // } else if (error.name === 'NetworkError') {
      //   setError('Network error occurred'); // Handle network issues
      // } else {
      //   setError('Something went wrong'); // General error catch-all
      // }
    } finally {
      setLoading(false);
    }
  }

  return (
    <datacontext.Provider
      value={{
        handlefetchData,
        handleNameSort,
        loading,
        err,
        recods,
      }}
    >
      <h3> Fetching USing Context</h3>
      {props.children}
    </datacontext.Provider>
  );
}

function ChildSec() {
  const { handlefetchData } = useContext(datacontext);

  useEffect(() => {
    handlefetchData();
  }, []);

  return <div>This triggers</div>;
}

function ChildOne(props) {
  const { loading, err, recods } = useContext(datacontext);
  function handleNameSort() {}
  function getNext() {}
  return (
    <table>
      <thead>
        <th onClick={handleNameSort}>
          <button>name</button>
        </th>
        <th>height </th>
        <th> gender </th>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={3}>Hii Loading</td>
          </tr>
        )}
        {err && (
          <tr>
            <td colSpan={3}>{err}</td>
          </tr>
        )}
        {recods &&
          !loading &&
          !err &&
          recods.results.map((item) => {
            return (
              <tr key={item.created}>
                <td>{item.name}</td>
                <td>{item.height}</td>
                <td>{item.gender}</td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td onClick={getNext}>
            <button>next</button>
          </td>
          <td>prev</td>
        </tr>
      </tfoot>
    </table>
  );
}

function Wrapper() {
  return (
    <Parent>
      <ChildOne />
      <ChildSec />
    </Parent>
  );
}

export { Wrapper };

// Does React context replace Redux?
// Yes and no.

// For many React beginners, Redux is a way of more easily passing around data. This is because Redux comes with React context itself.

// However, if you are not also updating state, but merely passing it down your component tree, you do not need a global state management library like Redux.

// React context caveats
// Why it is not possible to update the value that React context passes down?

// While it is possible to combine React context with a hook like useReducer and create a makeshift state management library without any third-party library, it is generally not recommended for performance reasons.

// The issue with this approach lies in the way that React context triggers a re-render.

// If you are passing down an object on your React context provider and any property on it updates, what happens? Any component which consumes that context will re-render.

// This may not be a performance issue in smaller apps with few state values that are not updated very often (such as theme data). But it is a problem if you will be performing many state updates in an application with a lot of components in your component tree.

// call hydrateRoot to make the server-generated HTML interactive.

// https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect

// You use it when you want the computation of that initial state to happen only once.

// Because if you use an expression instead say:

// const [state, setState] = useState(compute());
// React saves the initial result of compute() once and ignores it on the next renders. But the compute function is still called on each render. This can be wasteful.

// If you pass a function instead, the function is invoked only once.
