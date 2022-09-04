import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import GAListener from 'components/GAListener';
import { LayoutRoute, MainLayout } from 'components/Layout';
import Home from './pages/Home';
import Light from './pages/Light';
import Fan from './pages/Fan';
import Heater from './pages/Heater';


import './styles/reduction.scss';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
           
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={Home}
            />
            <LayoutRoute
              exact
              path="/light"
              layout={MainLayout}
              component={Light}
            />
           
            <LayoutRoute
              exact
              path="/fan"
              layout={MainLayout}
              component={Fan}
            />

            <LayoutRoute
              exact
              path="/heater"
              layout={MainLayout}
              component={Heater}
            />

            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
