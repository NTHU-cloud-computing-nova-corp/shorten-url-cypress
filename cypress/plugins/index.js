// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose();

function getConfigurationByFile(envConfig) {
  const ENV_CONFIG_FILE = path.resolve("cypress", "configs", `${envConfig}`, `EnvConfig.json`);

  return fs.readJson(ENV_CONFIG_FILE);
}

function hash(message) {
  return crypto
    .createHash("sha256")
    .update(message, "utf8")
    .digest("hex");
}

module.exports = (on, config) => {
  const options = browserify.defaultOptions;
  options.browserifyOptions.plugin.unshift(["tsify"]);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("file:preprocessor", cucumber(options));
  on("task", {
    queryDb(sql) {
      return queryTestDb(sql);
    },
    //wait: timeout,
  });
  // accept a configFile value or use development by default
  const ENV_CONFIG = config.env.ENV || "dev";
  return getConfigurationByFile(ENV_CONFIG);
};

function queryTestDb(sql) {
  const sqlite_path = "/Users/kneskung/RubymineProjects/nova-corp/e-testament-api/app/db/store/development.db";
  const dbPath = path.resolve(__dirname, sqlite_path);
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        db.close();
        console.log(rows);
        return resolve(rows);
      }
    });
  });
}
