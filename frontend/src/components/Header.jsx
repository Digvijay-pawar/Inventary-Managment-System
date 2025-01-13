import { Link, useNavigate } from 'react-router-dom';

const Header = ({ data, activeTab}) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <HeaderLayout activeTab={activeTab}>
            <div className="flex items-center space-x-4 mx-10">
                {data ? (
                    <>
                        <div className="avatar online">
                            <div className="w-12 rounded-full">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <button
                            className="btn btn-outline"
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4 text-white">
                            <button className="btn btn-outline">Login</button>
                        </Link>
                        <Link to="/register" className="text-white">
                            <button className="btn btn-outline">Register</button>
                        </Link>
                    </>
                )}
            </div>
        </HeaderLayout>
    );
};

const HeaderLayout = ({ children, activeTab }) => (
    <header className="bg-blue-500 text-white p-4">
        <nav className="flex justify-between items-center">
            <div>
                <Link to="/" className="text-white font-semibold text-xl">
                    {activeTab || 'Home'}
                </Link>
            </div>
            <div>{children}</div>
        </nav>
    </header>
);

export default Header;
