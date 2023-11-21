/**
 * @jest-environment
 */

import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { afterAll, beforeAll, describe, test } from "@jest/globals";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = globalThis.testEnv;
});

afterAll(async () => {
  await testEnv?.clearFirestore();
});

describe("app", () => {
  test("Example", async () => {
    // Create base data for test.
    const profile = {
      name: "Jason",
    };

    // Write prepared data to database for test.
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const firestore = await context.firestore();
      const profileRef = firestore.collection("profile").doc("user");
      await profileRef.set(profile);
    });
  });
});
