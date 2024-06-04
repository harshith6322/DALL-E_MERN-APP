/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Formfield({
  lablename,
  type,
  name,
  value,
  issuprizeme,
  handlesuprizeme,
  handleChange,
  placeholder,
}) {
  console.log(handlesuprizeme);
  return (
    <div>
      <div className=" flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {lablename}
        </label>
        {issuprizeme && (
          <button
            className=" font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
            type="button"
            onClick={handlesuprizeme}
          >
            Suprize me
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required
        onChange={handleChange}
        className=" bg-gray-50 border-gray-300 border text-gray-900 text-sm rounded-lg focus:ring-[#4659ff] outline-none block w-full p-3"
      />
    </div>
  );
}

export default Formfield;
