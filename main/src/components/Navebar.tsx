import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Profile_icon from "../assets/profile_icon.svg";
import Menu_icon from "../assets/Menu_icon.svg";
import Back from "../assets/Back.svg";


const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location (URL path)
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role'); // Get the role from localStorage
        if (storedRole) {
            setRole(storedRole); // Set the role state
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        // Redirect only if there's no token and the user is not already on login or register page
        if (!token && location.pathname !== '/login' && location.pathname !== '/register') {
            navigate('/login'); // Redirect to login if token is missing
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="px-4 flex items-center justify-between py-3 font-medium bg-white shadow-lg z-20 fixed top-0 w-full">
            <img src={Logo} className="w-30 h-10 cursor-pointer" alt="Logo" onClick={() => navigate('/')} />

            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-8 text-sm text-gray-700 items-center">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `relative pb-2 ${isActive ? 'font-semibold text-black' : ''}`
                    }
                >
                    HOME
                    <span
                        className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0'}`}
                    ></span>
                </NavLink>
                <NavLink
                    to="/properties"
                    className={({ isActive }) =>
                        `relative pb-2 ${isActive ? 'font-semibold text-black' : ''}`
                    }
                >
                    PROPERTIES
                    <span
                        className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/properties' ? 'scale-x-100' : 'scale-x-0'}`}
                    ></span>
                </NavLink>
                <NavLink to="/about" className="relative pb-2">
                    ABOUT
                    <span
                        className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/about' ? 'scale-x-100' : 'scale-x-0'}`}
                    ></span>
                </NavLink>
                <NavLink to="/contact" className="relative pb-2">
                    CONTACT
                    <span
                        className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/contact' ? 'scale-x-100' : 'scale-x-0'}`}
                    ></span>
                </NavLink>
                <NavLink to="/map" className="relative pb-2">
                    MAP
                    <span
                        className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/map' ? 'scale-x-100' : 'scale-x-0'}`}
                    ></span>
                </NavLink>
            </ul>

            {/* Profile & Menu Icons */}
            <div className="flex gap-6 items-center">
                {/* Profile Dropdown */}
                <div className="group relative">
                    <img src={Profile_icon} className="cursor-pointer w-8 h-8" alt="Profile" />
                    <div className="group-hover:block hidden absolute right-0 pt-2 z-20">
                        <div className="flex flex-col items-center gap-2 w-40 py-3 px-5 bg-white shadow-md rounded-lg text-gray-700">
                            <Link to='/myinterest' className="hover:text-black">My Interested</Link>
                            {role === 'agent' && (
                                <Link to='/myproperties' className="hover:text-black">My Properties</Link>
                            )}
                            <button onClick={handleLogout} className="hover:text-black">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <img onClick={() => setVisible(true)} src={Menu_icon} className="cursor-pointer w-8 h-8 sm:hidden" alt="Menu" />
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 bottom-0 bg-white transition-transform duration-300 ease-in-out z-50 ${visible ? 'translate-x-0' : 'translate-x-full'} w-3/4 max-w-xs shadow-lg`}
            >
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                        <img src={Back} className="h-4 my-auto cursor-pointer" alt="Back" />
                        <p className="cursor-pointer">Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/properties">PROPERTIES</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/contact">CONTACT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/map">MAP</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

/*import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Profile_icon from "../assets/profile_icon.svg";
import Menu_icon from "../assets/Menu_icon.svg";
import Back from "../assets/Back.svg";


const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location (URL path)
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        const storedRole = localStorage.getItem('role'); // Get the role from localStorage
        if (storedRole) {
            setRole(storedRole); // Set the role state
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        // Redirect only if there's no token and the user is not already on login or register page
        if (!token && location.pathname !== '/login' && location.pathname !== '/register') {
            navigate('/login'); // Redirect to login if token is missing
        }
    }, [navigate, location.pathname]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };
    return (
        <div className="px-4 flex item-center justify-between py-3 font-medium transition ease-in-out duration-800 " >
            <img src={Logo} className="w-30 h-10" alt="" />
            
            <ul className=" hidden sm:flex gap-5 text-sm text-gray-700 ">
                <NavLink to="/" className="flex flex-col items-center gap-1 ">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none hidden h-1 bg-gray-700" />
                </NavLink>
                <NavLink to="/properties" className="flex flex-col items-center gap-1 ">
                    <p>PROPERTIES</p>
                    <hr className="w-2/4 border-none hidden h-1 bg-gray-700" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1 ">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none hidden h-1 bg-gray-700" />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none hidden h-1 bg-gray-700" />
                </NavLink>
                <NavLink to="/map" className="flex flex-col items-center gap-1 ">
                    <p>MAP</p>
                    <hr className="w-2/4 border-none hidden h-1 bg-gray-700" />
                </NavLink>
            </ul>
            <div className="flex gap-6 items-center">
                <div className="group relative">
                    <img src={Profile_icon} className="cursor-pointer" alt="" />
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5  text-gray-500 bg-slate-100 rounded">
                            <Link to='/myinterest'><p className="cursor-pointer hover:text-black">My Interested</p></Link>
                            {role === 'agent' && (
                                <>
                                    <Link to='/myproperties'><p className="cursor-pointer hover:text-black">My Properties</p></Link>
                                </>
                            )}
                            <p className="cursor-pointer hover:text-black" onClick={handleLogout}>
                                Logout
                            </p>
                        </div>
                    </div>
                </div>
                <img onClick={() => setVisible(true)} src={Menu_icon} className="cursor-pointer sm:hidden" alt="" />
            </div>
            <div
                 className={`absolute overflow-hidden top-0 right-0 bottom-0 bg-white transition-all duration-300 ease-in-out z-50 ${visible ? 'w-full' : 'w-0'}`}
                    
            >
                <div className="flex flex-col  text-gray-600 ">
                    <div onClick={() => setVisible(false)} className="flex item-center gap-4 p-3 ">
                        <img src={Back} className="h-4 my-auto" alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className={'py-2 pl-6 border'} to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={'py-2 pl-6 border'} to='/properties'>PROPERTIES</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={'py-2 pl-6 border'} to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={'py-2 pl-6 border'} to='/contact'>CONTACT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={'py-2 pl-6 border'} to='/map'>MAP</NavLink>

                </div>
            </div>
        </div>

    );


};
export default Navbar;*/