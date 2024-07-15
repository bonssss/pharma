router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
  
    if (user) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  });
  