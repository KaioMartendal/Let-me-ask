import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import { Home } from "./pages/Home";import { Newroom } from "./pages/NewRoom";
import {AuthContextProvider} from "./contexts/AuthContexts"
import {Room} from './pages/Room' 

function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={Newroom}/>
        <Route path="/rooms/:id" component={Room}/>

        <Route path='/rooms/:id' component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
