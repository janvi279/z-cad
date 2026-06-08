import React from "react";
import { useNavigate } from "react-router-dom";
// import ZCADLogo from '../../../ZCADICON.png'

const RegisterSelection = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">

        <div className="flex flex-col items-center mb-8">

          {/* <img
            src={}
            alt="logo"
            className="h-[80px]"
          /> */}

          <h2 className="text-3xl font-bold mt-4">
            Choose Registration Type
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            onClick={() =>
              navigate("/author-register")
            }
            className="border rounded-xl p-8 cursor-pointer hover:shadow-lg hover:border-primary-500 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Author Registration
            </h3>

            <p>
              Register as an Author and
              manage your books,
              products, orders,
              reviews and earnings.
            </p>
          </div>

          <div
            onClick={() =>
              navigate(
                "/distributor-register"
              )
            }
            className="border rounded-xl p-8 cursor-pointer hover:shadow-lg hover:border-primary-500 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Distributor Registration
            </h3>

            <p>
              Register as a Distributor
              and manage assigned
              products, commissions,
              wallet and payouts.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default RegisterSelection;