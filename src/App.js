import "./App.css";
import Chats from "./component/Chats";
// import Users from "./component/Users";
import Routes from "./routes";

function App() {
  return (
    <div className="bg-blue-400">
      <div className="flex flex-row justify-center">
        <div className="user-right-border bg-dark6 w-[30%] h-screen text-white">
          <Routes />
          {/* <Users /> */}
        </div>
        <div
          className="bg-dark2 w-[70%] h-screen text-white"
          // style={{ backgroundImage: "url(wpbg.jpg)" }}
        >
          <Chats />
        </div>
      </div>
    </div>
  );
}

export default App;
