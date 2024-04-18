const express = require('express')
const router = express.Router();
const cors = require('cors');

// const CompanyImage = require('../model/CompanyImage');
// const { upload } = require('../middleware/multerConfig'); // Adjust the path as necessary
// const Company = require('../model/Company')

const {check, validationResult} = require('express-validator');

const User = require('../Models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
// const auth = require('../middleware/auth');
const config = require('config');
const jwtAuth = require('../middleware/auth');

router.use(cors());

router.post('/user/create', 
[
    check('fullName', 'Please enter your full name!').not().isEmpty(),
    check('email', 'Please enter a valid northeastern email ID!').isEmail(),
    check('password', 'Please a valid strong password. Requirements -  1 Upper Case Letter, 1 special Character, 1 number and 8 or more characters!').isStrongPassword(),
    check('type', 'Type must be either customer or admin').isIn(['customer', 'admin']),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, type } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: `User with email ${email} already exists!` }] });
        }

        user = new User({
            fullName, 
            email,
            password,
            type, 
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        const payload = {
          user: {
              id: user.id
          }
      }

      jwt.sign(
          payload, 
          config.get('jwtSecret'),
          {expiresIn: 360000 }, 
          (err, token)=> {
              if(err) throw err;
              res.json({token});
          })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/user/login', async (req, res) => {
  try {
      console.log(req.body, req.headers);
      let emailin = req.body.email;
      let passwordin = req.body.password;
      console.log(emailin + passwordin);
      const user = await User.findOne({ email: emailin });
      if (!user) {
          return res.status(404).json({ "message": "This user doesn't exist" });
      }
      console.log("Login User: ")
      console.log(user);
      console.log(user.password);
      const isMatch = await bcrypt.compare(passwordin, user.password);

      if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      } else {
          console.log("Authenticated");
          // Assuming 'role' is a property of the user object that indicates their role
          const payload = {
              user: {
                  id: user.id,
                  type: user.type // Include the user's role in the token payload
              }
          };
          jwt.sign(
              payload,
              config.get('jwtSecret'),
              { expiresIn: 360000 },
              (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      fullName: user.fullName,
                      email: user.email,
                      type: user.type,
                    },
                  }); // Send the token to the client
              }
          );
      }
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
  }
});


router.put(
    '/user/edit',
    [
      check('fullName', 'Full Name is required').not().isEmpty(),
      check(
        'password',
        'Please enter a valid (strong) password. Requirements -  1 Upper Case Letter, 1 special Character, 1 number and 8 or more characters'
      ).isStrongPassword(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { fullName, email, password } = req.body;
  
      try {
        const user = await User.findOne({ email });
  
        if (!user) {
          return res.status(404).json({
            errors: [
              {
                msg: `No user found with email ${email}. Please enter a valid email ID`,
              },
            ],
          });
        }
  
        const updatedUser = user;
  
        if (fullName) updatedUser.fullName = fullName;
        if (password) updatedUser.password = password;
  
        await user.updateOne({
          $set: {
            fullName: updatedUser.fullName,
            password: updatedUser.password,
          },
        });
  
        await user.updateOne({
          $set: { updated: true },
        });
  
        res.status(200).json(`User details updated for ${email}`);
      } catch (error) {
        res.status(500).json(error.message);
      }
    }
  );
  router.post('/updatePreferences', jwtAuth(), async (req, res) => {
    try {
        const userId = req.user.id; // Assuming your auth middleware attaches the user id to req.user
        const { favoriteGenres, favoriteActors, favoriteDirectors, preferredLanguages } = req.body;

        // Find the user by id and update their preferences
        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                favoriteGenres,
                favoriteActors,
                favoriteDirectors,
                preferredLanguages
            }
        }, { new: true }); // { new: true } returns the updated document

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user); // Send back the updated user document
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

  router.delete(
    '/user/delete',
    [
      check('fullName', 'Full Name should be entered').isEmpty(),
      check('email', 'Please enter a valid northeastern email ID').isEmail(),
      check('password', 'Please do not enter password').isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (!user) {
          return res.status(400).json({ errors: [{ msg: 'User not found!' }] });
        }
  
        await User.deleteOne({ email });
        return res.status(200).json('User deleted successfully!');
      } catch (error) {
        console.log(error.message);
        res.status(500).json('server Error');
      }
    }
  );

  router.get('/user/getAll', jwtAuth(true), async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        if (!users.length) { 
            return res.status(404).json('No users found in the Database!');
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
  
//   router.post('/user/uploadImage', upload.single('image'), async (req, res) => {
//     const { email } = req.body; 

//     if (!req.file) {
//         return res.status(400).send('No image file uploaded.');
//     }

//     try {
//         // Update the user document with the image path
//         const updatedUser = await User.findOneAndUpdate(
//             { email: email }, 
//             { imagePath: req.file.path }, 
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).send(`User - ${email} not found.`);
//         }

//         res.status(200).json({
//             message: 'Image uploaded successfully!',
//             imagePath: updatedUser.imagePath
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// router.get('/company/images', async (req, res) => {
//   try {
//       const images = await CompanyImage.find({});
//       res.json(images);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching company images');
//   }
// });

// router.post('/company/uploadImage', upload.single('image'), async (req, res) => {
//   if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//   }

//   const { name } = req.body;
//   const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 

//   try {
//       const newCompanyImage = new CompanyImage({
//           name,
//           imageUrl
//       });

//       await newCompanyImage.save();
//       res.status(201).json({
//           message: 'Image uploaded successfully!',
//           data: newCompanyImage
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//   }
// });

// router.post('/create/m',jwtAuth(true), [
//   check('name', 'Company name is required!').not().isEmpty(),
//   check('jobTitle', 'Job Title is required!').not().isEmpty(),
//   check('description', 'Description is required!').not().isEmpty(),
//   check('salary', 'Salary is required!').not().isEmpty(),
// ], async (req,res) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const {name, jobTitle, description, salary} = req.body;    
//   try {

//     company = new Company({
//         name, 
//         jobTitle,
//         description,
//         salary, 
//     });
    
//     await company.save();
    
//     res.status(200).send(`Job ${jobTitle} added successfully for ${name}`);
// } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
// }
// });

module.exports = router;
