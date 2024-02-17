import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container h-full mx-auto flex flex-col justify-evenly items-center text-center">
      <h1 className="font-Poppins text-3xl font-bold">404: Not Found</h1>
      <p className="font-Nunito text-lg font-semibold">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="bg-[#84A59D] hover:bg-[#617B74] text-white font-bold py-2 px-4 rounded">
          Take me back!
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
