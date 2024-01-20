import { motion } from "framer-motion";
const CreatingEnvLoading = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, ease: "easeInOut" } }}
        className="flex flex-col justify-center align-middle  items-center text-center mt-[20%]"
      >
        {" "}
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="text-white text-[28px] font-semibold mt-3">
          Creating new chat environment...
        </p>
      </motion.div>
    );
  };

  export default CreatingEnvLoading