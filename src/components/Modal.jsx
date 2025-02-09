import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Simplified initial state
      animate={{ opacity: 1, y: 0 }} // Simplified animate state
      exit={{ opacity: 0, y: -10 }} // Simplified exit state
      transition={{ duration: 0.5 }} // Faster transition
      className="fixed inset-0 bg-stone/50 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-stone-900 rounded-lg shadow-xl relative p-6 w-sm">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
        >
          ✖
        </button>
        {children}
      </div>
    </motion.div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
