// src/components/ClienteForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const ClienteForm = () => {
  const [initialValues, setInitialValues] = useState({
    nome: '',
    endereco: '',
    signoZodiaco: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        try {
          const response = await api.get(`/clientes/${id}`);
          setInitialValues(response.data);
        } catch (error) {
          console.error("Erro ao buscar cliente", error);
        }
      };

      fetchCliente();
    }
  }, [id]);

  const validationSchema = Yup.object({
    nome: Yup.string().required('Obrigatório'),
    endereco: Yup.string().required('Obrigatório'),
    signoZodiaco: Yup.string().required('Obrigatório'),
  });

  const calculateProgress = (values) => {
    let filled = 0;
    let total = 3;

    if (values.nome) filled += 1;
    if (values.endereco) filled += 1;
    if (values.signoZodiaco) filled += 1;

    return (filled / total) * 100;
  };

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await api.put(`/clientes/${id}`, values);
      } else {
        await api.post('/clientes', values);
      }
      navigate('/');
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Cliente' : 'Novo Cliente'}</h1>
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
                <label htmlFor="nome">Nome</label>
                <Field name="nome" type="text" />
              </div>

              <div>
                <label htmlFor="endereco">Endereço</label>
                <Field name="endereco" type="text" />
              </div>

              <div>
                <label htmlFor="signoZodiaco">Signo Zodíaco</label>
                <Field name="signoZodiaco" type="text" />
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

export default ClienteForm;
