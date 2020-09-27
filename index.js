const axios = require("axios").default;
const cheerio = require("cheerio");
const cors = require("cors")({ origin: true });
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const app = express();
const port = process.env.PORT || 6005;
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const scrapeIt = async (url) => {
  try {
    const { data } = await axios.get(url).catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
    const selector = cheerio.load(data);
    const link = url;
    const title = selector(".title_wrapper > h1").text().trim();
    const year = selector(".title_wrapper > h1 > span > a").text();
    const poster = selector(".poster > a > img").attr("src").toString();
    const rating = selector(".ratingValue > strong > span").text();
    const duration = selector(".title_wrapper > div > time").text().trim();
    const genre = selector(".title_wrapper > div > a").first().text();
    const plot = selector(".plot_summary  > .summary_text").text().trim();
    return { link, title, year, rating, duration, genre, poster, plot };
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the IMDb url: ${url}`
    );
  }
};

app.get("/", (req, res) => {
  res.status(404).json({
    error: "IMDb title ID required. Ex: http://localhost:6005/tt0145487",
  });
});

app.get("/:title", (req, res) => {
  cors(req, res, () => {
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "GET method allowed only.",
      });
    }
  });

  scrapeIt("https://www.imdb.com/title/" + req.params.title).then((data) => {
    res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log(`Server is online at http://localhost:${port}`);
});
