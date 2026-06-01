import React, { useState } from "react";
import { distributorLogin } from "../../services/distributorApi";
import { useNavigate } from "react-router-dom";

const DistributorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await distributorLogin(formData);

      localStorage.setItem(
        "distributorToken",
        response.token
      );

      localStorage.setItem(
        "distributor",
        JSON.stringify(response.distributor)
      );

      navigate("/distributor/dashboard");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">

        <h3>Distributor Login</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default DistributorLogin;