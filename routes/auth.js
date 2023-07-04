const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
// const authMiddleware = require('../controller/auth');
const validation = require('../Validation/validation')

const router = express.Router();

router.post('/signup',  async (req, res) => {
    const {error, values}= validation.userValidation(req.body)
    // console.log(req.body);

    if(error){
        res.status(403).send(error)
    }
    else{

    try {
      // Validate request body

    //   const { email, password } = req.body;

      // Check if the user already exists
    //   const existingUser = await user.findOne({email: values.email });
    //   if (existingUser) {
    //     return res.status(409).json({ error: 'User already exists' });
    //   }
      // Hash the password
      const hashedPassword = await bcrypt.hash(values.password, 10);

      // Create a new user
      const user = new User({ email: values.email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}
  }
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
    '/products',
    async (req, res) => {
      try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { name, price } = req.body;
  
        // Create a new product
        const product = new Product({ name, price });
        await product.save();
  
        res.status(201).json({ message: 'Product created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  );
  
  router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
    // res.send('good')
  });

module.exports = router;