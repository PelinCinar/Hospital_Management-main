import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServiceCard = ({ item, index }) => {
  const { name, description, bgColor = '#ccc', textColor = '#000' } = item; // Varsayılan değerler

  return (
    <div className="rounded-lg shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: '#f5f5f5' }}>
      <div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: textColor }}>
          {name}
        </h2>
        <p className="text-base mb-6" style={{ color: textColor }}>
          {description}
        </p>
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
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
