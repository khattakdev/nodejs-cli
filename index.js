#!/usr/bin/env node

const readline = require("readline");
const Table = require("cli-table");
const { apiCall } = require("./utils");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your GitHub Handle?", async function (answer) {
  var profileInfo = await apiCall(`https://api.github.com/users/${answer}`);
  const { name, company, location, followers, following } = profileInfo.data;

  const profileTable = new Table();
  const orgTable = new Table({
    head: ["Organization", "Description"],
  });

  profileTable.push(
    { Name: name || "" },
    { Company: company || "" },
    { Location: location || "" },
    { Followers: followers || "" },
    { Following: following || "" }
  );

  var orgInfo = await apiCall(`https://api.github.com/users/${answer}/orgs`);
  orgInfo.data.forEach((org) => {
    orgTable.push([org.login, org.description.slice(0, 50) + "..."]);
  });

  console.log(profileTable.toString());
  console.log(orgTable.toString());

  rl.close();
});
