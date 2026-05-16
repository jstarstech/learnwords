import { describe, expect, it } from "vitest";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import { renderWithTheme } from "./test/test-utils";

describe("CircularProgressWithLabel", () => {
  it("shows the value label", () => {
    const { getByText } = renderWithTheme(
      <CircularProgressWithLabel value={50} valueLabel="2" />
    );

    expect(getByText("2")).toBeInTheDocument();
  });
});
