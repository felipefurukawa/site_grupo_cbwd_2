// src/components/PedidoForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const PedidoForm = () => {
  const [initialValues, setInitialValues] = useState({
    tipoQueijo: '',
    dataValidade: '',
    fazenda: '',
  });
  const navigate = useNavigate();
  const { clienteId, id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPedido = async () => {
        try {
          const response = await api.get(`/pedidos/${id}`);
          setInitialValues(response.data);
        } catch (error) {
          console.error("Erro ao buscar pedido", error);
        }
      };

      fetchPedido();
    }
  }, [id]);

  const validationSchema = Yup.object({
    tipoQueijo: Yup.string().required('Obrigatório'),
    dataValidade: Yup.date().required('Obrigatório'),
    fazenda: Yup.string().required('Obrigatório'),
  });

  const calculateProgress = (values) => {
    let filled = 0;
    let total = 3;

    if (values.tipoQueijo) filled += 1;
    if (values.dataValidade) filled += 1;
    if (values.fazenda) filled += 1;

    return (filled / total) * 100;
  };

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await api.put(`/pedidos/${id}`, values);
      } else {
        await api.post(`/clientes/${clienteId}/pedidos`, values);
      }
      navigate('/');
    } catch (error) {
      console.error("Erro ao salvar pedido", error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Pedido' : 'Novo Pedido'}</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const progress = calculateProgress(values);
          const progressBarStyle = {
            width: '100%',
            height: '20px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: progress === 100 ? 'green' : '#fff8dc',
          };

          return (
            <Form>
              <div>
                <label htmlFor="tipoQueijo">Tipo de Queijo</label>
                <Field name="tipoQueijo" as="select">
                  <option value="" label="Selecione o tipo de queijo" />
                  <option value="Azul" label="Azul" />
                  <option value="Branco" label="Branco" />
                  <option value="Macio" label="Macio" />
                  <option value="Meia Cura" label="Meia Cura" />
                  <option value="Curado" label="Curado" />
                </Field>
              </div>

              <div>
                <label htmlFor="dataValidade">Data de Validade</label>
                <Field name="dataValidade" type="date" />
              </div>

              <div>
                <label htmlFor="fazenda">Fazenda</label>
                <Field name="fazenda" type="text" />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={progressBarStyle}>
                  <div style={{ width: `${progress}%`, height: '100%', backgroundColor: progress === 100 ? 'green' : '#d4a017' }}></div>
                </div>
              </div>

              <button type="submit">Salvar</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PedidoForm;
