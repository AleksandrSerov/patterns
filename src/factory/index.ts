// Паттерн Фабричный метод определяет интерфейс создания объекта, но позволяет
// субклассам выбрать класс создаваемого экземпляра. Таким образом, 
// Фабричный метод делегирует операцию создания экземпляра субклассам.

// Паттерн Абстрактная Фабрика предоставляет интерфейс создания семейств
// взаимосвязанных или взаимозависимых объектов без указания их конкретных классов.

// Предоставляет абстрактный интерфейс для создания одного продукта
// Каждый субкласс решает какой конкретный класс обрабатывать
abstract class PizzaStore {
    constructor() { }
    // Абстрактный фабричный метод
    protected abstract createPizza(type: string): Pizza;

    orderPizza(type: string) {
        const pizza = this.createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;

    }
}

class NYPizzaStore extends PizzaStore {
    constructor() {
        super();
    };
    // Конкретный фабричный метод
    protected createPizza(type: string) {
        let pizza: Pizza = null;
        const ingridientFactory: PizzaIngridientFactory = new NYPizzaIngridientFactory();
        switch (type) {
            case 'cheese':
                pizza = new CheesePizza(ingridientFactory);
                pizza.setName('New York Style Cheese Pizza');
                break;
            case 'clam':
                pizza = new ClamPizza(ingridientFactory);
                pizza.setName('New York Style Clam Pizza');
                break;
            default:
                return null;
        }
        return pizza;
    }
}

class ChicagoPizzaStore extends PizzaStore {
    constructor() {
        super();
    }
    // Конкретный фабричный метод
    protected createPizza(type: string) {
        let pizza: Pizza = null;
        const ingridientFactory: PizzaIngridientFactory = new ChicagoPizzaIngridientFactory();
        switch (type) {
            case 'cheese':
                pizza = new CheesePizza(ingridientFactory);
                pizza.setName('Chicago Style Cheese Pizza');
                break;
            case 'clam':
                pizza = new ClamPizza(ingridientFactory);
                pizza.setName('Chicago Style Clam Pizza');
                break;
            default:
                return null;
        }
        return pizza;
    }
};

// Продукт PizzaStore. Код клиентов зависит только от этого
// абстрактного типа
abstract class Pizza {
    name: string = null;
    dough: Dough = null;
    sauce: Sauce = null;
    veggies: Array<Vegetable> = null;
    cheese: Cheese = null;
    pepperoni: Pepperoni = null;
    clams: Clams = null;
    constructor() { }
    abstract prepare(): void;
    bake() {
        console.log('Bake for 25 minutes at 350');
    }
    cut() {
        console.log('Cutting pizza into diogonal slices');
    }
    box() {
        console.log('Place pizza in official PizzaStore box');
    };
    setName(name: string) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class CheesePizza extends Pizza {
    ingridientFactory: PizzaIngridientFactory = null;
    constructor(ingridientFactory: PizzaIngridientFactory) {
        super();
        this.ingridientFactory = ingridientFactory;
    }
    prepare() {
        const dough = this.ingridientFactory.createDough();
        const sauce = this.ingridientFactory.createSauce();
        const vegies = this.ingridientFactory.createVeggies();
        const cheese = this.ingridientFactory.createCheese();
        console.log('Preparing ' + this.name);
        console.log('Tossing ', dough.getName());
        console.log('Adding ', sauce.getName());
        console.log('Adding ', vegies.map((vegetable) => vegetable.getName()).join('|'))
        console.log('Adding ', cheese.getName());
    }
}

class ClamPizza extends Pizza {
    ingridientFactory: PizzaIngridientFactory = null;
    constructor(ingridientFactory: PizzaIngridientFactory) {
        super();
        this.ingridientFactory = ingridientFactory;
    }
    prepare() {
        const dough = this.ingridientFactory.createDough();
        const sauce = this.ingridientFactory.createSauce();
        const vegies = this.ingridientFactory.createVeggies();
        const cheese = this.ingridientFactory.createCheese();
        const clam = this.ingridientFactory.createClams();
        console.log('Preparing ' + this.name);
        console.log('Tossing ', dough.getName());
        console.log('Adding ', sauce.getName());
        console.log('Adding ', vegies.map((vegetable) => vegetable.getName()).join('|'))
        console.log('Adding ', cheese.getName());
        console.log('Adding ', clam);
    }
}

// Предоставляет абстрактный интерфейс для создания семейства продуктов.
// Реализуется как Абстрактная фабрика, потому что он должен создавать семейства
// продуктов(ингридиенты).

interface PizzaIngridientFactory {
    createDough(): Dough;
    createSauce(): Sauce;
    createCheese(): Cheese;
    createVeggies(): Array<Vegetable>;
    createPepperoni(): Pepperoni;
    createClams(): Clams;
}

class NYPizzaIngridientFactory implements PizzaIngridientFactory {
    public createDough() {
        return new ThinCrustDough();
    }
    public createSauce() {
        return new MarinaraSauce();
    }
    public createCheese() {
        return new RegianoCheese();
    }
    public createVeggies() {
        const veggies: Array<Vegetable> = [
            new Garlic(),
            new Onion(),
            new Mushroom(),
            new RedPepper()
        ];
        return veggies;
    }
    public createPepperoni() {
        return new SlicedPepperoni();
    }
    public createClams() {
        return new FreshClams();
    }
}

class ChicagoPizzaIngridientFactory implements PizzaIngridientFactory {
    public createDough() {
        return new ThickCrustDough();
    }
    public createSauce() {
        return new PlumTomatoSauce();
    }
    public createCheese() {
        return new MozzarellaCheese();
    }
    public createVeggies() {
        const veggies: Array<Vegetable> = [
            new BlackOlives(),
            new Spinach(),
            new EggPlant()
        ];
        return veggies;
    }
    public createPepperoni() {
        return new SlicedPepperoni();
    }
    public createClams() {
        return new FrozenClams();
    }
}

// Ingridients
class Ingridient {
    name: string = null;
    type: string = null;
    constructor(name: string) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
}

class Vegetable extends Ingridient {
    type: string = 'Vegetable';
    constructor(name: string) {
        super(name)
    }
}

class Dough extends Ingridient {
    type: string = 'Dough';
    constructor(name: string) {
        super(name)
    }
}

class Sauce extends Ingridient {
    type: string = 'Sauce';
    constructor(name: string) {
        super(name)
    }
}

class Cheese extends Ingridient {
    type: string = 'Cheese';
    constructor(name: string) {
        super(name)
    }
}

class Pepperoni extends Ingridient {
    type: string = 'Pepperoni';
    constructor(name: string) {
        super(name)
    }
}

class Clams extends Ingridient {
    type: string = 'Clams';
    constructor(name: string) {
        super(name)
    }
}

class ThinCrustDough extends Dough {
    constructor() {
        super('Thin Crust Dough');
    }
}

class ThickCrustDough extends Dough {
    constructor() {
        super('Thick Crust Dough');
    }
}

class MarinaraSauce extends Sauce {
    constructor() {
        super('Marianara Sauce');
    }
}

class PlumTomatoSauce extends Sauce {
    constructor() {
        super('Plum Tomato Sauce');
    }
}

class RegianoCheese extends Cheese {
    constructor() {
        super('Regiano Cheese');
    }
}

class MozzarellaCheese extends Cheese {
    constructor() {
        super('Mozzarella Cheese');
    }
}
class SlicedPepperoni extends Pepperoni {
    constructor() {
        super('Sliced Pepperoni');
    }
}

class FreshClams extends Clams {
    constructor() {
        super('Fresh Clams');
    }
}

class FrozenClams extends Clams {
    constructor() {
        super('Frozen Clams');
    }
}

class Garlic extends Vegetable {
    constructor() {
        super('Garlic');
    }
}

class Onion extends Vegetable {
    constructor() {
        super('Onion');
    }
}

class Mushroom extends Vegetable {
    constructor() {
        super('Mushroom');
    }

}

class RedPepper extends Vegetable {
    constructor() {
        super('Red Pepper');
    }
}

class BlackOlives extends Vegetable {
    constructor() {
        super('Black Olives');
    }
}

class Spinach extends Vegetable {
    constructor() {
        super('Spinach');
    }
}

class EggPlant extends Vegetable {
    constructor() {
        super('Egg Plant');
    }
}

//Testing 
class PizzaTestDrive {
    static main() {
        const nyStore = new NYPizzaStore();
        const chicagoPizzaStore = new ChicagoPizzaStore();
        const pizza1 = nyStore.orderPizza('cheese');
        const pizza2 = chicagoPizzaStore.orderPizza('cheese');
    }
}

PizzaTestDrive.main();