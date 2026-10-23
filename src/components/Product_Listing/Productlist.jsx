import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import { useFilterContext } from "../../contexts/filterContext";
import { BASE_URL } from "../../config/config";
import "./Productlist.css";
import { useCartContext } from "../../contexts/cartContext";
import { LuDot } from "react-icons/lu";

const Productlist = () => {
  const { filter } = useFilterContext();
  const { products, loading } = useCartContext();
  const brandName = useParams();
  console.log(brandName);

  // Category filter first

  const categoryProducts = (products || [])
    .filter(
      (product) =>
        product.brand?.toLowerCase() === brandName.brandName?.toLowerCase(),
    )
    .map((product) => {
      // Find variants matching all selected filters
      const matchingVariants = product.variants.filter((variant) => {
        const ramMatch =
          filter.ram.length === 0 || filter.ram.includes(variant.ram);

        const storageMatch =
          filter.storage.length === 0 ||
          filter.storage.includes(variant.storage);

        const price = variant.discountedPrice;

        const priceMatch =
          filter.price.length === 0 ||
          filter.price.some((selectedPrice) => {
            switch (selectedPrice) {
              case "10000":
                return price <= 10000;

              case "30000":
                return price > 10000 && price <= 30000;

              case "60000":
                return price > 30000 && price <= 60000;

              case "above60000":
                return price > 60000;

              default:
                return false;
            }
          });

        return ramMatch && storageMatch && priceMatch;
      });

      return {
        ...product,
        matchingVariants,
      };
    })
    .filter((product) => product.matchingVariants.length > 0);

  console.log("Product brand is -- ", categoryProducts);

  return (
    <>
      <div className="productList">
        <div className="container-fluid">
          <h2 className="px-0 px-md-1 px-lg-4 py-4 fw-semibold">
            {brandName.brandName} Phones ({categoryProducts.length})
          </h2>
          <div className="row px-0 px-md-1 px-lg-4">
            {loading ? (
              <p>Product List is loading ...</p>
            ) : categoryProducts?.length === 0 ? (
              <p>No products found.</p>
            ) : (
              categoryProducts?.map((product) => {
                const displayVariant = product.matchingVariants[0];

                return (
                  <div key={product._id} className="mb-4">
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/products/productdetails/${product._id}`}
                    >
                      <div className="card shadow-sm border-0 p-3">
                        <div className="row align-items-center">
                          {/* IMAGE CARD */}
                          <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                            <img
                              src={displayVariant.imageUrl}
                              className="img-fluid rounded"
                              alt={product.smallHeader}
                              style={{
                                maxHeight: "180px",
                                objectFit: "contain",
                              }}
                            />
                          </div>

                          {/* DETAILS CARD */}
                          <div className="col-12 col-md-5">
                            <div className="card-body">
                              <h5 className="card-title fw-bold fs-4 mb-1">
                                {product.smallHeader}
                              </h5>
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <div className="card-text">
                                  {product.modelRating}
                                </div>
                                <div>
                                  <StarRating rating={product.modelRating} />
                                </div>
                              </div>
                              <p className="text-muted small mb-2">
                                {product.ratingCount} ratings &{" "}
                                {product.reviewsCount} reviews
                              </p>
                              <ul className="features list-unstyled small mb-0">
                                <li className="mb-1">{product.display}</li>
                                <li className="mb-1">{product.frontCam}</li>
                                <li className="mb-1">{product.backCam}</li>
                                <li className="mb-1">{product.battery}</li>
                                <li className="mb-1">{product.os}</li>
                              </ul>
                            </div>
                          </div>

                          {/* PRICE CARD */}
                          <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
                            <div className="card-body">
                              <h4 className="fw-bold mb-1">
                                ₹
                                {displayVariant.discountedPrice.toLocaleString(
                                  "en-IN",
                                )}{" "}
                              </h4>
                              <p className="text-muted text-decoration-line-through small mb-0">
                                ₹
                                {displayVariant.originalPrice.toLocaleString(
                                  "en-IN",
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <hr />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Productlist;
