"use client";

import { Button, Chip, Radio, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Divider } from "@/components/divider";

type QuizStatus = "initial" | "correct" | "wrong";

const Correct = ({
  title,
  answer,
  explanation,
}: {
  title: string;
  answer: string;
  explanation?: string;
}) => {
  return (
    <div className={`text-center`}>
      <p>{title}</p>
      <p>{answer}</p>
      <Chip variant="bordered" color="success">
        Correct
      </Chip>
      {explanation && <p>{explanation}</p>}
    </div>
  );
};

const Wrong = ({
  title,
  answer,
  hint,
  onBack,
}: {
  title: string;
  answer?: string;
  hint?: string;
  onBack: () => void;
}) => {
  return (
    <div className={`text-center`}>
      <p>{title}</p>
      <p>{answer}</p>
      <Chip variant="bordered" color="warning">
        Not really
      </Chip>
      {hint && <p>{hint}</p>}
      <div className={`flex flex-row justify-end mt-4`}>
        <Button
          startContent={<MdKeyboardArrowLeft size={20} />}
          onClick={onBack}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};

const Initial = ({
  title,
  handleAnswerChange,
  onCheckAnswer,
  questions,
}: {
  title: string;
  handleAnswerChange: (value: string) => void;
  onCheckAnswer: () => void;
  questions: QuestionType[];
}) => {
  return (
    <>
      <RadioGroup label={title} onValueChange={handleAnswerChange}>
        {questions.map((question) => {
          return (
            <Radio
              key={question.value}
              value={question.value}
              description={question.description}
            >
              {question.label}
            </Radio>
          );
        })}
      </RadioGroup>
      <div className={`flex flex-row justify-end mt-4`}>
        <Button color={"default"} onClick={onCheckAnswer}>
          Check answer
        </Button>
      </div>
    </>
  );
};

export type QuestionType = {
  label: string;
  value: string;
  description?: string;
};

const Quiz = ({
  title,
  questions,
  answer,
}: {
  title: string;
  answer: string;
  questions: QuestionType[];
}) => {
  const [selected, setSelected] = useState<string>();

  const handleAnswerChange = (value: string): void => {
    setSelected(value);
  };

  const [status, setStatus] = useState<QuizStatus>("initial");

  const onCheckAnswer = () => {
    if (selected === answer) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  const handleClickBank = () => {
    setStatus("initial");
  };

  return (
    <div className={`my-10 max-w-md m-auto`}>
      <Divider />
      <h2 className={`m-6 text-center`}>It is the time to take a quiz</h2>
      <div
        className={`bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 p-6 rounded`}
      >
        {status === "initial" && (
          <Initial
            title={title}
            handleAnswerChange={handleAnswerChange}
            onCheckAnswer={onCheckAnswer}
            questions={questions}
          />
        )}

        {status === "correct" && <Correct title={title} answer={answer} />}
        {status === "wrong" && (
          <Wrong title={title} answer={selected} onBack={handleClickBank} />
        )}
      </div>
      <Divider />
    </div>
  );
};

export { Quiz };
