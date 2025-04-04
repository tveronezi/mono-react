import { Button, Sortable } from "@mystuff/common";

function App() {
  return (
    <div className="flex h-screen flex-col place-content-center bg-brand-secondary">
      <div className="grow">
        <Sortable
          components={[
            {
              id: "a",
              component: <div className="h-16 bg-blue-300">a</div>,
            },
            {
              id: "b",
              component: <div className="h-16 bg-yellow-300">b</div>,
            },
            {
              id: "c",
              component: <div className="h-16 bg-pink-300">c</div>,
            },
          ]}
        />
      </div>
      <Button>aaa</Button>
    </div>
  );
}

export default App;
