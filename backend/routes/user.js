const  express = require('express')
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken")
const JWT_SECRET =require( "../config");
const { User, Account } = require("../db");
const {authMiddleware}= require("../middleware")

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  router.post("/signup", async (req, res) => {
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1+ Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin",async (req, res) => {
    const {success} = signinBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

    res.json({
        token: token
    })
    return;
}

res.status(411).json({
    message: "Error while logging in"
})

})




const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware , async (req, res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
      }

       await User.updateOne(
         { _id: req.userId },  // Correct filter to find the document
         { $set: req.body }    // Correct update operation
         );
        
        res.json({
            message: "Updated Successfully"
        })
})



router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      $and: [
        {
          $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } }
          ]
        },
        { _id: { $ne: req.userId } } // exclude logged-in user
      ]
    };

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ firstName: 1 });

    res.json({
      users: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      })),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});


   // user.js
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Get user by ID from token
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get balance from Account model
    const account = await Account.findOne({ userId: req.userId });

    res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: account ? account.balance : 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;