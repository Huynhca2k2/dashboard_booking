import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";
import FooterComponent from "./FooterComponent";
import { fetchUserInfo } from "../services/user";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";


  useEffect(() => {
    
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token && location.pathname !== "/login") {
       
        navigate("/login");
        return;
      }

      if (token) {
       
        try {
          const userInfo = await fetchUserInfo(token);
          
          if (!userInfo || userInfo.roles[0].name !== "ADMIN") {
           
           
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);

          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [location, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {!isLoginPage && <SidebarComponent />}
        <main className="flex-1 bg-[#f2f2f2]">
          {!isLoginPage && <HeaderComponent />}
          {children}
          {!isLoginPage && <FooterComponent />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
