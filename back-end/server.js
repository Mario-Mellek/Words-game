const express = require('express');
const gameRoutes = require('./src/routes/gameRoutes');

const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());

app.use('/game', gameRoutes);

app.get('/', (_req, res) => {
  res.send('Server Running');
});

app.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
