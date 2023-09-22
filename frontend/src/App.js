import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import Spots from './components/Spots';
import SpotDetails from './components/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm';

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route path='/spots'>
            <CreateSpotForm />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
        </Switch>}
    </>
  )
}

export default App;
