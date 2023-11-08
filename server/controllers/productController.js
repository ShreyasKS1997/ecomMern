const { isReadable } = require('nodemailer/lib/xoauth2');
const asyncErrorHandler = require('../Middleware/asyncErrorHandler');
const productSchema = require('../DBSchema/productSchema');
const ErrorHandler = require('../utils/ErrorHandler');
const ApiFeatures = require('../utils/apiFeatures');
const { v2 } = require('cloudinary');

//Create Product - admin

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 8;

  const productCount = await productSchema.countDocuments();

  const apifeatures = new ApiFeatures(productSchema.find(), req.query)
    .search()
    .filter();

  let products = await apifeatures.query;

  let filteredProductsCount = products.length;

  apifeatures.pagination(resultPerPage);

  products = await apifeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await productSchema.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//update the product - admin
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await productSchema.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await (req.body.images = JSON.parse(req.body.images));

  let images = [];

  if (req.body.images.length <= 1) {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await v2.uploader.destroy(product.images[i].public_id);
    }
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  updateProduct = await productSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    updateProduct,
  });
});

//Delete Product
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Get Product details

exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create or update the review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productSchema.findById(productId);

  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a product
exports.getAllReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await productSchema.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
  const product = await productSchema.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = await product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    ratings = avg / reviews.length;
  }

  const numberOfReviews = reviews.length;

  await productSchema.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
