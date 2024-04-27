import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import "./../../css/Settings.css";
import P1 from "./../../assets/Setting_P1.svg";
import P2 from "./../../assets/Setting_P2.svg";
import P3 from "./../../assets/Setting_P3.svg";
import P4 from "./../../assets/Setting_P4.svg";

const Settings = () => {
  return (
    <div className="d-flex">
      <SideBar />
      <div class="d-flex align-items-start container m-1 width">
        <div
          class="nav flex-column nav-pills me-3 p-4 w-50 "
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <h5 className="title p-2">Manage your account</h5>
          <button
            class="nav-link buttonCustom w-100 active"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            <img src={P1} alt="General information photo" class="p-2 " />
            General information
          </button>
          <button
            class="nav-link buttonCustom w-100"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            <img src={P2} alt="Language and region photo" class="p-2 " />
            Language and region
          </button>
          <button
            class="nav-link buttonCustom w-100"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            <img src={P3} alt="Notifications photo" class="p-2 " />
            Notifications
          </button>
          <button
            class="nav-link buttonCustom w-100"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            <img src={P4} alt="Change email and password photo" class="p-2 " />
            Change password{" "}
          </button>
        </div>
        <div class="tab-content m-1 me-3 p-4 width" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <h5 className="title p-2">General information</h5>
            <div className="container bg-white">
              <div className="settings-content">
                <div className="account-info p-4 m-1">
                  <h7 className="section-header">YOUR ACCOUNT</h7>
                  <div className="info-row p-2 m-1">
                    <span className="info-label">User Name: </span>
                    <span className="info">example@gmail.com</span>
                  </div>
                  <div className="info-row p-2 m-1">
                    <span className="info-label">First Name: </span>
                    <span className="info">Jamal</span>
                  </div>
                  <div className="info-row p-2 m-1">
                    <span className="info-label">Last Name: </span>
                    <span className="info">Muhammad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <h5 className="title p-2">Language and region</h5>
            <div className="container bg-white">
              <div className="settings-content">
                <div className="account-info p-4 m-1">
                  <h7 className="section-header">YOUR REGION</h7>
                  <div className="info-row p-2 m-1">
                    <span className="info-label">Country</span>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected value="1">
                        Saudi Arabia
                      </option>
                    </select>
                  </div>
                  <div className="info-row p-2 m-1">
                    <span className="info-label">Languge</span>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected value="1">
                        English
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            <h5 className="title p-2">Notifications</h5>
            <div className="container bg-white">
              <div className="settings-content">
                <div className="account-info p-4 m-1">
                  <h7 className="section-header">Notifications Settings</h7>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            <h5 className="title p-2">Change password</h5>
            <div className="container bg-white">
              <div className="settings-content">
                <div className="account-info p-4 m-1">
                  <h7 className="section-header">
                    SET A NEW PASSWORD FOR YOUR ACCOUNT
                  </h7>

                  <div className="info-row p-2 m-1">
                    <div class="input-group flex-nowrap">
                      <span class="input-group-text" id="addon-wrapping">New Password</span>
                      <input type="password" class="form-control" placeholder="Password" aria-label="password" aria-describedby="addon-wrapping"></input>
                    </div>
                    <div class="input-group flex-nowrap pt-4">
                      <span class="input-group-text" id="addon-wrapping">Re-enter New Password</span>
                      <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping"></input>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
