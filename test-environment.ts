/**
 * @jest-environment
 */

import {
  RulesTestEnvironment,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";

import * as fs from "fs";

const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const MY_PROJECT_ID = "project_id";

declare global {
  var testEnv: RulesTestEnvironment;
}

class CustomEnvironment extends NodeEnvironment {
  constructor(config: any, context: any) {
    super(config, context);
    // console.log(config.globalConfig);
    // console.log(config.projectConfig);

    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    console.log(" ---- setup ---- ");
    await super.setup();
    let testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "127.0.0.1",
        port: 8080,
      },
    });
    this.global.testEnv = testEnv;

    console.log(" -------------- ");
    console.log(this.global.testEnv);
  }

  async teardown() {
    // this.global.testEnv.cleanup();
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
