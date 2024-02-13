import React, { useEffect, useState } from "react";

const controller = new AbortController();
const signal = controller.signal;

function handleCancel() {
  controller.abort();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// streams
// buffer
//
async function fetchData(page) {
  let url = "https://swapi.dev/api/people/";
  if (page) {
    url = page;
  }
  const res = await fetch(url, { signal });
  // if (!response.ok) {
  //   throw new Error(`Server error: ${response.status}`);
  // }
  return await res.json();
}

function SimpleTable(props) {
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

  useEffect(() => {
    handlefetchData();
  }, []);

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

export { SimpleTable };

// Caching: Consider implementing caching strategies (e.g., using useMemo) to avoid unnecessary re-fetches if the data doesn't change frequently.
// Error Handling Granularity: Provide more specific error handling based on potential error types (e.g., network errors, server errors, data parsing errors).
// Loading State Handling: Explore using loading states for individual table cells or rows for a more fine-grained loading experience.
// Conditional Rendering: Use conditional rendering to avoid rendering empty table rows when data is not yet available or in case of errors.

// https://web.dev/articles/http-cache
