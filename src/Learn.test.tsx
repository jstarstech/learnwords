import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Learn from "./Learn";
import { StateContext } from "./State";
import { getLearnWords } from "./lib/learning";
import { State } from "./lib/state";
import { renderWithTheme } from "./test/test-utils";

const fixtureWords = Array.from({ length: 10 }, (_value, index) => ({
  eng: `eng-${index}`,
  ua: `ua-${index}`,
  ru: `ru-${index}`,
}));

function renderLearn() {
  const stateDispatch = vi.fn();
  const learnWords = getLearnWords(fixtureWords, "ua", 0);
  const state: State = {
    lang: "ua",
    learnWords,
    wordsStartIdx: 0,
    currentIdx: 0,
    currentWord: {
      stage: learnWords[0].stage,
      word: learnWords[0].word[learnWords[0].stageLang],
    },
    progress: 0,
    isFinished: false,
  };

  renderWithTheme(
    <MemoryRouter>
      <StateContext.Provider value={{ state, stateDispatch }}>
        <Learn />
      </StateContext.Provider>
    </MemoryRouter>
  );

  return stateDispatch;
}

describe("Learn answer flow", () => {
  it("advances the stage when the correct answer is picked", () => {
    const stateDispatch = renderLearn();

    fireEvent.click(screen.getByText("eng-0"));

    expect(stateDispatch).toHaveBeenCalledWith({
      type: "setProgress",
      progress: 3,
    });
    expect(stateDispatch).toHaveBeenCalledWith({
      type: "setCurrentWordStage",
      stage: 1,
    });
  });

  it("resets the stage when a wrong answer is picked", () => {
    const stateDispatch = renderLearn();

    const wrongAnswer = screen
      .getAllByText(/^eng-\d$/)
      .find((element) => element.textContent !== "eng-0");

    fireEvent.click(wrongAnswer!);

    expect(stateDispatch).toHaveBeenCalledWith({
      type: "setProgress",
      progress: 0,
    });
    expect(stateDispatch).toHaveBeenCalledWith({
      type: "setCurrentWordStage",
      stage: -1,
    });
  });
});
