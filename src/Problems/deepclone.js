const referencesMap = new Map();

function cloneDeep(data) {
  if (data === null || typeof data !== "object") {
    return data;
  }

  if (referencesMap.has(data)) {
    return referencesMap.get(data);
  }

  const output = Array.isArray(data) ? [] : {};

  referencesMap.set(data, output);

  const keys = [...Object.keys(data), ...Object.getOwnPropertySymbols(data)];

  for (const key of keys) {
    output[key] = cloneDeep(data[key]);
  }

  return output;
}

async function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  let tries = 0;
  while (true) {
    try {
      return await fetcher();
    } catch (error) {
      if (++tries > maximumRetryCount) throw error;
    }
  }
}

// Check for Circular References:
// If data has already been encountered (and thus cloned) previously, it's retrieved from the referencesMap to avoid redundant cloning and potential infinite loops.
// Create Initial Copy:
// If data is an array, an empty array is created to hold the cloned values.
// If data is an object, an empty object is created to hold the cloned properties.
// The newly created copy is stored in the referencesMap for future reference.
