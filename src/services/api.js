const BASE_URL = 'http://localhost:8080';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const api = {
  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Error de autenticación');
    return res.json();
  },

  productAgent: async (instruction, file, sessionId) => {
    const formData = new FormData();
    formData.append('instruction', instruction);
    if (file) formData.append('file', file);
    if (sessionId) formData.append('sessionId', sessionId);

    const res = await fetch(`${BASE_URL}/api/products/agent`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    if (!res.ok) throw new Error('Error al conectar con el agente de productos');
    return res.json();
  },

  salesAgent: async (sessionId, instruction) => {
    const res = await fetch(`${BASE_URL}/api/sales/agent`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ sessionId, instruction })
    });
    if (!res.ok) throw new Error('Error al conectar con el agente de ventas');
    return res.json();
  },

  getMetrics: async (startDate, endDate, category, promptAgent) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (category) params.append('category', category);
    if (promptAgent) params.append('promptAgent', promptAgent);

    const res = await fetch(`${BASE_URL}/api/metrics/sales?${params.toString()}`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Error al obtener métricas');
    return res.json();
  }
};
