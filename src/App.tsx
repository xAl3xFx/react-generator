import React from 'react';
import './App.css';
import 'primeflex/primeflex.css';
import PrimeReact from 'primereact/api';
import PrimereactGenerator from "./components/primereact/PrimereactGenerator";
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css'
import store from './store/index';
import {Provider} from "react-redux";
import {SidebarContextProvider} from "./context/SidebarContext";

PrimeReact.ripple = true;

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <SidebarContextProvider>
                <PrimereactGenerator />
            </SidebarContextProvider>
        </Provider>
    </div>
  );
}

export default App;
