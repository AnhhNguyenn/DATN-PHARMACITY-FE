import React from "react";
import { GeneralInfoForm } from "./GeneralInfoForm";
import "./profile.css";

export default function Profile() {
    return (
        <div className="profile-container">
            <GeneralInfoForm />
        </div>
    );
}