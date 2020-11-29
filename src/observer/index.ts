// Паттерн Набдюдатель определяет отношение "один-ко-многим" между объектами
// таким образом, что при изменении состояния одного объекта происходит
// автоматическое оповещение и обновление всех зависимых объектов.

interface IObserver {
    data: string;
    update(data: string): void;
    getData(): string;
}
class Observer implements IObserver {
    data: string = '';
    constructor() {
    }
    update(data: string) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

type UnicObserver = {
    observer: IObserver;
    id: number;
}
interface ISubject {
    state: string;
    observers: Array<UnicObserver>;
    registerObserver(observer: IObserver, id: number): void;
    removeObserver(id: number): void;
    notifyObservers(): void;
}

class Subject implements ISubject {
    state: string = '';
    observers: Array<UnicObserver> = [];
    constructor() { }
    registerObserver(observer: IObserver, id: number) {
        this.observers.push({
            observer,
            id
        });
    }
    removeObserver(observerId: number) {
        const index = this.observers.findIndex(({ id }) => id === observerId);
        this.observers.splice(index, 1);
    }
    notifyObservers() {
        this.observers.forEach(({ observer }) => {
            observer.update(this.state);
        })
    }
    getState() {
        return this.state;
    }
    setState(state: string) {
        this.state = state;
        this.notifyObservers();
    }
}


const subject = new Subject();

const myObserver1 = new Observer();
const myObserver2 = new Observer();

subject.registerObserver(myObserver1, 1)
subject.registerObserver(myObserver2, 2);
console.log(myObserver1.getData())
subject.setState('Initial state');
console.log('Observer1 data: ', myObserver1.getData())
console.log('Observer2 data: ', myObserver2.getData())

subject.removeObserver(1);
console.log('remove first observer');

subject.setState('Updated state again');
console.log('Observer1 data: ', myObserver1.getData())
console.log('Observer2 data: ', myObserver2.getData())

