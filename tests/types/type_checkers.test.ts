import {
  isAPIAdmin,
  isAPIVersion,
  isAvailableGameSystem,
  isCommandResult,
  isDiceRoll,
  isGameSystem,
  isOriginalTableResults,
} from "../../src/types/type_checkers.ts";
import { assert, assertFalse, describe, it } from "../../dev_deps.ts";

describe("type_checkers", () => {
  it("isAPIVersion", () => {
    const correct = {
      api: "1.0.0",
      bcdice: "1.0.0",
    };

    const incorrects = [{}, {
      api: 0,
      bcdice: 1,
    }];

    assert(isAPIVersion(correct));
    for (const entry of incorrects) {
      assertFalse(isAPIVersion(entry));
    }
  });

  it("isAPIAdmin", () => {
    const correct = {
      name: "example-name",
      url: "example-url",
      email: "example@mail.com",
    };

    const incorrects = [{}, {
      name: 0,
      url: 1,
      email: 2,
    }];

    assert(isAPIAdmin(correct));
    for (const entry of incorrects) {
      assertFalse(isAPIAdmin(entry));
    }
  });

  it("isAvailableGameSystem", () => {
    const correct = {
      id: "example-id",
      name: "example-name",
      sortKey: "example-sort_key",
    };

    const incorrects = [{}, { id: 0, name: 1, sort_key: 2 }];

    assert(isAvailableGameSystem(correct));
    for (const entry of incorrects) {
      assertFalse(isAvailableGameSystem(entry));
    }
  });

  it("isDiceRoll", () => {
    const correct = {
      kind: "normal",
      sides: 0,
      value: 1,
    };

    const incorrects = [{}, {
      kind: 0,
      sides: "example-sides",
      value: "example-value",
    }, { id: "pineappleisbestfruit", sides: 0, value: 1 }];

    assert(isDiceRoll(correct));
    for (const entry of incorrects) {
      assertFalse(isDiceRoll(entry));
    }
  });

  it("isCommandResult", () => {
    const correct = {
      text: "example-text",
      secret: true,
      success: false,
      failure: true,
      critical: false,
      fumble: true,
      rands: [{
        kind: "normal",
        sides: 0,
        value: 1,
      }, {
        kind: "normal",
        sides: 0,
        value: 1,
      }],
    };

    const incorrects = [{}, {
      text: 0,
      secret: 1,
      success: 2,
      failure: 3,
      critical: 4,
      fumble: 5,
      rands: 6,
    }, {
      text: "example-text",
      secret: true,
      success: false,
      failure: true,
      critical: false,
      fumble: true,
      rands: [{ id: "pineappleisbestfruit", sides: 0, value: 1 }, {
        id: "mushroomisevil",
        sides: 0,
        value: 1,
      }],
    }];

    assert(isCommandResult(correct));
    for (const entry of incorrects) {
      assertFalse(isCommandResult(entry));
    }
  });

  it("isGameSystem", () => {
    const correct = {
      id: "example-id",
      name: "example-name",
      sortKey: "example-sort_key",
      commandPattern: new RegExp(/example/g),
      helpMessage: "example-help_message",
    };

    const incorrects = [{}, {
      id: 0,
      name: 1,
      sort_key: 2,
      command_pattern: 3,
      help_message: 4,
    }];

    assert(isGameSystem(correct));
    for (const entry of incorrects) {
      assertFalse(isGameSystem(entry));
    }
  });

  it("isOriginalTableResults", () => {
    const correct = {
      text: "example-text",
      rands: [{
        kind: "normal",
        sides: 0,
        value: 1,
      }, {
        kind: "normal",
        sides: 0,
        value: 1,
      }],
    };

    const incorrects = [{}, {
      text: 0,
      rands: 1,
    }];

    assert(isOriginalTableResults(correct));
    for (const entry of incorrects) {
      assertFalse(isOriginalTableResults(entry));
    }
  });
});
