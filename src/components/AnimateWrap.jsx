import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AnimateWrap({ children }) {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.main>
  );
}
