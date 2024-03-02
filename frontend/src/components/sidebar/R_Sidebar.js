import React from "react";

const R_Sidebar = () => {
  return (
    <div className="container r-sidebar-main border-start border-dark-subtle d-flex flex-column gap-2 ps-2">
      <div className="bg-dark rounded-pill d-flex align-items-center p-2 m-2">
        <i className="fa-solid fa-magnifying-glass mx-2 text-secondary"></i>
        <input
          type="text"
          className="input-r bg-transparent text-white border-0 w-100"
          placeholder="Search"
        />
      </div>
      <div className="news-sec">
        <div className="subscribe bg-dark ms-2 p-3 rounded-3 ">
          <h4 className="m-0 mb-2 fw-bold">Subscribe to Premium</h4>
          <p className="m-0 mb-3" style={{fontSize:'15px'}}>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="btn btn-primary rounded-pill fw-semibold px-3">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default R_Sidebar;
