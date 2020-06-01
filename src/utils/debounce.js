const DEFAULT_DELAY = 200;

export const debounce = (callback, delay = DEFAULT_DELAY) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
};
