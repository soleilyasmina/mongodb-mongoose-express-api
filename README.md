# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Express, Mongoose, & MongoDB

Let's start!

```sh
cd express-mongo-api
npm init -y && npm install mongoose express
mkdir db models seed
touch db/index.js models/product.js seed/products.js server.js
```

Now let's open up Visual Studio Code and write some code:

```sh
code .
```

Inside our `db` folder we are going to use Mongoose to establish a connection to our MongoDB `productsDatabase`:

express-mongo-api/db/index.js
```js
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/productsDatabase', { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
```

Although, MongoDB is schema-less, Mongoose allows us to write a schema for our product model which makes it nice to know what is a product in our database and what a product "looks" like in our database:

express-mongo-api/models/user.js
```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        title: { type: String, required: true },
        description: { type: Number, required: true },
        price: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('products', Product)
```

Cool. We have a "blueprint" for what a product is. Let's now use it and create products.

express-mongo-api/seed/products.js
```js
const db = require('../db')
const Product = require('../models/product')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const products = [
    new Product({ title: 'Apple AirPods', description: 'https://www.apple.com/airpods', price: '250' }),
    new Product({ title: 'Apple iPhone Pro', description: 'https://www.apple.com/iphone-11-pro', price: '1000' }),
    new Product({ title: 'Apple Watch', description: 'https://www.apple.com/watch', price: '499' }),
    new Product({ title: 'Vespa Primavera', description: 'https://www.vespa.com/us_EN/vespa-models/primavera.html', price: '3000' }),
    new Product({ title: 'New Balance 574 Core', description: 'https://www.newbalance.com/pd/574-core/ML574-EG.html', price: '84' }),
    new Product({ title: 'Tribe Messenger Bike 004', description: 'https://tribebicycles.com/collections/messenger-series/products/mess-004-tx', price: '675' }),
    new Product({ title: 'Stumptown Hair Bender Coffee', description: 'https://www.stumptowncoffee.com/products/hair-bender', price: '17' })
]
const newProducts = () => {
    products.forEach(async product => await product.save())
}

const run = async () => {
    await newProducts()
    console.log("Created products!")
}

run()
```

Awesome, so this users "seed" file above is a script that, once executed, connects to the Mongo database and creates 7 products in the products collection.

Let's execute our products seed file:

```sh
node seed/products.js
```

So how do we know if it worked? We could drop into the `mongo` interactive shell and check:

```sh
mongo
> use productsDatabase
> db.products.find()
```

Create a .gitignore file `touch .gitignore`!

```sh
/node_modules
.DS_Store
```
