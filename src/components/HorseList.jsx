export default function HorseList({ horses, onEdit, loading }) {
  if (loading) return <p>Laddar hästar...</p>;
  if (horses.length === 0) return <p>Ingen häst registrerad ännu.</p>;

  return (
    <div className="horse-list">
      <h2>Registrerade hästar ({horses.length})</h2>
      <div className="horses-grid">
        {horses.map((horse) => (
          <div key={horse.id} className="horse-card">
            {horse.imagePath && (
              <img
                src={`http://localhost:5280${horse.imagePath}`}
                alt={horse.name}
                className="horse-image"
              />
            )}
            <div className="horse-info">
              <h3>{horse.name}</h3>
              <p><strong>Ras:</strong> {horse.breed}</p>
              <p><strong>Födelseår:</strong> {horse.birthYear}</p>
              <p><strong>Ägare:</strong> {horse.owner}</p>
            </div>
            <button onClick={() => onEdit(horse)} className="edit-btn">
              Redigera
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
