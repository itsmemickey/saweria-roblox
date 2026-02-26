const express = require('express');
const app = express();
app.use(express.json());

let pendingDonations = [];

app.post('/saweria-webhook', (req, res) => {
  const data = req.body;
  if (!data) return res.sendStatus(400);

  // LOG SEMUA FIELD yang dikirim Saweria
  console.log("=== SAWERIA WEBHOOK DATA ===");
  console.log(JSON.stringify(data, null, 2));
  console.log("===========================");

pendingDonations.push({
    donatur_name    : data.donator_name || "Anonim",
    donatur_message : data.message      || "",
    amount          : data.amount_raw   || 0,  // ← pakai amount_raw!
});

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
