import "./App.css";
import SongListView from "./components/songs/SongListView";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Song Library</h1>
      </header>
      <main>
        <section className="section">
          <h2>All Songs</h2>
          <SongListView/>
        </section>
      </main>
    </div>
  );
}

export default App;
