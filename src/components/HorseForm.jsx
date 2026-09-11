import { useState, useEffect } from 'react';

export default function HorseForm({ editingHorse, onSave, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    birthYear: new Date().getFullYear(),
    owner: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingHorse) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: editingHorse.name,
        breed: editingHorse.breed,
        birthYear: editingHorse.birthYear,
        owner: editingHorse.owner,
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: '',
        breed: '',
        birthYear: new Date().getFullYear(),
        owner: '',
      });
    }
    setFile(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingHorse?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'birthYear' ? parseInt(value, 10) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.breed || !formData.owner) {
      setError('Fyll i alla fält');
      return;
    }

    try {
      await onSave(formData, file);
      setFormData({
        name: '',
        breed: '',
        birthYear: new Date().getFullYear(),
        owner: '',
      });
      setFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="horse-form">
      <h2>{editingHorse ? 'Redigera häst' : 'Lägg till ny häst'}</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Namn *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="T.ex. Stjärnan"
        />
      </div>

      <div className="form-group">
        <label>Ras *</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="T.ex. Svenska kallblod"
        />
      </div>

      <div className="form-group">
        <label>Födelseår *</label>
        <input
          type="number"
          name="birthYear"
          value={formData.birthYear}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      <div className="form-group">
        <label>Ägare *</label>
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="T.ex. Anna Svensson"
        />
      </div>

      <div className="form-group">
        <label>Profilbild (JPG, PNG, GIF - max 5 MB)</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        {file && <p className="file-selected">✓ {file.name}</p>}
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Sparar...' : editingHorse ? 'Uppdatera' : 'Lägg till'}
        </button>
        {editingHorse && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Avbryt
          </button>
        )}
      </div>
    </form>
  );
}
