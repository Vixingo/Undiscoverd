import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Appbar from "../shared/Navbar/appbar";
import Navbar2 from "../shared/Navbar2/Navbar";
import ScrollToTop from "../components/ScrollTop";

const Layout = () => {
  const { pathname } = useLocation();
  console.log("🚀 ~ Layout ~ pathname:", pathname);

  return (
    <>
      <div className="w-full">
        {
          !(pathname === "/login" || pathname === "/sign-up") && <Navbar2 />
          // <>
          //   <Appbar />
          // </>
        }
        {pathname === "/" ||
        pathname === "/Playerinfo" ||
        pathname === "/Coachinfo" ? (
          <div style={{ marginTop: "6.2rem", zIndex: "1" }}>
            <Outlet />
            <ScrollToTop />
          </div>
        ) : (
          <div
            className="max-w-[1440px] mx-auto mt-10 px-3 lg:px-[20px]"
            style={{ marginTop: "7.3rem", zIndex: "2" }}>
            <Outlet />
            <ScrollToTop />
          </div>
        )}
      </div>
      {!(pathname === "/login" || pathname === "/sign-up") && <Footer />}
    </>
  );
};

export default Layout;
