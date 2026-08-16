// Vercel Function entry — tái sử dụng toàn bộ Express app ở backend/src/app.js
require("dotenv").config({ quiet: true });

module.exports = require("../backend/src/app");
