import "./App.css";
import Chats from "./component/Chats";
import Routes from "./routes";

function App() {
  return (
    <div className="bg-dark2">
      <div className="flex flex-row justify-center">
        <div className="user-right-border bg-dark6 w-[33%] h-screen text-white">
          <Routes />
        </div>
        <div
          className="bg-dark2 w-[67%] h-screen text-white"
          // style={{ backgroundImage: "url(wpbg.jpg)" }}
        >
          <Chats />
        </div>
      </div>
    </div>
  );
}

export default App;
