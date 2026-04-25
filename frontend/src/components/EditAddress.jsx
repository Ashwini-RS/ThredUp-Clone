import React from "react";
import { FaCrosshairs } from "react-icons/fa";

function EditAddress() {
  return (
    <div className="edit-address-page">
      <div className="edit-address-card">

        <h3 className="edit-address-title">EDIT ADDRESS</h3>

        {/* <button className="location-btn">
          <FaCrosshairs /> Use my current location
        </button> */}

        <div className="address-form-grid">

          <input type="text" value="Ashwini" />
          <input type="text" value="8618380092" />

          <input type="text" value="575006" />

          <textarea value="Ganesh Nilaya" />

          <input type="text" value="Dakshina Kannada" />

          <select>
            <option>Karnataka</option>
          </select>

          {/* <input type="text" value="9663631912" /> */}

        </div>

        <div className="address-actions">
          <button className="update-address-btn">UPDATE</button>
        </div>

      </div>
    </div>
  );
}

export default EditAddress;