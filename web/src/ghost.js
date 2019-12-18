//require("dotenv").config();
import ghostContentAPI from "@tryghost/content-api";

const api = new ghostContentAPI({
  // url: process.env.GHOST_API_URL,
  // key: process.env.GHOST_CONTENT_API_KEY,
   url: 'https://budparr.ghost.io',
  key: '58d161c0eea90dd98cd65ef772',
  version: "v2"
});




export default api;

