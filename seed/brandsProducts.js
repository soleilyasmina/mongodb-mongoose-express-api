const db = require("../db");
const Brand = require("../models/brand");
const Product = require("../models/product");

const main = async () => {
  const appleBrand = new Brand({ name: "Apple", url: "https://www.apple.com" });
  await appleBrand.save();

  const vespaBrand = new Brand({ name: "Vespa", url: "https://www.vespa.com" });
  await vespaBrand.save();

  const newBalanceBrand = new Brand({
    name: "New Balance",
    url: "https://www.newbalance.com",
  });
  await newBalanceBrand.save();

  const tribeBicyclesBrand = new Brand({
    name: "Tribe",
    url: "https://www.tribebicycles.com",
  });
  await tribeBicyclesBrand.save();

  const stumptownBrand = new Brand({
    name: "Stumptown",
    url: "https://www.stumptowncoffee.com",
  });
  await stumptownBrand.save();

  const products = [
    {
      title: "Apple AirPods",
      description: "https://www.apple.com/airpods",
      price: "250",
      brand: appleBrand._id,
    },
    {
      title: "Apple iPhone Pro",
      description: "https://www.apple.com/iphone-11-pro",
      price: "1000",
      brand: appleBrand._id,
    },
    {
      title: "Apple Watch",
      description: "https://www.apple.com/watch",
      price: "499",
      brand: appleBrand._id,
    },
    {
      title: "Vespa Primavera",
      description: "https://www.vespa.com/us_EN/vespa-models/primavera.html",
      price: "3000",
      brand: vespaBrand._id,
    },
    {
      title: "New Balance 574 Core",
      description: "https://www.newbalance.com/pd/574-core/ML574-EG.html",
      price: "84",
      brand: newBalanceBrand._id,
    },
    {
      title: "Tribe Messenger Bike 004",
      description:
        "https://tribebicycles.com/collections/messenger-series/products/mess-004-tx",
      price: "675",
      brand: tribeBicyclesBrand._id,
    },
    {
      title: "Stumptown Hair Bender Coffee",
      description: "https://www.stumptowncoffee.com/products/hair-bender",
      price: "17",
      brand: stumptownBrand._id,
    },
  ];

  await Product.insertMany(products);
  console.log("Created products!");
};

const run = async () => {
  await main();
  db.close();
};

run();
