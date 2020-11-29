// Паттерн Стратегия определяет семейство алгоритмов, инкапсулирует каждый
// из них и обеспечивает их взаимозаменяемость. 
// Он повзоляет модифицировать алгоритмы независимо от их использования
// на стороне клиента.

interface Strategy {
    getRoute(a: number, b: number): number;
}

class StrategyCar implements Strategy {
    constructor() { }
    getRoute(a: number, b: number) {
        return a + b;
    }
}
class StrategyBus implements Strategy {
    constructor() { }
    getRoute(a: number, b: number) {
        return a - b;
    }

}
class StrategyBike implements Strategy {
    constructor() { }
    getRoute(a: number, b: number) {
        return a * b;
    }

}

interface INav {
    strategy: Strategy;
    setStrategy(strategy: Strategy): void;
    getRoute(a: number, b: number): number;
}
class Nav implements INav {
    strategy = new StrategyCar();
    constructor() {}
    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    getRoute(a: number, b: number) {
        return this.strategy.getRoute(a, b);
    }
}
enum StrategyType {
    CAR = 'CAR',
    BUS = 'BUS',
    BIKE = 'BIKE',
}

const main = (strategy: StrategyType) => {
    const navigaror = new Nav();
    switch (strategy) {
        case StrategyType.CAR:
            navigaror.setStrategy(new StrategyCar())
            break;
        case StrategyType.BUS:
            navigaror.setStrategy(new StrategyBus())
            break;
        case StrategyType.BIKE:
            navigaror.setStrategy(new StrategyBike())
            break;
        default:
            break;
    }

    return navigaror.getRoute(1, 2);
};

const carRes = main(StrategyType.CAR);
console.log(carRes);
const busRes = main(StrategyType.BUS);
console.log(busRes);
const bikeRes = main(StrategyType.BIKE);
console.log(bikeRes);

