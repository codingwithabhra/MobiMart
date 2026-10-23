
import React from "react";
import { useFilterContext } from "../../contexts/filterContext";

const Sidebar = () => {
  const { filter, updateFilter, clearFilter } = useFilterContext();

  const filterGroups = [
    {
      title: "RAM",
      key: "ram",
      options: ["4GB", "6GB", "8GB", "12GB", "16GB"],
    },
    {
      title: "STORAGE",
      key: "storage",
      options: ["64GB", "128GB", "256GB", "512GB", "1TB"],
    },
    {
      title: "PRICE",
      key: "price",
      options: ["10000", "30000", "60000", "above60000"],
      labels: [
        "₹10,000 and below",
        "₹30,000 and below",
        "₹60,000 and below",
        "Above ₹60,000",
      ],
    },
  ];

  return (
    <div className="p-3 p-xl-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Filter By</h5>

        <button
          type="button"
          className="btn btn-sm btn-link text-danger text-decoration-none p-0"
          onClick={clearFilter}
        >
          Clear all
        </button>
      </div>

      {filterGroups.map((group) => (
        <div className="mb-4 pb-3 border-bottom" key={group.key}>
          <h6 className="fw-bold mb-3">{group.title}</h6>

          {group.options.map((option, index) => (
            <div className="form-check mb-2" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`${group.key}-${option}`}
                checked={(filter[group.key] || []).includes(option)}
                onChange={() => updateFilter(group.key, option)}
              />

              <label
                className="form-check-label small"
                htmlFor={`${group.key}-${option}`}
              >
                {group.labels?.[index] || option}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
