import React, { useState, useEffect } from 'react';
import {GlobalStyles} from './Styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Web3 from 'web3';
import LocationFactoryJson from '../abis/LocationFactory.json';
import LocationJson from '../abis/Location.json';

import './App.css';
import NavBar from './NavBar';
import Location from './Location';
import LocationList from './LocationList';

const App = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [chainLocations, setChainLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setConnectedAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const networkData = LocationFactoryJson.networks[networkId];
      if (networkData) {
        let response = await fetch('/api/locations/');
        let { data } = await response.json();
        const locations = new web3.eth.Contract(
          LocationFactoryJson.abi,
          networkData.address
        );
        let stuff = data.map(async (loc) => {
          let something = await locations.methods.locations(loc.uid).call();
          return { ...loc, address: something };
        });
        const promised = await Promise.all(stuff);
        const newPromised = promised.map((p) => {
          return new web3.eth.Contract(LocationJson.abi, p.address);
        });

        const todd = newPromised.map(async (contract) => {
          return {
            locationId: await contract.methods.locationId().call(),
            name: await contract.methods.name().call(),
            reviewAggregate: await contract.methods.reviewAggregate().call(),
            reviewCount: await contract.methods.reviewCount().call(),
          };
        });

        setChainLocations(await Promise.all(todd));
      } else {
        window.alert('Schloadcoin contract not deployed to detected network.');
      }
    })();
  }, [window.web3]);

  const createReview = (locationID, text, rating) => {
    // schload.methods
    //   .createReview(locationID, text, rating)
    //   .send({ from: connectedAccount })
    //   .once("receipt", (receipt) => {
    //     console.log("receipt", receipt);
    //   });
  };

  console.log(chainLocations)

  const Routes = () => (
    <Switch>
      <Route exact path="/">
        <LocationList chainLocations={chainLocations} />
      </Route>
      <Route path="/locations/:locationId">
        <Location
          createReview={createReview}
          connectedAccount={connectedAccount}
        />
      </Route>
      <Route path="*">404</Route>
    </Switch>
  );

  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar connectedAccount={connectedAccount} />
        {/* {userId ? <Routes /> : <Login />} */}
        {loading ? 'loading...' : <Routes />}
      </Router>
    </>
  );
};

export default App;
