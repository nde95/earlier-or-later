import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/variants";
import logo from "../../../assets/landinglogo.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container mx-auto w-full h-screen flex flex-col justify-evenly items-center">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden">
        <img src={logo} alt="logo" height={200} width={200} />
      </motion.div>
      {/* button container */}
      <motion.div
        className="flex flex-col items-center mb-8"
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden">
        <Link to="/game">
          <button className="bg-[#84A59D] hover:bg-[#617B74] text-white font-bold py-2 px-4 rounded mb-4">
            New Game
          </button>
        </Link>
        <Link to="/howto">
          <button className="bg-[#F6BD60] hover:bg-[#d3a253] text-white font-bold py-2 px-4 rounded">
            How To Play
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;
