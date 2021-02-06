async function playAgentBestMove () {
    $('#engine_btn').prop('disabled', true)

    var agent = require ('./engines/agent').agent
    
    agent.setPosition (startpos, move_list)
    is_searching = true
    var best_move = await agent.getBestMove (game.turn() === 'w')
    playMove(best_move, true)

    is_searching = false
    $('#engine_btn').prop('disabled', false)
}

async function demo () {
    $('#demo_btn').prop('disabled', true)

    while (!game.game_over()) {
        await playAgentBestMove ()
    }

    $('#demo_btn').prop('disabled', false)
}

function uncheckEngineButton () {
    $('#engine_move').prop('checked', false)
    engine_turn = null
}


$('#engine_move').on('change', () => {

    if ($('#engine_move').is(':checked')) {
        engine_turn = game.turn()
        playAgentBestMove ()
    }

    else
        engine_turn = null
})