const Scoreboard = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    console.log('socre');

    return (
        <div id="scoreboard" className="absolute top-1/2 w-1/4 h-1/4 rounded-lg p-10 bg-amber-400">
            <div>{score.timesPlayed}</div>
            <div>{score.wins}</div>
            <div>{(score.wins / score.timesPlayed).toFixed(1)}%</div>
            <div>{score.streak}</div>
        </div>
    );
}

export { Scoreboard }