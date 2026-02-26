const express = require('express');
const app = express();
app.use(express.json());

let pendingDonations = [];

app.post('/saweria-webhook', (req, res) => {
  const data = req.body;
  if (!data) return res.sendStatus(400);

  pendingDonations.push({
    donatur_name    : data.donator_name || "Anonim",
    donatur_message : data.message      || "",
    amount          : data.amount       || 0,
  });

  console.log("Donasi Saweria masuk:", data);
  res.sendStatus(200);
});

app.get('/get-donations', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(pendingDonations);
  pendingDonations = [];
});

app.get('/', (req, res) => res.send('Server aktif!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server berjalan di port ' + PORT));
