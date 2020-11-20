import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailPage from './pages/detail/detail';
import Home from './pages/home/home';
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={DetailPage} />
    </Switch>
  );
}

export default App;
