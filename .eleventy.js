const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {

  // Passthrough copy — static assets (from src)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Collection: articles sorted by date (newest first)
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Collection: featured articles
  eleventyConfig.addCollection("featured", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md")
      .filter(item => item.data.featured)
      .sort((a, b) => b.date - a.date);
  });

  // Collection: articles by category
  eleventyConfig.addCollection("articlesByCategory", function(collectionApi) {
    const articles = collectionApi.getFilteredByGlob("src/articles/*.md");
    const categories = {};
    articles.forEach(article => {
      const cat = article.data.category;
      if (cat) {
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(article);
      }
    });
    Object.keys(categories).forEach(cat => {
      categories[cat].sort((a, b) => b.date - a.date);
    });
    return categories;
  });

  // Filter: reading time (approx 200 words/min)
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1 min";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  });

  // Filter: format date in French
  eleventyConfig.addFilter("dateFr", function(date) {
    if (!date) return "";
    const d = new Date(date);
    const months = [
      "jan.", "fév.", "mars", "avr.", "mai", "juin",
      "juil.", "août", "sept.", "oct.", "nov.", "déc."
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  // Filter: ISO date for datetime attributes
  eleventyConfig.addFilter("dateISO", function(date) {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  });

  // Filter: limit array
  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Filter: exclude current article from recommendations
  eleventyConfig.addFilter("exclude", function(collection, currentUrl) {
    return collection.filter(item => item.url !== currentUrl);
  });

  // Filter: get articles from same category, excluding current
  eleventyConfig.addFilter("sameCategoryExclude", function(collection, category, currentUrl) {
    if (!category) return [];
    return collection.filter(item =>
      item.data.category === category && item.url !== currentUrl
    );
  });

  // Filter: slugify (for breadcrumb category links)
  eleventyConfig.addFilter("slugify", function(str) {
    if (!str) return "";
    return str.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  // Collection: articles by sport (for URL segmentation / analytics)
  eleventyConfig.addCollection("articlesBySport", function(collectionApi) {
    const articles = collectionApi.getFilteredByGlob("src/articles/*.md");
    const sports = {};
    articles.forEach(article => {
      const sport = article.data.sport;
      if (sport) {
        const key = sport.toLowerCase();
        if (!sports[key]) sports[key] = [];
        sports[key].push(article);
      }
    });
    Object.keys(sports).forEach(sport => {
      sports[sport].sort((a, b) => b.date - a.date);
    });
    return sports;
  });

  // Shortcode: tag component
  eleventyConfig.addShortcode("tag", function(category) {
    const classMap = {
      "pickleball": "tag--pickleball",
      "padel": "tag--padel",
      "tennis": "tag--tennis",
      "conseils": "tag--conseils",
      "équipement": "tag--equipement",
      "equipement": "tag--equipement",
      "nutrition": "tag--nutrition",
      "tournois": "tag--tournois"
    };
    const cssClass = classMap[(category || "").toLowerCase()] || "tag--pickleball";
    return `<span class="tag ${cssClass}">${category}</span>`;
  });

  // HTML Minification (production)
  eleventyConfig.addTransform("htmlmin", async function(content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return await htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
