// Паттерн Состояние управляет изменением поведения обхекта при изменении
// его внутреннего состояния. Внешне это выглядит так, словно объект меняет
// свой класс.
class State {
    insertQuater() { };
    ejectQuater() { };
    turnCrank() { };
    dispense() { };
};


class GumBallMachine {
    soldState: State;
    soldOutState: State;
    hasQuaterState: State;
    noQuaterState: State;
    winnerState: State;
    state: State;
    count: number = 0;
    constructor(numberGumballs: number) {
        this.count = numberGumballs;
        this.soldState = new SoldState(this);
        this.soldOutState = new SoldOutState(this);
        this.hasQuaterState = new HasQuaterState(this);
        this.noQuaterState = new NoQuaterState(this);
        if (this.count > 0) {
            this.state = this.noQuaterState;
        } else {
            this.state = this.soldOutState;
        }
    };
    insertQuater() {
        this.state.insertQuater();
    };
    ejectQuater() {
        this.state.ejectQuater();
    };
    turnCrank() {
        this.state.turnCrank();
    };
    dispense() {
        this.state.dispense();
    };
    setState(state: State) {
        this.state = state;
    };
    getHasQuaterState(): State {
        return this.hasQuaterState;
    };
    getNoQuaterState(): State {
        return this.noQuaterState;
    }
    getSoldOutState(): State {
        return this.soldOutState;
    }
    getSoldState(): State {
        return this.soldState;
    }
    getWinnerState(): State {
        return this.winnerState;
    }
    releaseBall() {
        console.log('A gumball comes rolling out the slot...');
        if (this.count !== 0) {
            this.count -= 1;
        }
    }
    getCount(): number {
        return this.count;
    }
}

class NoQuaterState implements State {
    gumBallMachine: GumBallMachine;

    constructor(gumBallMachine: GumBallMachine) {
        this.gumBallMachine = gumBallMachine;
    };
    insertQuater() {
        console.log('You insterted a quater');
        this.gumBallMachine.setState(this.gumBallMachine.getHasQuaterState());
    };
    ejectQuater() {
        console.log('You haven`t inserted a quater');
    };
    turnCrank() {
        console.log('You turned, but there`s no quater');
    };
    dispense() {
        console.log('You need to pay first');
    };
};

class HasQuaterState implements State {
    gumBallMachine: GumBallMachine;

    constructor(gumBallMachine: GumBallMachine) {
        this.gumBallMachine = gumBallMachine;
    };
    insertQuater() {
        console.log('You can`t insert another quater');
    };
    ejectQuater() {
        console.log('Quater returned');
        this.gumBallMachine.setState(this.gumBallMachine.getNoQuaterState());
    };
    turnCrank() {
        console.log('You turned...');
        const winner = Math.random() * 100;
        if (winner > 90 && this.gumBallMachine.getCount() > 1) {
            this.gumBallMachine.setState(this.gumBallMachine.getWinnerState());
        } else {
            this.gumBallMachine.setState(this.gumBallMachine.getSoldState());
        }
    };
    dispense() {
        console.log('No gumball dispensed');
    };
};

class SoldState implements State {
    gumBallMachine: GumBallMachine;

    constructor(gumBallMachine: GumBallMachine) {
        this.gumBallMachine = gumBallMachine;
    };
    insertQuater() {
        console.log('Please wait, we`re already giving you a gumball');
    };
    ejectQuater() {
        console.log('Sorry, you already turned the crank');
    };
    turnCrank() {
        console.log('Turning twice doesn`t get you another gumball!');
    };
    dispense() {
        this.gumBallMachine.releaseBall();
        if (this.gumBallMachine.getCount() > 0) {
            this.gumBallMachine.setState(this.gumBallMachine.getNoQuaterState());
        } else {
            console.log('Oops, out of gumballs!');
            this.gumBallMachine.setState(this.gumBallMachine.getSoldOutState());

        }
    };
};

class SoldOutState implements State {
    gumBallMachine: GumBallMachine;

    constructor(gumBallMachine: GumBallMachine) {
        this.gumBallMachine = gumBallMachine;
    };
    insertQuater() {
        console.log('You can`t insert a quater. I`m epmty');
    };
    ejectQuater() {
        console.log('You haven`t inserted a quater');
    };
    turnCrank() {
        console.log('You turned, but there`s no quater');
    };
    dispense() {
        console.log('No gumball dispensed');
    };
};

class WinnerState implements State {
    gumBallMachine: GumBallMachine;

    constructor(gumBallMachine: GumBallMachine) {
        this.gumBallMachine = gumBallMachine;
    };
    insertQuater() {
        console.log('Please wait, we`re already giving you a gumball');
    };
    ejectQuater() {
        console.log('Sorry, you already turned the crank');
    };
    turnCrank() {
        console.log('Turning twice doesn`t get you another gumball!');
    };
    dispense() {
        this.gumBallMachine.releaseBall();
        if (this.gumBallMachine.getCount() === 0) {
            this.gumBallMachine.setState(this.gumBallMachine.getSoldOutState());
        } else {
            this.gumBallMachine.releaseBall();
            console.log('You`re a winner. You got two gumballs for you quarter');
            this.gumBallMachine.setState(this.gumBallMachine.getSoldOutState());
            if (this.gumBallMachine.getCount() > 0) {
                this.gumBallMachine.setState(this.gumBallMachine.getNoQuaterState());
            } else {
                console.log('Oops, out of gumballs!');
                this.gumBallMachine.setState(this.gumBallMachine.getSoldOutState());
            }
        }
    };
};

const gumBallMachine = new GumBallMachine(5);
gumBallMachine.insertQuater();
gumBallMachine.turnCrank();
gumBallMachine.dispense();
