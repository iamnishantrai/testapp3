import logo from './logo.svg';
import './App.css';
import { Router } from '@reach/router';
import PopularDomainsData from './components/populardomains';
import TrafficChangeData from './components/trafficchange';
import AttackLayerData from './components/attacklayer';

function App() {
  return (      
    <div>
      <div className="App">
          <Router>
            <PopularDomainsData path="/popular-domains" />
            <TrafficChangeData path="/traffic-change" />
            <AttackLayerData path="/attack-layer3" />
          </Router>
      </div>
  </div>
  );
}

export default App;
