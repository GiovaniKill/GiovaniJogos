const Scoreboard = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    return (
        <div id="scoreboard" className="absolute inset-0 m-auto w-1/4 h-1/4 rounded-lg p-5 bg-amber-100">
            <div>Jogos: {score.timesPlayed}</div>
            <div>Vitórias: {score.wins}</div>
            <div>Taxa de vitórias: {((score.wins / score.timesPlayed) * 100).toFixed(1)}%</div>
            <div>Sequência de vitórias: {score.streak}</div>
        </div>
    );
}

export { Scoreboard }