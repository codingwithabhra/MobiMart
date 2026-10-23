import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Product_Listing/Sidebar";
import Productlist from "../components/Product_Listing/Productlist";
import { FilterProvider } from "../contexts/filterContext";
import "../App.css";
import "../components/Product_Listing/ProductListing.css";

const ProductListing = () => {
  const [showFilter, setShowFilter] = useState(false);

  const closeFilter = () => setShowFilter(false);

  return (
    <FilterProvider>
      <div className="listing-page">
        {/* HEADER */}
        <header className="listing-header">
          <Header />
        </header>

        {/* MAIN CONTENT */}
        <main className="listing-main">
          <div className="container-fluid h-100">
            <div className="row h-100 g-0">
              {/* DESKTOP SIDEBAR */}
              <aside className="col-lg-2 d-none d-lg-block listing-sidebar">
                <Sidebar />
              </aside>

              {/* PRODUCT LIST */}
              <section className="col-12 col-lg-10 listing-content">
                {/* MOBILE FILTER BUTTON */}
                <div className="d-lg-none p-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    onClick={() => setShowFilter(true)}
                  >
                    <i className="bi bi-sliders me-2" />
                    Filters
                  </button>
                </div>

                <Productlist />
              </section>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="listing-footer">
          <Footer />
        </footer>

        {/* MOBILE FILTER DRAWER */}
        {showFilter && (
          <>
            <div className="listing-filter-backdrop" onClick={closeFilter} />

            <aside
              className="listing-filter-drawer d-lg-none"
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
            >
              <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <h5 className="mb-0 fw-bold">Filters</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeFilter}
                  aria-label="Close filters"
                />
              </div>

              <div className="listing-filter-drawer-body">
                <Sidebar />
              </div>

              <div className="p-3 border-top">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={closeFilter}
                >
                  Show Products
                </button>
              </div>
            </aside>
          </>
        )}
      </div>
    </FilterProvider>
  );
};

export default ProductListing;
