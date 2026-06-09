# MobiMart

A full stack modern smartphone shopping web app built with a seamless e-commerce experience, allowing users to browse products, view detailed information, and add items to cart effortlessly.
It features an intuitive UI with product listings, filtering, and responsive design created with React Frontend, Node/Express Backend, Mongodb and Bootstrap.

---

## Demo Link
[Live Demo](https://myshoppingapp-five.vercel.app/)

---

## Quick Star
```
git clone https://github.com/codingwithabhra/smartphone_app.git
cd <your-repo>
npm install
npm run dev # or `npm start` / `yarn dev`
```

## Technologies
- React Js
- React Router
- Node Js
- Express Js
- Mongodb
- Bootstrap

---

## Demo Video
Watch a walkthrough (5-7 minutes) of all the major features of this app : [watch video](https://drive.google.com/drive/folders/1R0d8YmwR3WZHGrQTe54U07h-hhpje1KI?usp=sharing)

---

## Features
**Home**
- Newly arrived phone list.
- Category wise groupings.
- Search by model name.
- Cart and wislist access
- User name and image display

**Product Details**
- Product Images.
- 'Add to wishlist' & 'Add to cart' buttons.
- Pruduct full details (name, discount, rating, reviews, prices, features)

**Product Listing**
- Product List from a particular category.
- Filtering option (by ram, storage or price).
- Clear filter button.

**Wishlist**
- All wishlisted products.
- Move to cart option.

**Cart**
- All products added to cart.
- Move to wishlist option.
- Place order option.

**Check Out**
- Product added for check out.
- Check Out option.
- Add new address option.

**User Details**
- User's detailed information.
- All the saved addresses.
- Complete order history.
- Add new address option.

## API reference
### **GET /api/products**
Get all products<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **POST /api/products**
Send new products<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **POST /api/products/:productId**
For updating database for a particular product<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **POST /api/products/productdetails/:productId**
To get a particular product<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **GET /api/wishlist**
Get all wishlisted products<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **POST /api/wishlist**
Add new product to wishlist<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **DELETE /api/wishlist/:wishlistId**
Delete product from wishlist<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **GET /api/cart**
Get all cart products<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **POST /api/cart**
Add new product to cart<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **DELETE /api/cart/:cartId**
Delete product from cart<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **GET /api/orderhistory**
Get all ordered products<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **POST /api/orderhistory**
Add new product to order history<br>
Sample Response:<br>
```
[{_id, weight, storage, reviewCount, ratingsCount, backCam, processor, originalPrice, os, modelRating, newArrival, battery, brand, color, backCam, largeHeader, imageUrl, discountedPrice},...]
```

### **GET /api/address**
Get all saved addresses<br>
Sample Response:<br>
```
[{_id, name, address, pincode, phone},...]
```

### **POST /api/address**
Add new addresss<br>
Sample Response:<br>
```
[{_id, name, address, pincode, phone},...]
```

### **DELETE /api/address/:addressId**
Delete addresss<br>
Sample Response:<br>
```
[{_id, name, address, pincode, phone},...]
```

### **POST /api/address/:addressId**
Update addresss<br>
Sample Response:<br>
```
[{_id, name, address, pincode, phone},...]
```

---

## Contact
For bugs or feature request, please reach out to patra.abhra97@gmail.com
