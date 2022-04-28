import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useGlobalContext } from "../../store/context";
import Approutes from "../approutes/Approutes";
import Info from "../info/Info";
import Sidebar from "../sidebar/Sidebar";
import Topnav from "../topnav/Topnav";
import Widget from "../widget/Widget";
import "./layout.css";

const Layout: React.FC = () => {
  const { toggleSidebar, setToggleSidebar} = useGlobalContext()

  const [toggleWidget, setToggleWidget] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar toggleSidebar={toggleSidebar} />

        <div
          className={`${
            toggleSidebar
              ? "layout__content-modify layout__content"
              : "layout__content lg:ml-[calc(68px+1rem)]"
          }`}
        >
          <div className="flex">
            <div className="md:w-[500px] flex-1">
              <Topnav
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
                toggleWidget={toggleWidget}
                setToggleWidget={setToggleWidget}
              />
              <div className="layout__content-main  mt-2">
                <Approutes />
              </div>
            </div>

            <Info />
          </div>
          <Widget toggleWidget={toggleWidget} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
