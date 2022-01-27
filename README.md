[![scrape-it](https://i.epvpimg.com/swnvfab.png)](#)

# imdb-scraper
> A simple Node.js IMDb Title Scraper

Don't know how to use Node.js? Try my <a href="https://18.168.213.34.nip.io/" target="_blank">live demo API</a>.

## :cloud: Installation

```sh
# Clone it
-> git clone https://github.com/baderproductions/imdb-scraper.git
-> npm install

# Use it
-> npm start
-> Go to http://localhost:6005/[IMDB title here]
```

## FAQ

### 1. What response should I expect from the scraper?

**Example from http://localhost:6005/tt0145487**:
  ```js
  {
  "link": "https://www.imdb.com/title/tt0145487",
  "title": "Spider-Man (2002)",
  "year": "2002",
  "rating": "7.3",
  "duration": "2h 1min",
  "genre": "Action",
  "poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "plot": "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family."
}

  ```

### 2. What if I want to scrap more fields?

**In the index.js you have the function scrapeIt(), there you can add or remove fields as you wish.**
**Inspect the IMDb website tags in order to do that.**
 ```js
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

  ```

## :scroll: License

MIT © [BADERproductions](https://baderproductions.co.uk/)
