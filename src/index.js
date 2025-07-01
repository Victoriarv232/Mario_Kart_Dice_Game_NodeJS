//players
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result; 

    switch (true){
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }
    return result;
}

async function logRollResults(characterName, block, diceResult, attribute ){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}
async function playRaceEngine (character1, character2){
    for( let round = 1; round <=5; round++){
        console.log(`\n🏁 Round ${round} 🏁`);

        //sortear bloco
        let block =  await getRandomBlock()
        console.log(`Bloco: ${block}`);

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResults(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResults(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResults(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResults(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE );
        }

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            let attack = Math.floor(Math.random() * 2) + 1;

            console.log(`${character1.NOME} confrontou ${character2.NOME}!🥊💥`);

            await logRollResults(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResults(character2.NOME, "poder", diceResult2, character2.PODER);

            switch(true){
                case powerResult1 < powerResult2 && attack == 1:
                    console.log(`${character2.NOME} venceu o confronto! \n${character1.NOME} foi atingido(a) por um casco de tartaruga e perdeu 1 ponto 🐢`);
                    if(character1.PONTOS > 0 && attack == 1)
                        character1.PONTOS--;
                    break;
                case powerResult1 < powerResult2 && attack == 2:
                    console.log(`${character2.NOME} venceu o confronto! \n${character1.NOME} foi atingido(a) por uma bomba e perdeu 2 pontos 💣`);
                    if(character1.PONTOS > 1 && attack == 2)
                        character1.PONTOS-= 2;
                    else if(character1.PONTOS == 1 && attack == 2)
                        character1.PONTOS -= 1;
                    break;
                case powerResult2 < powerResult1 && attack == 1:
                    console.log(`${character1.NOME} venceu o confronto! \n${character2.NOME} foi atingido(a) por um casco de tartaruga e perdeu 1 ponto 🐢`);
                    if(character2.PONTOS > 0 && attack == 1)
                        character2.PONTOS--;
                    break;
                case powerResult2 < powerResult1 && attack == 2:
                    console.log(`${character1.NOME} venceu o confronto! \n${character2.NOME} foi atingido(a) por uma bomba e perdeu 2 pontos 💣`);
                    if(character2.PONTOS > 1 && attack == 2)
                        character2.PONTOS-= 2;
                    else if(character2.PONTOS == 1 && attack == 2)
                        character2.PONTOS -= 1;
                    break;
                case character1.PONTOS == character2.PONTOS:
                    console.log("Empate! Nenhum ponto foi perdido!");
                    break;
                default: console.log("");
            }
        }

        //verificando o vencedor do bloco
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou 1 ponto`);
            character1.PONTOS++; 
        }
        else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou 1 ponto`);
            character2.PONTOS++;
        }

        console.log("----------------------------------------------------");
    }
}

//declaração do vencedor
async function declareWinner(character1, character2){
    console.log("🏆Resultado final🏆");
    console.log(`${character1.NOME} ${character1.PONTOS} pontos`);
    console.log(`${character2.NOME} ${character2.PONTOS} pontos`);

    if(character1.PONTOS > character2.PONTOS)
        console.log(`${character1.NOME} venceu a corrida!🏆🏁`);
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`${character2.NOME} venceu a corrida!🏆🏁`);
    else
        console.log("Houve um empate!");
}

(async function main(){
    console.log( `🏁🚦 Corrida entre ${player1.NOME} e ${player2.NOME} começando ...🏎 \n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

