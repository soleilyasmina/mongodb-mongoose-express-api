# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# MongoDB, Mongoose, and Express: Building an API

Let's start!

```sh
cd mongodb-mongoose-express-api
npm init -y && npm install mongoose
mkdir db models seed
touch db/index.js models/product.js seed/products.js
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
    .then(() => {
        console.log('Successfully connected to MongoDB.');
      })
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
        description: { type: String, required: true },
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

Awesome, so this products "seed" file above is a script that, once executed, connects to the Mongo database and creates 7 products in the products collection.

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

Cool, enough Mongoose. Now, Express. Let's install Express:

```sh
npm install express
```
And now let's create our Express boilerplate:

```sh
touch server.js
```

Add the code:

```js
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send("This is root!");
});
```

Let's make sure our server works:

```sh
node server.js
open localhost:3000
```

Awesome! Next we want to be able to access our Product model from within the models folder.
Add the following to the top of your server.js file:

```js
const Product = require('./models/product');
```

Let's create the route to show all products:

```js
app.get('/products', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})
```

Restart the server and test the route:

```sh
node server.js
```

Try it in your browser: http://localhost:3000/products

Now I would like to see a specific product.
Let's say you type http://localhost:3000/products/5e385d110909f66c6404fbc9 then our API should respond with the product where id equals 2. Express let's us do this via the `req.params` object:

```js
app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.json(product)
})
```

What if the product does not exist in the database? We would get an ugly error message. We can handle this by using a try/catch block:

```js
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) throw Error('Product not found')
        res.json(product)
    } catch (e) {
        console.log(e)
        res.send('Product not found!')
    }
})
```

Does it work? Restart the server and test the route.

```sh
node server.js
```

Open http://localhost:3000/products/5e385d110909f66c6404fbc9 in your browser.

Restarting the server can be a pain! Let's fix this by installing [nodemon](https://nodemon.io)!

```sh
npm install nodemon --save-dev
```

Modify your package.json file:

```js
....
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
....
```

Now run `npm start` and nodemon will watch for changes to your JavaScript files and restart your server :)

Success!

![](http://www.winsold.com/sites/all/modules/winsold/images/checkmark.svg)
