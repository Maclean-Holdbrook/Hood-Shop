import { motion } from 'framer-motion';
import Modal from './Modal';
import '../Css/ConfirmationModal.css';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger', 'warning', 'info', 'success'
  loading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return (
          <svg className="confirmation-icon danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="confirmation-icon warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="confirmation-icon info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="confirmation-icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  const footer = (
    <>
      <button
        className="modal-btn modal-btn-cancel"
        onClick={onClose}
        disabled={loading}
      >
        {cancelText}
      </button>
      <button
        className={`modal-btn modal-btn-${type}`}
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="btn-spinner"></span>
            Processing...
          </>
        ) : (
          confirmText
        )}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="small"
      closeOnBackdropClick={!loading}
    >
      <div className="confirmation-content">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          {getIcon()}
        </motion.div>
        <p className="confirmation-message">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
