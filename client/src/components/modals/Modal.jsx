import { XCircle } from "@phosphor-icons/react";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-2xl max-w-sm w-full relative">
      {children}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <XCircle size={24} weight="fill" className="text-primaryColor" />
      </button>
    </div>
  </div>
);

export default Modal;
