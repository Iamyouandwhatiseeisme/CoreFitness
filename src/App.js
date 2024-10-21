import './App.css';
import Welcome from "./app/welcome/page"
import { UserProvider } from './app/components/UserProvider/UserProvider';




function App() {
  return (
    <UserProvider>
    <Welcome />
    </UserProvider>

    
  );
}

export default App;
