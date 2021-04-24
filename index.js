#!/usr/bin/env node

const { default: axios } = require("axios");
const readline = require("readline");
const Table = require("cli-table");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your GitHub Handle?", async function (answer) {
  try {
    var profileInfo = await axios.get(`https://api.github.com/users/${answer}`);
  } catch (error) {
    console.log("Something went unexpected!");
  }

  const { name, company, location, followers, following } = profileInfo.data;

  const profileTable = new Table();

  profileTable.push(
    { Name: name || "" },
    { Company: company || "" },
    { Location: location || "" },
    { Followers: followers || "" },
    { Following: following || "" }
  );

  console.log(profileTable.toString());

  rl.close();
});
