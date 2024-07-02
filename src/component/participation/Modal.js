import React from 'react';

const Modal = ({ content, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;