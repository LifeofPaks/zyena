import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container flex items-center justify-between !mx-auto shadow-md bg-white !py-2 !px-[2rem] rounded-2xl">
      <Link to="/">
        <img
        className="text-red-600"
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/panopto.png"
          alt="panopto"
        />
      </Link>
      <div className="flex items-center gap-8 p-4 ">
        {[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
          { name: "Consultations", path: "/consultations" },
          { name: "Shop", path: "/shop" },
          { name: "About Us", path: "/about-us" },
          { name: "Contact Us", path: "/contact-us" },
        ].map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `relative text-black transition-all duration-300 ${
                isActive ? "text-blue-500" : "hover:text-blue-500"
              }`
            }
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
