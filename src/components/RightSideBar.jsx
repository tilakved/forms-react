/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useData } from "../hooks/useData";

export default function RightSidebar(props) {
  const data = useData();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevValues) => {
      let newValue = prevValues[name];
      if (type === "checkbox") {
        if (newValue && Array.isArray(newValue)) {
          if (checked) {
            newValue.push(value);
          } else {
            newValue = newValue.filter((item) => item !== value);
          }
        } else {
          newValue = checked ? [value] : [];
        }
      } else {
        newValue = value;
      }
      return {
        ...prevValues,
        [name]: newValue,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              min={field.min}
              max={field.max}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        );
      case "textarea":
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        );
      case "dropdown":
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                {field.placeholder || "Select an option"}
              </option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case "radio":
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.options.map((option) => (
              <label key={option.value} className="block text-gray-700">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                  required={field.required}
                  className="mr-2 leading-tight"
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.options.map((option) => (
              <label key={option.value} className="block text-gray-700">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={
                    formData[field.name]?.includes(option.value) || false
                  }
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                  required={field.required}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "slider":
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <label className="block text-gray-700">
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                required={field.required}
                className="mr-2 leading-tight w-full"
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">{data.form.title}</h2>
        <p className="mb-8 text-gray-600">{data.form.description}</p>
        {data.form.groups.map(
          (group, idx) =>
            props.selectedItem === idx && (
              <div key={idx} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{group.title}</h3>
                {group.fields.map((field) => renderField(field))}
              </div>
            )
        )}
        <button
          type="submit"
          className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </>
  );
}
