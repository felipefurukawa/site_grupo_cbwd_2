// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import PedidoForm from './components/PedidoForm';
import './styles.css'; // Importação do CSS

function App() {
  return (
    <Router>
      <header className="text-center">
        <h1>Loja de Queijos</h1>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<ClienteList />} />
          <Route path="/cliente/:id?" element={<ClienteForm />} />
          <Route path="/cliente/:clienteId/pedido/:id?" element={<PedidoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
