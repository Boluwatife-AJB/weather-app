import React from 'react';
import { motion } from 'framer-motion';

const Error = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-md my-4"
      role="alert"
    >
      <div className="flex items-center flex-col ">
        <div className="flex-shrink-0">
          <svg
            className="h-20 w-20 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M13 13a1 1 0 00-1.7.7V16a1 1 0 01-1 1H9a1 1 0 01-1-1v-1.3a1 1 0 00-1.7-.7l-3 3A1 1 0 001 18h18a1 1 0 00.7-1.7l-3-3a1 1 0 00-.7-.3zM10 5a1 1 0 00-1 1v5a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="my-5 text-center"
        >
          <h3>Oops..</h3>
          <p className="text-lg capitalize">{message}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Error;
