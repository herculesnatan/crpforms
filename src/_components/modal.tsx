interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> =({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

export default Modal;
