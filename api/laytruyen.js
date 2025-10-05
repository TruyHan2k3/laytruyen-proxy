import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("http://truyhan.infinityfreeapp.com/layTruyen.php", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Android; ComicReaderApp)",
        "Accept": "application/json,text/plain,*/*",
      },
    });

    const text = await response.text();

    if (text.includes("<html")) {
      return res.status(500).json({
        error: "InfinityFree đã chặn yêu cầu (trả về HTML thay vì JSON)",
        message: "Cần proxy hoặc hosting khác."
      });
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: "Không thể kết nối tới InfinityFree" });
  }
}
