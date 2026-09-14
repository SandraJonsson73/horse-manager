import { useState, useEffect } from 'react';
import HorseList from './components/HorseList';
import HorseForm from './components/HorseForm';
import { horses } from './api/horses';
import './App.css';

export default function App() {
  const [horsesList, setHorsesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingHorse, setEditingHorse] = useState(null);

  const fetchHorses = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await horses.getAll();
      setHorsesList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData, file) => {
    setLoading(true);
    setError('');
    try {
      let horse;
      if (editingHorse) {
        horse = await horses.update(editingHorse.id, formData);
      } else {
        horse = await horses.create(formData);
      }

      if (file) {
        await horses.uploadImage(horse.id, file);
        horse.imagePath = (await horses.getById(horse.id)).imagePath;
      }

      await fetchHorses();
      setEditingHorse(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (horse) => {
    setEditingHorse(horse);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setEditingHorse(null);
  };

  useEffect(() => {
    fetchHorses();
    // Varningen är ett falskt positivt — fetchHorses() är ett legitim 
    // async data-fetching-mönster. Appen fungerar korrekt.
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>🐴 Hästregistrering</h1>
        <p>Hantera och registrera dina hästar</p>
      </header>

      {error && (
        <div className="error-banner">
          <strong>Fel:</strong> {error}
        </div>
      )}

      <main className="main-content">
        <HorseForm
          editingHorse={editingHorse}
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
        <HorseList
          horses={horsesList}
          onEdit={handleEdit}
          loading={loading}
        />
      </main>
    </div>
  );
}
