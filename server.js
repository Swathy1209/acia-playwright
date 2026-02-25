const express = require("express");
const { chromium } = require("playwright");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("ACIA Playwright Service Running");
});

app.post("/apply", async (req, res) => {
  const { jobUrl } = req.body;

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(jobUrl);

    // Example: click Apply button (you will customize later)
    await page.waitForTimeout(3000);

    await browser.close();

    res.json({ status: "success", message: "Application attempted" });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});