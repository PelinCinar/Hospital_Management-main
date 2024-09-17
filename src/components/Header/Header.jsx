import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleStickyHeader = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    };

    window.addEventListener("scroll", handleStickyHeader);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []); // Empty dependency array ensures this runs once on mount

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between xl">
          {/* Logo */}
          <Link to="/home">
            <img src={logo} alt="Logo" className="cursor-pointer" />
          </Link>

          {/* Navigation */}
          <div className="navigation md:block hidden " ref={menuRef}>
            <ul className="menu flex items-center gap-[2.7rem] ">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User and Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-auto">
                  <img
                    src={userImg}
                    className="w-full rounded-full"
                    alt="User"
                  />
                </figure>
              </Link>
            </div>

            <Link to="/login">
              <button
                className="bg-primaryColor py-2 px-6 text-white font-[600px] h-[44px] flex items-center
                justify-center rounded-[50px]"
              >
                Login
              </button>
            </Link>

            {/* Menu Toggle Button */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
