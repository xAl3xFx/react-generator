import React from 'react';
import './App.css';
import 'primeflex/primeflex.css';
import PrimeReact from 'primereact/api';
import PrimereactGenerator from "./components/primereact/PrimereactGenerator";
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css'

PrimeReact.ripple = true;

function App() {
  return (
    <div className="App">
      <PrimereactGenerator />
    </div>
  );
}

export default App;
