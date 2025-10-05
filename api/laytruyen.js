import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // Cho phép mọi domain gọi API

app.get("/laytruyen", async (req, res) => {
  try {
    const response = await fetch("http://truyhan.infinityfreeapp.com/layTruyen.php", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Android) ComicReaderApp",
        "Accept": "application/json,text/plain,*/*",
      },
    });

    const text = await response.text();
    res.type("application/json").send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể lấy dữ liệu từ InfinityFree" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy tại cổng ${PORT}`));
