import "./App.css";
import Quiz from "./Components/Quiz/Quiz";

function App() {
  const now = new Date()
  now.setSeconds(now.getSeconds() + 0)

  return (
    <>
      <Quiz expiryTimestamp={now}/>
    </>
  );
}

export default App;
