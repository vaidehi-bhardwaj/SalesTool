import React, { useState, useEffect } from "react";
import axios from "axios";
import './CompanyInformation.css';

const formConfig = [
  [
    {
      name: "Lead Type",
      label: "Lead Type",
      type: "select",
      options: "leadTypeOptions",
      required: true,
    },
    { name: "Generic email 1", label: "Generic email 1", type: "email" },
    {
      name: "Vertical",
      label: "Vertical",
      type: "select",
      options: "verticalOptions",
      required: true,
    },
  ],
  [
    {
      name: "Company Name",
      label: "Company Name",
      type: "text",
      required: true,
    },
    { name: "Generic email 2", label: "Generic email 2", type: "email" },
    { name: "Lead Assigned to", label: "Lead Assigned to", type: "text" },
  ],
  [
    { name: "Website", label: "Website", type: "url", required: true },
    { name: "Generic phone 1", label: "Generic phone 1", type: "tel" },
    { name: "BDM", label: "BDM", type: "text" },
  ],
  [
    { name: "Address", label: "Address", type: "text", required: true },
    { name: "Generic phone 2", label: "Generic phone 2", type: "tel" },
    {
      name: "Lead Status",
      label: "Lead Status",
      type: "select",
      options: "leadStatusOptions",
    },
  ],
  [
    { name: "City", label: "City", type: "text", required: true },
    {
      name: "Lead Source",
      label: "Lead Source",
      type: "select",
      options: "leadSourceOptions",
    },
    {
      name: "Priority",
      label: "Priority",
      type: "select",
      options: "priorityOptions",
      required: true,
    },
  ],
  [
    {
      name: "State",
      label: "State",
      type: "select",
      options: "stateOptions",
      required: true,
    },
    {
      name: "Total no. of offices",
      label: "Total no. of offices",
      type: "number",
    },
    {
      name: "Next Action",
      label: "Next Action",
      type: "select",
      options: "nextActionOptions",
      required: true,
      datePicker: { name: "dateField", label: "Date" },
    },
  ],
  [
    {
      name: "Country",
      label: "Country",
      type: "select",
      options: "countryOptions",
    },
    {
      name: "Turn Over (INR)",
      label: "Turn Over (INR)",
      type: "select",
      options: "turnOverOptions",
    },
    {
      name: "Lead Usable",
      label: "Lead Usable",
      type: "select",
      options: "leadUsableOptions",
      required: true,
    },
  ],
  [
    {
      name: "Employee Count",
      label: "Employee Count",
      type: "select",
      options: "employeeCountOptions",
    },
    {
      name: "Total no. of Manuf. Units",
      label: "Total no. of Manuf. Units",
      type: "number",
    },
    {
      name: "Reason",
      label: "Reason",
      type: "select",
      options: "reasonOptions",
    },
  ],
  [{ name: "About The Company", label: "About The Company", type: "textarea" }],
];

const FormRow = ({ children }) => <div className="form-row">{children}</div>;

const FormGroup = ({ field, formData, handleChange, errors, options }) => (
  <div className={`form-group ${field.name === "About The Company" ? "full-width" : ""}`}>
    <label htmlFor={field.name}>{field.label}:</label>
    {field.type === "select" ? (
      <div id={field.name} style={{ display: "flex", alignItems: "flex-end" }}>
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className={errors[field.name] ? "mandatory" : ""}
        >
          <option value="">Select {field.label}</option>
          {options[field.options] &&
            options[field.options].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
        {field.datePicker && (
          <div className="date-picker-wrapper">
            <input
              type="date"
              id={field.datePicker.name}
              name={field.datePicker.name}
              value={formData[field.datePicker.name]}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    ) : field.type === "textarea" ? (
      <textarea
        id={field.name}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        className={errors[field.name] ? "mandatory" : ""}
      />
    ) : (
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        className={errors[field.name] ? "mandatory" : ""}
      />
    )}
    {errors[field.name] && <span className="error">{errors[field.name]}</span>}
  </div>
);


const CompanyInformation = () => {
  const [formData, setFormData] = useState(
    formConfig.flat().reduce((acc, field) => {
      acc[field.name] = "";
      if (field.datePicker) {
        acc[field.datePicker.name] = "";
      }
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    formConfig.flat().forEach((field) => {
      if (field.required && !formData[field.name].trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/companyInformation",
          formData
        );
        console.log("Data saved successfully", response.data);
      } catch (error) {
        console.error("Error saving data", error);
      }
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("/Options.json");
        console.log("Options fetched:", response.data);
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <section className="form-section">
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit}>
        {formConfig.map((row, rowIndex) => (
          <FormRow key={rowIndex}>
            {row.map((field) => (
              <FormGroup
                key={field.name}
                field={field}
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                options={options}
              />
            ))}
          </FormRow>
        ))}
        <div className="form-row">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default CompanyInformation;

