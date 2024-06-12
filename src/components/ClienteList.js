// src/components/ClienteList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await api.get('/clientes');
      setClientes(response.data);
    };

    fetchClientes();
  }, []);

  const handleDeleteCliente = async (id) => {
    await api.delete(`/clientes/${id}`);
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  const handleDeletePedido = async (pedidoId, clienteId) => {
    await api.delete(`/pedidos/${pedidoId}`);
    setClientes(clientes.map(cliente => {
      if (cliente.id === clienteId) {
        return {
          ...cliente,
          pedidos: cliente.pedidos.filter(pedido => pedido.id !== pedidoId)
        };
      }
      return cliente;
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center">Central dos Queijos</h1>
      <h2>Lista de Clientes</h2>
      <Link to="/cliente">Novo Cliente</Link>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <div>
              <strong>Nome:</strong> {cliente.nome}
            </div>
            <div>
              <strong>Endereço:</strong> {cliente.endereco}
            </div>
            <div>
              <strong>Signo Zodíaco:</strong> {cliente.signoZodiaco}
            </div>
            <div>
              <strong>Pedidos:</strong>
              <ul>
                {cliente.pedidos.map(pedido => (
                  <li key={pedido.id}>
                    <div>
                      <strong>Tipo de Queijo:</strong> {pedido.tipoQueijo}
                    </div>
                    <div>
                      <strong>Data de Validade:</strong> {pedido.dataValidade}
                    </div>
                    <div>
                      <strong>Fazenda:</strong> {pedido.fazenda}
                    </div>
                    <div className="actions">
                      <Link to={`/cliente/${cliente.id}/pedido/${pedido.id}`}>Editar Pedido</Link>
                      <button onClick={() => handleDeletePedido(pedido.id, cliente.id)}>Deletar Pedido</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="actions">
                <Link to={`/cliente/${cliente.id}/pedido`}>Novo Pedido</Link>
              </div>
            </div>
            <div className="actions">
              <Link to={`/cliente/${cliente.id}`}>Editar Cliente</Link>
              <button onClick={() => handleDeleteCliente(cliente.id)}>Deletar Cliente</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
