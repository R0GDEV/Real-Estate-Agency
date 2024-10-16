import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Profile_icon from "../assets/profile_icon.svg";
import Menu_icon from "../assets/Menu_icon.svg";
import Info_icon from "../assets/info_icon.svg"; // Import your info icon
import Back from "../assets/Back.svg";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal state
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
        // Automatically open modal on login or home page
        if (location.pathname === '/login' || location.pathname === '/') {
            setIsInfoModalOpen(true);
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    // Function to toggle Info Modal
    const toggleModal = () => {
        setIsInfoModalOpen(!isInfoModalOpen);
    };

    return (
        <>
            <div className="px-4 flex items-center justify-between py-3 font-medium bg-white shadow-lg z-20 fixed top-0 w-full">
                <img src={Logo} className="w-30 h-10 cursor-pointer" alt="Logo" onClick={() => navigate('/')} />

                {/* Desktop Menu */}
                <ul className="hidden sm:flex gap-8 text-sm text-gray-700 items-center">
                    <NavLink to="/" className={({ isActive }) => `relative pb-2 ${isActive ? 'font-semibold text-black' : ''}`}>
                        HOME
                        <span className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </NavLink>
                    <NavLink to="/properties" className={({ isActive }) => `relative pb-2 ${isActive ? 'font-semibold text-black' : ''}`}>
                        PROPERTIES
                        <span className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/properties' ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </NavLink>
                    <NavLink to="/about" className="relative pb-2">
                        ABOUT
                        <span className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/about' ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </NavLink>
                    <NavLink to="/contact" className="relative pb-2">
                        CONTACT
                        <span className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/contact' ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </NavLink>
                    <NavLink to="/map" className="relative pb-2">
                        MAP
                        <span className={`absolute left-0 bottom-0 h-1 w-full bg-black transition-all duration-300 transform rounded-sm ${location.pathname === '/map' ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </NavLink>
                </ul>

                {/* Profile & Menu Icons */}
                <div className="flex gap-6 items-center">
                    {/* Info Icon Button */}
                    <img
                        src={Info_icon}
                        alt="Info"
                        onClick={toggleModal}
                        className="cursor-pointer w-8 h-8 hover:scale-105 transition-all duration-300"
                    />

                    {/* Profile Dropdown */}
                    <div className="group relative">
                        <img src={Profile_icon} className="cursor-pointer w-8 h-8" alt="Profile" />
                        <div className="group-hover:block hidden absolute right-0 pt-2 z-20">
                            <div className="flex flex-col items-center gap-2 w-40 py-3 px-5 bg-white shadow-md rounded-lg text-gray-700">
                                <Link to='/myinterest' className="hover:text-black">My Interested</Link>
                                {role === 'agent' && (
                                    <Link to='/myproperties' className="hover:text-black">My Properties</Link>
                                )}
                                <button onClick={handleLogout} className="hover:text-black">Logout</button>
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

            {/* Modal */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gradient-to-br from-gray-800 via-indigo-900 to-purple-900 p-6 rounded-lg shadow-lg w-4/5 max-w-lg text-white">
                        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Project Information</h2>
                        <p className="text-lg font-semibold text-indigo-400 mb-2">Technologies Used:</p>
                        <ul className="list-disc list-inside mb-4 text-indigo-200">
                            <li>ReactJS - Frontend</li>
                            <li>Node.js - Backend</li>
                            <li>Express - API Management</li>
                            <li>MongoDB - NoSQL Database</li>
                            <li>JWT (JSON Web Token) - Authentication & Authorization</li>
                            <li>Axios - API Handling</li>
                            <li>Tailwind CSS - Styling</li>
                        </ul>

                        <p className="text-lg font-semibold text-indigo-400 mb-2">Project Features:</p>
                        <ul className="list-disc list-inside mb-4 text-indigo-200">
                            <li>User Authentication (JWT)</li>
                            <li>Role-based Access Control</li>
                            <li>CRUD for Properties (Agent)</li>
                            <li>Clients can express interest in properties</li>
                        </ul>

                        <p className="text-lg font-semibold text-indigo-400 mb-2">Project Owner:</p>
                        <ul className="list-disc list-inside mb-4 text-indigo-200">
                            <li><strong>Owner Name:</strong> Om Sharma</li>
                            <li><strong>Email: </strong><a href="mailto:mr.omsharma.c@gmail.com" className="text-indigo-300 underline hover:text-indigo-100 transition-all duration-300">
                                mr.omsharma.c@gmail.com
                            </a></li>
                            <li><strong>Date of Creation:</strong> January 10, 2024</li>
                        </ul>

                        <div className="mt-6 text-center">
                            <button onClick={toggleModal} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
