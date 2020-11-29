// Паттерн Адаптер преобразует интерфейс класса к другому интерфейсу, на 
// который рассчитан клиент. Адаптер обеспечивает совместную работу классов,
// невозможную в обычных условиях из-за несовместимости интерфейсов.

class Duck {
    public quack() {
        console.log('Quack')
    }
    public fly() {
        console.log('I am flying')
    }
}

class Turkey {
    public gobble(){
        console.log('Gobble gobble');
    }
    public fly(){
        console.log('I am flying a short distance');
    }
} 

class TurkeyToDuckAdapter implements Duck {
    turkey: Turkey;
    constructor(turkey: Turkey){
        this.turkey = turkey;
    }
    public quack() {
        this.turkey.gobble();
    }
    public fly() {
        for (let i = 0; i < 5; i ++)
            this.turkey.fly();

    }
};


const duck = new Duck();
duck.quack();
duck.fly();
const turkey = new Turkey();
turkey.fly();
turkey.gobble();
const adaptedTurkey = new TurkeyToDuckAdapter(turkey);
adaptedTurkey.quack();
adaptedTurkey.fly();