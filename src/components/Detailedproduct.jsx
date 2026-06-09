import StarRating from "../components/StarRating";
import { useWishlist } from "./wishlistContext";
import useProductDetails from "../customHooks/useProductDetails";
import { useCartContext } from "./cartContext";
import { useState } from "react";

const ProductDetails = () => {
  // state variable for variant selection
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const { addToWishlist } = useWishlist();

  const {
    product: findProduct,
    loading,
    error,
    discountPercentage,
  } = useProductDetails();

  console.log("found product -- ", findProduct);

  const { addToCart } = useCartContext();

  if (loading) return <p>Loading the product...</p>;
  if (error) return <p>Error loading product.</p>;

  const resetVariants = () => {
    setSelectedColor("");
    setSelectedRam("");
    setSelectedStorage("");
  };

  return (
    <>
      <div className="card mt-5 mb-5" style={{ border: "none" }}>
        <div className="row g-5">
          <div className="col-md-4">
            <img
              src={findProduct.imageUrl}
              className="img-fluid rounded-start"
              alt="..."
            />
            <div className="d-flex flex-column gap-2 mt-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  addToWishlist({
                    productId: findProduct._id,
                    title: findProduct.smallHeader,
                    image: findProduct.imageUrl,
                    price: findProduct.discountedPrice,
                    variant: {
                      color: selectedColor,
                      ram: selectedRam,
                      storage: selectedStorage,
                    },
                  });
                  resetVariants();
                }}
              >
                Add to wishlist
              </button>
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => {
                  addToCart({
                    productId: findProduct._id,
                    variant: {
                      color: selectedColor,
                      ram: selectedRam,
                      storage: selectedStorage,
                    },
                  });
                  resetVariants();
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {/* HEADING & REVIEWS */}
              <div className="firstPart mb-4">
                <h5 className="card-title fs-2 fw-normal">
                  {findProduct.smallHeader}, {findProduct.largeHeader}
                </h5>
                <div className="d-flex align-items-center gap-2 mt-3">
                  <div className="card-text">{findProduct.modelRating}</div>
                  <div>
                    <StarRating rating={findProduct.modelRating} />
                  </div>
                </div>
                <p className="fw-semibold mt-3">
                  {findProduct.ratingCount} ratings & {findProduct.reviewsCount}{" "}
                  reviews
                </p>
              </div>

              {/* PRICE & DISCOUNT */}
              <div className="pricePart mb-4">
                <h4 className="card-text fs-1 fw-bold">
                  ₹{findProduct.discountedPrice}{" "}
                  <span className="fw-normal fs-6 text-decoration-line-through">
                    ₹{findProduct.originalPrice}
                  </span>
                </h4>
                <p className="card-text fs-5 fw-light">
                  {discountPercentage}% off
                </p>
              </div>

              {/* COLOR */}
              <div className="color d-flex gap-3 mb-2">
                <h4 className="fs-5">Color :</h4>
                <div className="d-flex flex-wrap gap-2">
                  {findProduct.color.map((color) => (
                    <button
                      key={color}
                      className={`btn btn-sm ${
                        selectedColor === color
                          ? "btn-danger"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM */}
              <div className="color d-flex gap-3 mb-2">
                <h4 className="fs-5">RAM :</h4>
                <div className="d-flex flex-wrap gap-2">
                  {findProduct.ram.map((ram) => (
                    <button
                      key={ram}
                      className={`btn btn-sm ${
                        selectedRam === ram
                          ? "btn-danger"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedRam(ram)}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* PROCESSOR */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Processor :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>
                    {findProduct.processor.brand} {findProduct.processor.type}
                  </p>
                </div>
              </div>

              {/* STORAGE */}
              <div className="color d-flex gap-3 mb-2">
                <h4 className="fs-5">Storage :</h4>
                <div className="d-flex flex-wrap gap-2">
                  {findProduct.storage.map((storage) => (
                    <button
                      key={storage}
                      className={`btn btn-sm ${
                        selectedStorage === storage
                          ? "btn-danger"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedStorage(storage)}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* DISPLAY */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Display :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.display}</p>
                </div>
              </div>

              {/* FRONTCAMERA */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Front Camera :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.frontCam}</p>
                </div>
              </div>

              {/* BACKCAMERA */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Back Camera :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.backCam}</p>
                </div>
              </div>

              {/* BATTERY */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Battery :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.battery} charging</p>
                </div>
              </div>

              {/* WEIGHT */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Weight :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.weight}</p>
                </div>
              </div>

              {/* OS */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Operating system :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.os}</p>
                </div>
              </div>

              {/* SIM SLOT */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Sim :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>
                    {findProduct.hybridSimSlot === true ? "Hybrid" : "Normal"}
                  </p>
                </div>
              </div>

              {/* MODEL */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Model :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.newArrival === true ? "New" : "Old"}</p>
                </div>
              </div>

              {/* BRAND */}
              <div className="color d-flex gap-3">
                <h4 className="fs-5">Brand :</h4>
                <div className="d-flex flex-wrap gap-2">
                  <p>{findProduct.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
