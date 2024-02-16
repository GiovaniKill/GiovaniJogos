const Scoreboard = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    const attemptsPerTry = Object.entries(score.attemptsPerTry)

    const biggestAttemptNumber = attemptsPerTry.reduce((biggest, curr) => {
        if(curr[1] > biggest){
            return curr[1];
        }
        return biggest;
    }, attemptsPerTry[0][1])

    const widthRatioStyling = attemptsPerTry.map((curr) => {
        const ratioPercentage = Math.floor((curr[1] / biggestAttemptNumber) * 100);
        if(ratioPercentage === 0){
            return 1;
        }
        return ratioPercentage;
    })
    console.log('resport: ' + attemptsPerTry[0]);
    console.log('biggest: ' + biggestAttemptNumber);
    console.log('raiot: ' + widthRatioStyling);

    return (
        <div id="scoreboard" className="absolute inset-0 m-auto w-fit h-fit rounded-lg p-5 bg-amber-100">
            <div className="">
                <div>Jogos: {score.timesPlayed}</div>
                <div>Vitórias: {score.wins}</div>
                <div>Taxa de vitórias: {((score.wins / score.timesPlayed) * 100).toFixed(1)}%</div>
                <div>Sequência de vitórias: {score.streak}</div>
            </div>
            <div className="grid grid-cols-12 w-full">
                <span className="col-span-1">1:</span> <div className={`w-[${widthRatioStyling[0]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">2:</span> <div className={`w-[${widthRatioStyling[1]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">3:</span> <div className={`w-[${widthRatioStyling[2]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">4:</span> <div className={`w-[${widthRatioStyling[3]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">5:</span> <div className={`w-[${widthRatioStyling[4]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">6:</span> <div className={`w-[${widthRatioStyling[5]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">7:</span> <div className={`w-[${widthRatioStyling[6]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
                <span className="col-span-1">8:</span> <div className={`w-[${widthRatioStyling[7]}%] h-2 bg-red-500 col-span-11 self-center`}></div>
            </div>
        </div>
    );
}

export { Scoreboard }