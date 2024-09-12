class Recinto {
    constructor(numero, bioma, tamanhoTotal, animaisExistentes = []) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisExistentes = animaisExistentes;
        this.espacoLivre = this.tamanhoTotal - animaisExistentes.reduce((acc, animal) => acc + animal.tamanho, 0);
    }
    localAdequado(animal, quantidade) {
        const biomas = this.bioma.split("e");
        return biomas.includes(animal.bioma) && this.espacoLivre >= animal.tamanho * quantidade;
    }
    Compatibilidade(novoAnimal) {
        return !this.animaisExistentes.some(animal => animal.predador && novoAnimal.presa);
    }
}

class Animal {
    constructor(especie, tamanho, bioma, predador = false) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.bioma = bioma;
        this.predador = predador;
        this.pres = !predador;
    }     
}


class RecintosZoo {
    constructor() {
        this.recintos = [
            new Recinto (1, "savana", 10, [new Animal("macaco", 3 ["savana", "floresta"])]),
            new Recinto (2, "floresta", 5),
            new Recinto (3, "savana e rio", 7, [new Animal("gazela", 1 ["savana"])]),
            new Recinto (4, "rio", 8),
            new Recinto (5, "savana", 9, [new Animal("leão", 1 ["savana"])]),
        ];

        this.animais = [
            new Animal ("Leao", 3, "savana", true),
            new Animal ("Leopardo", 2, "savana", true),
            new Animal ("crocodilo", 3, "rio", true),
            new Animal ("macaco", 1, "savana ou floresta"),
            new Animal ("gazela", 2, "savana"),
            new Animal ("hipopotamo", 4, "savana ou rio"),
        ];
    }
    analisaRecintos(Animal, quantidade) {
        const animal = this.animais.find(a => a.especie.toLowerCase() === especie.toLowerCase());
        if (!this.animais[animal]) return "Animal inválido";
        
        if (!Number.isInteger(quantidade) || quantidade <= 0) return "Quantidade inválida";

        const recintosViaveis = this.recintos.filter(recinto => {
            return recinto.localAdequado(animal, quantidade) && recinto.Compatibilidade(animal);
        }).map(recinto => {
            const espacoNecessario = quantidade * animal.tamanho + (recinto.animaisExistentes.length > 0 ? 1 : 0);
            return `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`;
        });

        if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };
        return { recintosViaveis };
    }

}

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos("macaco", 2));
console.log(zoo.analisaRecintos("leao", 1));
console.log(zoo.analisaRecintos("unicornio", 1));
console.log(zoo.analisaRecintos("macaco", -1));

