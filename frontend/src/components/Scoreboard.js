const Scoreboard = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    console.log('socre');

    return (
        <div id="scoreboard">
            <div>{score.timesPlayed}</div>
            <div>{score.wins}</div>
            <div>{(score.wins / score.timesPlayed).toFixed(1)}%</div>
            <div>{score.streak}</div>
        </div>
    );
}

export { Scoreboard }