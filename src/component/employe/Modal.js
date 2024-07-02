import React from 'react';

const Modal = ({ children, onClose }) => {
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '90%',
    height: '80%',
    margin: ' 50px 50px 50px 50px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span style={{ cursor: 'pointer', float: 'right', fontSize: '20px' }} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;