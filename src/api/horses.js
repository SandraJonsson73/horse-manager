const API_BASE = 'http://localhost:5280/api';

export const horses = {
  async getAll() {
    const response = await fetch(`${API_BASE}/horses`);
    if (!response.ok) throw new Error('Kunde inte hämta hästar');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE}/horses/${id}`);
    if (!response.ok) throw new Error('Kunde inte hämta häst');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE}/horses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Kunde inte skapa häst');
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE}/horses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Kunde inte uppdatera häst');
    return response.json();
  },

  async uploadImage(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE}/horses/${id}/image`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Kunde inte ladda upp bild');
    return response.json();
  },
};
