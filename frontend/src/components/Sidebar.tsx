import { Link, useLocation } from 'react-router-dom';
import {
    FaHome,
    FaShoppingCart,
    FaFileInvoice,
    FaTruck,
    FaBox,
    FaRegThumbsUp,
} from 'react-icons/fa';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


const Sidebar = ({ setActiveTab }:any) => {
    const location = useLocation();
    const links = [
        { to: '/', icon: <FaHome />, label: 'Home' },
        { to: '/orders', icon: <FaShoppingCart />, label: 'Orders' },
        { to: '/create-bill', icon: <FaFileInvoice />, label: 'Bill' },
        { to: '/suppliers', icon: <FaTruck />, label: 'Suppliers' },
        { to: '/products', icon: <MdOutlineProductionQuantityLimits />, label: "Products" },
        { to: '/add-stock', icon: <FaBox />, label: 'Add Stock' },
        { to: '/feedback', icon: <FaRegThumbsUp />, label: 'Feedback' },
    ];
    return (
        <div className="fixed top-0 left-0 w-20 bg-gray-800 text-white h-screen p-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center mb-10">Mall</h2>

            <div className="space-y-5 flex flex-col items-center">
                {links.map((link, index) => {
                    const isActive = location.pathname === link.to;

                    return (
                        <Link
                            key={index}
                            to={link.to}
                            className={`flex flex-col text-center items-center text-sm ${isActive ? 'text-yellow-500' : 'hover:text-yellow-500'
                                }`}
                            onClick={() => setActiveTab(link.label)}
                        >
                            {link.icon}
                            <span className="mt-1">{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
