const express = require('express');
const app = express();
app.use(express.json());

let pendingDonations = [];

app.post('/saweria-webhook', (req, res) => {
  const data = req.body;
  if (!data) return res.sendStatus(400);

  pendingDonations.push({
    donatur: data.donator_name || "Anonim",
    jumlah: data.amount || 0,
    pesan: data.message || ""
  });

  console.log("Donasi masuk:", data);
  res.sendStatus(200);
});

app.get('/get-donations', (req, res) => {
  res.json(pendingDonations);
  pendingDonations = [];
});

app.get('/', (req, res) => {
  res.send('Server aktif!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server berjalan di port ' + PORT));
