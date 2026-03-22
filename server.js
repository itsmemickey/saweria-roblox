const express = require('express');
const app = express();
app.use(express.json());

let pendingDonations = [];

// ============================================================
// WEBHOOK dari Saweria
// Kolom "Dari" (donator_name) = username Roblox yang diketik donatur
// Kolom "Pesan" (message)     = pesan/ucapan donatur
// Validasi username dilakukan di sisi Roblox lewat Players API
// ============================================================
app.post('/saweria-webhook', (req, res) => {
  const data = req.body;
  if (!data) return res.sendStatus(400);

  console.log("=== SAWERIA WEBHOOK ===");
  console.log(JSON.stringify(data, null, 2));
  console.log("=======================");

  const robloxUsername = (data.donator_name || "").trim();
  const message        = data.message       || "";
  const amount         = data.amount_raw    || 0;

  console.log(`Roblox username : ${robloxUsername || "(kosong)"}`);
  console.log(`Pesan           : ${message}`);
  console.log(`Amount          : ${amount}`);

  pendingDonations.push({
    roblox_username : robloxUsername,  // langsung dari kolom "Dari"
    donatur_message : message,
    amount          : amount,
  });

  res.sendStatus(200);
});

// ============================================================
// GET donations (di-poll oleh Roblox)
// ============================================================
app.get('/get-donations', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(pendingDonations);
  pendingDonations = [];
});

app.get('/', (req, res) => res.send('Saweria-Roblox server aktif!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server berjalan di port ' + PORT));
