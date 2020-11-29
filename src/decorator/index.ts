// Декоратор  динамически наделяет обхект новыми возможностями и является
// гибкой альтернативой субклассированию в  области расширения 
// функциональности.

abstract class Beverage {
    description: string = 'Unknown Beverage';
    public abstract cost(): number;
    constructor(description?: string) {
        this.description = description;
    }
    public getDescription() {
        return this.description;
    }
};

class Espresso extends Beverage {
    constructor() {
        super('Espresso');
    }

    public cost() {
        return 1.5;
    }
}

class DarkRoast extends Beverage {
    constructor() {
        super('Dark Roast')
    }
    public cost() {
        return 1.99;
    }
};

class HouseBlend extends Beverage {
    constructor() {
        super('House Blend Coffee')
    }
    public cost() {
        return 0.89;
    }
};

abstract class CondimentDecorator extends Beverage {
    public abstract getDescription(): string;
    beverage: Beverage = null;
    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }
}

class Milk extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super(beverage);
    }
    public getDescription() {
        return this.beverage.getDescription() + ' | Milk';
    }
    public cost() {
        return 0.3 + this.beverage.cost();
    }
}

class Mocha extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super(beverage);
    }
    public getDescription() {
        return this.beverage.getDescription() + ' | Mocha';
    }
    public cost() {
        return 0.5 + this.beverage.cost();
    }
}

class Whip extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super(beverage);
    }
    public getDescription() {
        return this.beverage.getDescription() + ' | Whip';
    }
    public cost() {
        return 0.46 + this.beverage.cost();
    }
}

// Dark Roast | Milk | Mocha
const beverage1 = new Mocha(new Milk(new DarkRoast()));
console.log(beverage1.getDescription())
console.log(beverage1.cost())

// Espresso | Milk | Milk | Whip
const beverage2 = new Whip(new Milk(new Milk(new Espresso())));
console.log(beverage2.getDescription())
console.log(beverage2.cost())