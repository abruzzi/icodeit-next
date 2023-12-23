import { FaBookOpen } from "react-icons/fa6";
import React from "react";
import { Chapter } from "contentlayer/generated";
import { SlBadge } from "react-icons/sl";

const getBottomBadge = (chapter: Chapter) => {
  if (chapter.order === 1) {
    return <FaBookOpen size={60} />;
  }

  if (chapter.next === undefined) {
    return <SlBadge size={60} className={`text-brand`} />;
  }

  return <span>{chapter.order}</span>;
};

const getFinalWords = (chapter: Chapter) => {
  if (chapter.order === 1) {
    return "Ready to get started?";
  }

  if (chapter.next === undefined) {
    return "Fantastic work – you've achieved it!";
  }

  return `You have Completed Chapter ${chapter.order}`;
};

const Congratulations = () => {
  return (
    <div className={`text-left`}>
      <p>
        You have made remarkable progress, and I hope you feel proud of the
        skills you have acquired. Your dedication and hard work have paid off,
        and you are now equipped with valuable knowledge for your web
        development journey.
      </p>
      <p>
        As you continue to grow and apply what you have learned, I would like to
        extend an invitation to deepen your understanding even further. I have
        written a book that complements the topics covered in this course,
        offering more insights and advanced techniques. This book is designed to
        be a valuable resource for you, providing detailed explanations and
        practical examples that build upon the foundations we have established
        here.
      </p>
      <p>
        You can find the book in the section following this course. Whether you
        are looking to refine your skills or tackle more complex projects, this
        book can be your guide to the next level of your web development
        journey.
      </p>
      <p>
        Thank you for choosing this course, and I look forward to assisting you
        in your continued learning!
      </p>
    </div>
  );
};

export function Summary({ chapter }: { chapter: Chapter }) {
  return (
    <div className={`flex flex-col items-center my-12`}>
      <div
        aria-hidden="true"
        className={`w-[1px] m-auto h-20 md:h-40 bg-gradient-to-t from-transparent via-brand to-transparent`}
      ></div>
      <div
        className={`w-28 h-28 rounded-full flex items-center justify-center bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-500 text-4xl font-bold`}
      >
        {getBottomBadge(chapter)}
      </div>

      <div className={`text-center`}>
        <h2 className={`text-3xl`}>{getFinalWords(chapter)}</h2>

        {chapter.next ? <p>{chapter.summary}</p> : <Congratulations />}
      </div>
    </div>
  );
}
