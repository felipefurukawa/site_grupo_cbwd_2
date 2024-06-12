import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PedidoList = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const response = await api.get('/pedidos');
      setPedidos(response.data);
    };

    fetchPedidos();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/pedidos/${id}`);
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <Link to="/pedido">Novo Pedido</Link>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            {pedido.nome}
            <Link to={`/pedido/${pedido.id}`}>Editar</Link>
            <button onClick={() => handleDelete(pedido.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidoList;
