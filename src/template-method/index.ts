
abstract class CaffeineBeverage {
    constructor() {
        
    }
    // final method
    prepareReciept(){
        this.boilWater();
        this.brew();
        this.pourInCup();
        if (this.customerWantsCondiments()) {
            this.addCondiments();
        }
    };
    boilWater() {
        console.log('Boiling water')
    }
    pourInCup() {
        console.log('Pouring into the cup')
    }
    // hook
    customerWantsCondiments(){
        return true;
    }
    abstract brew(): void;
    abstract addCondiments(): void;
}

class Tea extends CaffeineBeverage {
    constructor() {
        super()
    }
    brew(){
        console.log('Steeping tea bag');
    }
    customerWantsCondiments() {
        return false;
    }
    addCondiments(){
        console.log('Adding lemon');
    }
}

class Coffee extends CaffeineBeverage {
    constructor() {
        super()
    }
    brew(){
        console.log('Brewing coffee grinds');
    }
    addCondiments(){
        console.log('Adding sugar and milk');
    }
}
const tea = new Tea();
const coffee = new Coffee();
tea.prepareReciept();
console.log('------------------')
coffee.prepareReciept();