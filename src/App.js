import "./App.css";
import Users from "./component/Users";
import Routes from "./routes";

function App() {
  return (
    <div className="bg-dark1 p-5">
      <div className="flex flex-row justify-center">
        <div className="bg-dark6 w-[30%] h-screen text-white">
          <Routes />
          <Users/>
          
        </div>
        <div
          className="bg-dark2 w-[70%] h-screen text-white"
          style={{ backgroundImage: "url(wpbg.jpg)" }}
        >
          Amit Mandal
        </div>
      </div>
    </div>
  );
}

export default App;
