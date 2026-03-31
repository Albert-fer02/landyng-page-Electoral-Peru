import { useState } from "react";

export function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="counter">
      <button type="button" onClick={() => setCount((c) => c - 1)}>
        -
      </button>
      <span className="counter__value">{count}</span>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +
      </button>
    </div>
  );
}
