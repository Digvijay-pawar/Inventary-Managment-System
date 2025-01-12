import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { data } = useAuth();
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} data={data} />

      <div className="flex-1 flex flex-col ml-20">
        <Header data={data} activeTab={activeTab} />

        <main className="min-h-screen bg-gray-100 p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
