import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // console.log("Token before logout:", localStorage.getItem("token"));
    setUser({}); // Clear the user state
    localStorage.removeItem("token"); // Clear the token from localStorage
    console.log("Token after logout:", localStorage.getItem("token"));
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="">
      <div className="min-w-[500px] flex fixed items-center justify-evenly shadow-md py-10  top-0 left-0 right-0 z-50 bg-white">
        <Link to="/login">
          <div className="flex  items-center justify-between px-4 bg-white">
            <div className="">
              <img
                src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
                alt=""
              />
            </div>
          </div>
        </Link>
        <div className="text-orange-500 mdl:hidden ">
          <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
            <MenuIcon style={{ fontSize: "40px" }} />
          </div>
        </div>
        <div className="sm:hidden mdl:block ">
          <div className="flex space-x-8 items-center">
            
            <p>Home</p>
            <p>How it works</p>
            {user && user.username ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white rounded w-40 h-10 hover:bg-orange-500"
              >
                LOGOUT
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 text-white rounded w-40 h-10 hover:bg-orange-500">
                  SIGN IN
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className=" mdl:hidden fixed inset-0 overflow-y-auto z-40">
          <div className=" absolute top-[120px] left-0 right-0 space-y-8 h-48 bg-orange-500 pl-4 text-white">
            <p>Home</p>
            <p>How it works</p>
            {user && user.username ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white rounded w-40 h-10 hover:bg-orange-500"
              >
                LOGOUT
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 text-white rounded w-40 h-10 hover:bg-orange-500">
                  SIGN IN
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

// import MenuIcon from "@mui/icons-material/Menu";
// import { Link, useNavigate } from "react-router-dom";
// import { AppState } from "../App";

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, setUser } = useContext(AppState);
//   const navigate = useNavigate();
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
// // console.log(user);
//  const handleLogout = () => {
//    console.log("Token before logout:", localStorage.getItem("token"));
//    setUser({}); // Clear the user state
//    localStorage.removeItem("token"); // Clear the token from localStorage
//    console.log("Token after logout:", localStorage.getItem("token"));
//    navigate("/login"); // Redirect to the login page
//  };

//   return (
//     <div className="">
//       <div className="min-w-[500px] flex fixed items-center justify-evenly shadow-md py-10  top-0 left-0 right-0 z-50 bg-white">
//         <Link to="/login">
//           <div className="flex  items-center justify-between px-4 bg-white">
//             <div className="">
//               <img
//                 src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
//                 alt=""
//               />
//             </div>
//           </div>
//         </Link>
//         <div className="text-orange-500 mdl:hidden ">
//           <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
//             <MenuIcon style={{ fontSize: "40px" }} />
//           </div>
//         </div>
//         <div className=" sm:hidden mdl:block ">
//           <div className="flex space-x-8 items-center">
//             <p>Home</p>
//             <p>How it works</p>
//           {user.username && user.email ? (
//   <button
//     onClick={handleLogout}
//     className="bg-red-600 text-white rounded w-40 h-10 hover:bg-orange-500"
//   >
//     LOGOUT
//   </button>
// ) : (
//   <Link to="/login">
//     <button className="bg-blue-600 text-white rounded w-40 h-10 hover:bg-orange-500">
//       SIGN IN
//     </button>
//   </Link>
// )}

//           </div>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div className=" mdl:hidden fixed inset-0 overflow-y-auto z-40">
//           <div className=" absolute top-[120px] left-0 right-0 space-y-8 h-48 bg-orange-500 pl-4 text-white">
//             <p>Home</p>
//             <p>How it works</p>
//             {user.username && user.email ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white rounded w-40 h-10 hover:bg-orange-500"
//               >
//                 LOGOUT
//               </button>
//             ) : (
//               <Link to="/login">
//                 <button className="bg-blue-600 text-white rounded w-40 h-10 hover:bg-orange-500">
//                   SIGN IN
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;
