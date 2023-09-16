import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../../Shared/error/Error";

const DoctorUserItem = ({ doctor, deleteUserHandler }) => {
  const [error, setError] = useState("");

  // admin role set
  const handleAdmin = (id) => {
    fetch(`http://localhost:5000/api/v1/doctorProfile/details/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ Role: "Doctor" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusbar === 200) {
          alert(data.message);
          window.location.reload();
        }
      });
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;

    fetch(`http://localhost:5000/api/v1/doctorProfile/details/${doctor?._id}`, {
      method: "PATCH",
      headers: {
        // Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log(responseData);
        setError(responseData.message);
        if (responseData.statusbar === 200) {
          alert(responseData.message);
          setError("");
          window.location.reload();
        } else {
          setError("not change");
        }
      });
  };

  return (
    <>
      <tr key={doctor?._id} className="max-w-lg">
        <td className="whitespace-nowrap  px-4 py-2 font-medium text-gray-900">
          {doctor?.FirstName} {doctor?.LastName}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {doctor?.Email}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {doctor?.DoctorType}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {doctor?.status}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {doctor?.PerHourCharge}
        </td>
        <td className="whitespace-nowrap px-4 py-2">
          {doctor?.Role === "Doctor" ? (
            <button className="disabled bg-slate-400 text-white px-8 py-2">
              Role set
            </button>
          ) : (
            <div onClick={() => handleAdmin(doctor._id)}>
              <SecondaryButton>select by doctor</SecondaryButton>
            </div>
          )}
        </td>
        <td className="whitespace-nowrap px-4 py-2">
          <Link
            to={`/DoctorDetails/${doctor?._id}`}
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            View details
          </Link>
        </td>
        <td
          onClick={() => deleteUserHandler(doctor?._id)}
          className="whitespace-nowrap px-4 py-2"
        >
          <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
            delete user
          </button>
        </td>
        <select
          onChange={handleStatusChange}
          className="h-8 w-72 rounded border-gray-200 bg-gray-50 p-0 text-center text-lg text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          id="nameSelect"
          name="selectedName"
        >
          <option className="bg-gray-300">status</option>
          <option value="active">Active</option>
          <option value="inactive">inActive</option>
          <option value="blocked">Blocked</option>
        </select>
        {error && <Error>{error}</Error>}
      </tr>
    </>
  );
};

export default DoctorUserItem;
