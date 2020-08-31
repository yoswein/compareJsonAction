const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

try {
  const firstFilePath = core.getInput("first-packageJson-path");
  const secondFilePath = core.getInput("second-packageJson-path");

  let updated = false;
  let firstFileJson = JSON.parse(fs.readFileSync(firstFilePath, "utf8"));
  let secondFileJson = JSON.parse(fs.readFileSync(secondFilePath, "utf8"));

  let dependenciesA = firstFileJson.dependencies;
  let dependenciesB = secondFileJson.dependencies;

  if (JSON.stringify(dependenciesA) === JSON.stringify(dependenciesB)) {
    core.info(`pacakge.json dependencies objects are equal: ${dependenciesB}`);
  } else {
    core.info("pacakge.json dependencies objects are not equal");
    secondFileJson.dependencies = dependenciesA;
    fs.writeFileSync(secondFilePath, JSON.stringify(secondFileJson, 0, 4));
    updated = true;
  }

  core.setOutput("updated", updated);
} catch (error) {
  core.setFailed(error.message);
}
