import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import "./../../css/Settings.css";

const Settings = () => {

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar />
      <div class="d-flex align-items-start container m-1 width">
        <div class="nav flex-column nav-pills me-3 p-4 w-50 " id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button class="nav-link buttonCustom  active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General information</button>
          <button class="nav-link buttonCustom" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Language and region</button>
          <button class="nav-link buttonCustom" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Notifications</button>
          <button class="nav-link buttonCustom" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Change email and password </button>
        </div>
        <div class="tab-content width" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <div className="container">
        <div className="settings-content">
          <h6 className="title">General information</h6>
          <div className="account-info">
            <h7 className="section-header">YOUR ACCOUNT</h7>
            <div className="info-row">
              <span className="info-label">User Name:</span>
              <span className="info">example@gmail.com</span>
            </div>
            <div className="info-row">
              <span className="info-label">First Name:</span>
              <span className="info">Jamal</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Name:</span>
              <span className="info">Muhammad</span>
            </div>
            <button className="logout-button">Logout</button>
          </div>
        </div>
      </div>
          </div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
          <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
          <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
