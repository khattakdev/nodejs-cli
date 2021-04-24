#!/usr/bin/env node

const { default: axios } = require("axios");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your GitHub Handle?", async function (answer) {
  const profileInfo = await axios.get(`https://api.github.com/users/${answer}`);

  console.log(profileInfo.data);

  rl.close();
});
