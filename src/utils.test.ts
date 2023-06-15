import { describe, expect, it } from "vitest";

import { square } from "./utils";

describe("square", () => {
  it.each`
    n    | result
    ${2} | ${4}
    ${3} | ${9}
  `("square($n) = $result", ({ n, result: expected }) => {
    const result = square(n);

    expect(result).toBe(expected);
  });
});
