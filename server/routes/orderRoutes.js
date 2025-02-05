const express = require('express');
const router = express.Router();

// POST /api/orders - Bestell-Endpoint
router.post('/', (req, res) => {
  // Beispiel: { items: [...], total: 12.5 }
  const { items, total } = req.body;
  
  console.log('Neue Bestellung erhalten:', items, total);



  return res.status(201).json({ message: 'Bestellung erfolgreich!', items, total });
});

module.exports = router;
