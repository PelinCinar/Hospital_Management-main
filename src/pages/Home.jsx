import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import featureImg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/patient-avatar.png";
import { Link } from "react-router-dom";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
const Home = () => {
  return (
    <>
      <section className="hero_section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help patiens live a healty,longer life.{" "}
                </h1>
                <p className="text_para">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Voluptas natus ut illum libero aperiam, ea necessitatibus
                  labore consectetur quaerat reiciendis modi aspernatur harum
                </p>

                <button className="btn">Request an Appointment</button>
              </div>

              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Years of Experience </p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text_para">Years of Experience </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/*===== Services Section start====*/}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center"> Our Medical Services</h2>
            <p className="text__para text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae, neque.fıudhvjodfkböşldf
            </p>
          </div>

          <ServiceList />
        </div>
      </section>

      {/*===== Services Section end====*/}

      {/*===== Feature Section ====*/}

      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/*===== Feature content====*/}
            <div className="xl:w-[670px]">
              <h2 className="heading">Get Virtual treatment</h2>
              <ul className="pl-4">
                <li className="text__para">1.çikolatalı tedavi merkezi</li>
                <li className="text__para">2.nom nom yeme ilacıyla tedavi</li>
                <li className="text__para">
                  3.hayatı daha fazla yaşamak istersen sana kimyon tedavisi
                  gerkiyor.
                </li>
              </ul>
              <Link to="/ ">
                <button className="btn">Learn More</button>
              </Link>
            </div>
            {/*===== Feature img====*/}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4  rounded-lg  " alt="" />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:botoom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:pb-[26px] rounded-[10px] ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text[14px] lg:leading-5 text-headingColor font-[600]">
                      Tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text[14px] lg:leading-5 text-headingColor font-[400]">
                      10.00AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>
                <div
                  className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px]  lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4
              rounded-full "
                >
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Wayne Collins
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===== Feature Section end ====*/}

      {/*===== Our Great Doctors====*/}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center"> Our Great Doctors</h2>
            <p className="text__para text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae, neque.fıudhvjodfkböşldf
            </p>
          </div>
          <DoctorList />
        </div>
      </section>

      {/*===== Our Great Doctors end====*/}

      {/*===== faq section====*/}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>
            <div className="w-full md:w-w-1/2">
              <h2 className="heading">Lorem ipsum dolor sit amet.</h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/*=====  faq section  end====*/}
      {/*=====  testimonial ====*/}

    <section>
      <div className="container">
      <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center"> What our patient say</h2>
            <p className="text__para text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae, neque.fıudhvjodfkböşldf
            </p>
          </div>
          <Testimonial/>
      </div>
    </section>
      {/*===== testimonial   end====*/}

    </>
  );
};

export default Home;
