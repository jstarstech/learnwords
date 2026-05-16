import { describe, expect, it } from "vitest";
import CurrentWord from "./CurrentWord";
import { renderWithTheme } from "./test/test-utils";

describe("CurrentWord", () => {
  it("renders the active word", () => {
    const { getByText } = renderWithTheme(
      <CurrentWord word="ability" stage={0} />
    );

    expect(getByText("ability")).toBeInTheDocument();
  });
});
