export default function ImageModal({ isOpen, imagePath, onClose }) {
  if (!isOpen || !imagePath) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <img
          src={`http://localhost:5280${imagePath}`}
          alt="Större bild"
          className="modal-image"
        />
      </div>
    </div>
  );
}
