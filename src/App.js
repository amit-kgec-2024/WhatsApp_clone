import "./App.css";
import Routes from "./routes";

function App() {
  return (
    <div className="bg-black p-4">
      <div className="flex flex-row justify-center">
        <div className="bg-red-400 w-[30%] h-screen text-white">
          <Routes/>
        </div>
        <div className="bg-slate-700 w-[70%] h-screen text-white">fghfh</div>
      </div>
    </div>
  );
}

export default App;
