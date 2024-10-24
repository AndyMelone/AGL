import React from "react";
import { Link } from "react-router-dom";

export default function Not_found() {
  return (
    <div className="flex flex-col justify-center items-center flex-grow ">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-lg text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Go back to Home
        </button>
      </Link>
    </div>
  );
}
