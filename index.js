const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

try {
  const firstFilePath = core.getInput("first-packageJson-path");
  const secondFilePath = core.getInput("second-packageJson-path");

  let firstFileJson = fs.readFileSync(firstFilePath, "utf8");
  let secondFileJson = fs.readFileSync(secondFilePath, "utf8");

  let dependenciesA = firstFileJson.dependencies;
  let dependenciesB = secondFileJson.dependencies;

  if (JSON.stringify(dependenciesA) === JSON.stringify(dependenciesB)) {
    console.log(
      `pacakge.json dependencies objects are equal: ${dependenciesB}`
    );
  } else {
    console.log("pacakge.json dependencies objects are not equal");
    secondFileJson.dependencies = dependenciesA;
    fs.writeFileSync(secondFilePath, secondFileJson);
  }
} catch (error) {
  core.setFailed(error.message);
}
