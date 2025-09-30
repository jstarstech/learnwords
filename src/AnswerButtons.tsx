import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { LearnWord } from "./App";
const numpadNumMap = [6, 7, 8, 3, 4, 5, 0, 1, 2];

interface AnswerButtonsProps {
  answers: LearnWord[];
  rightAnswerIdx: number;
  lang: string;
  handleAnswer: (answer: LearnWord) => void;
}

export default function AnswerButtons({
  answers,
  rightAnswerIdx,
  lang,
  handleAnswer,
}: AnswerButtonsProps) {
  const [answerClickedIdx, setAnswerClickedIdx] = useState(-1);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const _answerIndex = numpadNumMap.indexOf(Number(event.key) - 1);

      if (_answerIndex !== -1) {
        setAnswerClickedIdx(answers[_answerIndex].idx);
        handleAnswer(answers[_answerIndex]);
      }
    },
    [answers, handleAnswer]
  );

  useEffect(() => {
    setAnswerClickedIdx(-1);
  }, [answers]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Grid
      container
      width="100%"
      spacing={1}
      mx={0}
      className="bg-white rounded-2xl shadow-xl p-4"
    >
      {answers.map((answer, index) => (
        <Grid key={index} size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
          <Box
            component="span"
            sx={{
              position: "absolute",
              mt: 0.5,
              ml: 1,
              color: "#dadada",
              userSelect: "none",
            }}
          >
            {numpadNumMap[Number(index)] + 1}
          </Box>
          <Box
            component="span"
            sx={{
              py: 4,
              cursor: "pointer",
              border: "1px dashed gray",
              borderRadius: "5px",
              transition: "background 0.5s",
              userSelect: "none",
              ...(answerClickedIdx === -1 && {
                "&:hover": {
                  backgroundColor: "#ededed",
                },
              }),
              ...(answerClickedIdx !== -1 &&
                answer.idx === rightAnswerIdx && {
                  border: "1px dashed green",
                  backgroundColor: "#e5ffe2",
                }),
              ...(answerClickedIdx === answer.idx &&
                answer.idx !== rightAnswerIdx && {
                  border: "1px dashed #ff0000",
                  backgroundColor: "#fceaea",
                }),
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={(e) => {
              e.preventDefault();
              setAnswerClickedIdx(answer.idx);
              handleAnswer(answer);
            }}
          >
            {answer.word[lang]}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
