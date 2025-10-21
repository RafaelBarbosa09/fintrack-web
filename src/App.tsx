import { useState } from "react";
import { Button } from "./components/ui/button";
import Layout from "./layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1>FinTrack</h1>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </Layout>
  );
}

export default App;
