import React from 'react';

const Scoreboard = () => {
  const score = JSON.parse(localStorage.getItem('score'));

  const attemptsPerTry = Object.values(score.attemptsPerTry);

  const biggestAttemptNumber = attemptsPerTry.reduce((biggest, curr) => {
    if (curr > biggest) {
      return curr;
    }
    return biggest;
  }, attemptsPerTry[0]);

  const widthRatioStyling = attemptsPerTry.map((curr) => {
    const ratioPercentage = Math.floor((curr / biggestAttemptNumber) * 100);
    if (ratioPercentage === 0) {
      return 1;
    }
    return ratioPercentage;
  });

  return (
    <div
      id="scoreboard"
      className=
        "absolute inset-0 m-auto w-fit h-fit rounded-lg p-5 bg-amber-100">
      <div className="">
        <div>Jogos: {score.timesPlayed}</div>
        <div>Vitórias: {score.wins}</div>
        <div>
            Taxa de vitórias:
          {((score.wins / score.timesPlayed) * 100).toFixed(1)}%
        </div>
        <div>Sequência de vitórias: {score.streak}</div>
      </div>
      <div className="grid grid-cols-12 w-full">
        <span className="col-span-1">1:</span>

        <div className=
          {`w-[${widthRatioStyling[0]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[0] !== 0 ? attemptsPerTry[0] : ''}
        </div>

        <span className="col-span-1">2:</span>

        <div className=
          {`w-[${widthRatioStyling[1]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[1] !== 0 ? attemptsPerTry[1] : ''}
        </div>

        <span className="col-span-1">3:</span>

        <div className=
          {`w-[${widthRatioStyling[2]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[2] !== 0 ? attemptsPerTry[2] : ''}
        </div>

        <span className="col-span-1">4:</span>

        <div className=
          {`w-[${widthRatioStyling[3]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[3] !== 0 ? attemptsPerTry[3] : ''}
        </div>

        <span className="col-span-1">5:</span>

        <div className=
          {`w-[${widthRatioStyling[4]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[4] !== 0 ? attemptsPerTry[4] : ''}
        </div>

        <span className="col-span-1">6:</span>

        <div className=
          {`w-[${widthRatioStyling[5]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[5] !== 0 ? attemptsPerTry[5] : ''}
        </div>

        <span className="col-span-1">7:</span>

        <div className=
          {`w-[${widthRatioStyling[6]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[6] !== 0 ? attemptsPerTry[6] : ''}
        </div>

        <span className="col-span-1">8:</span>

        <div className=
          {`w-[${widthRatioStyling[7]}%] h-4 bg-red-500 col-span-11 self-center
          text-white text-sm flex items-center
          justify-end rounded-lg px-1 text-right`}>
          {attemptsPerTry[7] !== 0 ? attemptsPerTry[7] : ''}
        </div>
      </div>
    </div>
  );
};

export {Scoreboard};