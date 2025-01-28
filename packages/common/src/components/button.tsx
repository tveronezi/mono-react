import type { ReactNode } from "react";

export function Button(props: {
  children: ReactNode;
}) {
  const { children } = props;
  return (
    <button
      type="button"
      className="rounded bg-brand-primary p-2 text-white"
      onClick={() => alert("Hello app!")}
    >
      {children}
    </button>
  );
}
