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
        <div className="px-4 flex item-center justify-between py-3 font-medium  transition ease-in-out duration-800 " >
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
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'
                    }`}
            >
                <div className="flex flex-col  text-gray-600">
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
export default Navbar;