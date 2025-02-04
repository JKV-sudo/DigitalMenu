const express = require('express');
const cors = require('cors');
const app = express();

// Middleware:
app.use(cors());           // Erlaubt Zugriffe vom React-Frontend
app.use(express.json());   // Damit Express JSON-Body lesen kann

// Routen importieren:
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Server starten:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
