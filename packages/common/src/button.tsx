import type { ReactNode } from "react";

export function Button(props: {
  children: ReactNode;
}) {
  const { children } = props;
  return (
    <button
      type="button"
      className="rounded bg-yellow-400 p-2"
      onClick={() => alert("Hello app!")}
    >
      {children}
    </button>
  );
}
