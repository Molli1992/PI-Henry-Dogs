import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from "./Components/LandingPage";
import Form from './Components/Form';
import Home from './Components/Home';

function App() {
  return (
    <Switch>

      <Route path="/" exact={true}>
        <LandingPage />
      </Route>

      <Route path="/home" exact={true}>
        <Home />
      </Route>

      <Route path="/form" exact={true}>
        <Form />
      </Route>

    </Switch>

  );
}

export default App;

