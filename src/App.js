import './App.css';
import Welcome from "./app/welcome/page"
function App({children, path}) {
  console.log('app running', path)
  return (
    <Welcome />
  );
}

export default App;
