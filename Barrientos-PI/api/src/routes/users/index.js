const { Router } = require('express');
const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'viictoriabarrientos@gmail.com' && password === 'password21') {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  })

module.exports = router;