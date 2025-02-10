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
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl relative p-6 w-sm dark:bg-transparent  dark:border dark:border-stone-700 dark:inset-shadow-sm dark:inset-shadow-stone-500/50">
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
