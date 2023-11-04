import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent(){
  let asdf=3;
  let date = "11/14/23";
  let location = "badly 110";
  return(
    <>
      <Component1 title="placeholder title" description={asdf} date={date} location={location}/>
    </>
  );
}

export default App;
