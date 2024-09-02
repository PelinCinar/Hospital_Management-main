import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServiceCard = ({ item, index }) => {
  const { name, description, bgColor, textColor } = item;
  return (
    <div className="bg-slate-400 rounded-lg shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{name}</h2>
        <p className="text-base text-gray-600 mb-6">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <Link
          to="/doctors"
          className="inline-flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-primaryColor hover:border-transparent transition-colors duration-300"
        >
          <BsArrowRight className="text-gray-800 hover:text-white" />
        </Link>
        <span
          className="flex items-center justify-center w-12 h-12 text-lg font-semibold text-white rounded-full"
          style={{
            backgroundColor: bgColor,
          }}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
