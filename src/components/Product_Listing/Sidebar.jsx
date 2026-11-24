import React from "react";
import { useFilterContext } from "../../contexts/filterContext";

const Sidebar = () => {
  const { filter, updateFilter, updateRating, updateSortPrice, clearFilter } =
    useFilterContext();

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

      {/* Existing Filters */}
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

      {/* Rating Slider */}
      <div className="mb-4 pb-3 border-bottom">
        <h6 className="fw-bold mb-3">RATING</h6>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="small text-muted">min</span>

          <span className="fw-semibold small">
            {filter.rating === 0 ? "max" : `${filter.rating}+ ⭐`}
          </span>
        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="5"
          step="0.5"
          value={filter.rating}
          onChange={(e) => updateRating(e.target.value)}
        />

        <div className="d-flex justify-content-between text-muted small">
          <span>0</span>
          <span>5</span>
        </div>
      </div>

      {/* Sort By Price */}
      <div className="mb-4 pb-3 border-bottom">
        <h6 className="fw-bold mb-3">SORT BY PRICE</h6>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="sortPrice"
            id="lowToHigh"
            value="lowToHigh"
            checked={filter.sortPrice === "lowToHigh"}
            onChange={(e) => updateSortPrice(e.target.value)}
          />

          <label className="form-check-label small" htmlFor="lowToHigh">
            Low to High
          </label>
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="sortPrice"
            id="highToLow"
            value="highToLow"
            checked={filter.sortPrice === "highToLow"}
            onChange={(e) => updateSortPrice(e.target.value)}
          />

          <label className="form-check-label small" htmlFor="highToLow">
            High to Low
          </label>
        </div>

        {/* Reset sorting */}
        {filter.sortPrice && (
          <button
            type="button"
            className="btn btn-sm btn-link text-danger text-decoration-none p-0 mt-1"
            onClick={() => updateSortPrice("")}
          >
            Clear sorting
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
