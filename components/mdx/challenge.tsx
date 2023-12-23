import React from "react";

type ChallengeType = {
  title: string;
  description: string;
  steps?: string[];
};

const Challenge = ({ description, steps, title }: ChallengeType) => {
  return (
    <article
      className={`bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-300 p-6 rounded`}
    >
      <h2 className={`m-0 p-0`}>{title}</h2>
      <p className={`py-2 text-base`}>{description}</p>

      {steps && (
        <>
          <h3 className={`m-0 p-0`}>Steps:</h3>
          <ol className={`list-outside list-decimal m-0`}>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </article>
  );
};

export { Challenge };
