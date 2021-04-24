const axios = require("axios");

async function apiCall(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
    console.log("Something went unexpected!");
    process.exit(0);
  }
}

module.exports = {
  apiCall,
};
