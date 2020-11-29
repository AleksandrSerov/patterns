// Паттерн Компоновщик объединяет объекты в древовидные структуры
// для предоставления иерархий "часть/целое". Компоновщик позволяет
// клиенту выполнять однородные операции с отдельными объектами и
// их совокупностями.

abstract class MenuComponent {
    add(menuComponent: MenuComponent): void {
        throw new Error('Unsupported operation');
    }
    //Not supported yet;
    remove(menuComponent: MenuComponent): void {
        throw new Error('Unsupported operation');
    };
    getChild(i: number): MenuComponent {
        throw new Error('Unsupported operation');
    };
    getName(): string {
        throw new Error('Unsupported operation');
    };
    getDescription(): string {
        throw new Error('Unsupported operation');
    };
    getPrice(): number {
        throw new Error('Unsupported operation');
    };
    isVegetarian(): boolean {
        throw new Error('Unsupported operation');
    };
    print(): void {
        throw new Error('Unsupported operation');
    };
}
class MenuItem extends MenuComponent {
    name: string;
    description: string;
    vegetarian: boolean;
    price: number;
    constructor(
        name: string,
        description: string,
        vegetarian: boolean,
        price: number
    ) {
        super();
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }
    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description: string) {
        this.description = description;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price: number) {
        this.price = price;
    }
    isVegetarian() {
        return this.vegetarian;
    }
    setIsVegetarian(vegetarian: boolean) {
        this.vegetarian = vegetarian;
    }
    print() {
        const vegLabel = this.isVegetarian() ? "(v)" : "";
        console.log(` ${this.getName()} ${vegLabel} ${this.getPrice()}`);
        console.log(this.getDescription());
    }
};

class Menu extends MenuComponent {
    menuComponents: Array<MenuComponent> = new Array();
    name: string;
    description: string;
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }
    add(menuComponent: MenuComponent) {
        this.menuComponents.push(menuComponent);
    }
    getChild(i: number): MenuComponent {
        return this.menuComponents[i];
    };
    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.description;
    }
    print() {
        console.log(`\n${this.getName()}, ${this.getDescription()}`)
        console.log('---------------------------------------------');
        this.menuComponents.forEach((menuComponent) => {
            menuComponent.print();
        })
    }

}

class Waitress {
    allMenus: MenuComponent;
    constructor(allMenus: MenuComponent) {
        this.allMenus = allMenus;
    }

    printMenu(): void {
        this.allMenus.print();
    }
}


// Testing

const pancakeHouseMenu = new Menu('PANCAKE HOUSE MENU', 'Breakfast');
const dinerMenu = new Menu('DINER MENU', 'Lunch');
const caffeMenu = new Menu('CAFFE MENU', 'Diner');
const desertMenu = new Menu('DESERT MENU', 'Desert of course!');
const allMenus = new Menu('ALL MENUS', 'All menus cmbinated');
allMenus.add(pancakeHouseMenu);
allMenus.add(dinerMenu);
allMenus.add(caffeMenu);
dinerMenu.add(new MenuItem("Pasta",
    "Spaghetti with Marinara Sauce, and a slice of sourdough bread",
    true, 3.89))
dinerMenu.add(desertMenu);
desertMenu.add(new MenuItem('Apple Pie',
    'Apple pie with flakey crust, topped with vanilla iceream',
    true, 1.59));

pancakeHouseMenu.add(new MenuItem("K&B's Pancake Breakfast",
    "Pancakes with scrambled eggs and toast",
    true,
    2.99));
pancakeHouseMenu.add(new MenuItem("Regular Pancake Breakfast",
    "Pancakes with fried eggs, sausage",
    false,
    2.99));
pancakeHouseMenu.add(new MenuItem("Blueberry Pancakes",
    "Pancakes made with fresh blueberries",
    true,
    3.49));
const waitress = new Waitress(allMenus);
waitress.printMenu(); 