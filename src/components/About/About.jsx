import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* =========== About image =========== */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 ">
            <img src={aboutImg} className=" rounded-lg" alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          {/* =========== About content=========== */}
          <div className="w-full lg:w-1/2 xl:[670px] order-1 lg:order-2">
            <h2 className="heading">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Repellendus, dicta?{" "}
            </h2>
            <p className="text__para">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, saepe esse. Quod impedit accusantium, accusamus
              veritatis reiciendis id architecto, sed ipsum fugiat quia animi
              tempore aut eveniet? Similique, cumque assumenda!
            </p>
            <p className="text__para">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, saepe esse. Quod impedit accusantium, accusamus
              veritatis reiciendis id architecto, sed ipsum fugiat quia animi
              tempore aut eveniet? Similique, cumque assumenda!
            </p>
            <Link to="/">
              <button className="btn ">Learn More </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;