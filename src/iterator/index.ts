// Паттерн Итератор предоставляет махенизм последовательного перебора
// элементов коллекции без раскрытия ее внутреннего представляения.


// interface Menu {
//     createIterator(): MenuIterator;
// }

// interface MenuIterator {
//     hasNext(): boolean;
//     next(): MenuItem;
// }

// class MenuItem {
//     name: string;
//     description: string;
//     vegetarian: boolean;
//     price: number;
//     constructor(
//         name: string,
//         description: string,
//         vegetarian: boolean,
//         price: number
//     ) {
//         this.name = name;
//         this.description = description;
//         this.vegetarian = vegetarian;
//         this.price = price;
//     }
//     getName() {
//         return this.name;
//     }
//     setName(name: string) {
//         this.name = name;
//     }
//     getDescription() {
//         return this.description;
//     }
//     setDescription(description: string) {
//         this.description = description;
//     }
//     getPrice() {
//         return this.price;
//     }
//     setPrice(price: number) {
//         this.price = price;
//     }
//     isVegetarian() {
//         return this.vegetarian;
//     }
//     setIsVegetarian(vegetarian: boolean) {
//         this.vegetarian = vegetarian;
//     }
// }
// type PancakeMenuItems = Array<MenuItem>;
// class PancakeHouseMenu implements Menu {
//     menuItems: PancakeMenuItems = [];
//     constructor() {
//         this.addItem("K&B's Pancake Breakfast",
//             "Pancakes with scrambled eggs and toast",
//             true,
//             2.99);

//         this.addItem("Regular Pancake Breakfast",
//             "Pancakes with fried eggs, sausage",
//             false,
//             2.99);

//         this.addItem("Blueberry Pancakes",
//             "Pancakes made with fresh blueberries",
//             true,
//             3.49);

//         this.addItem("Waffles",
//             "Waffles with your choice of blueberries or strawberries",
//             true,
//             3.59);
//     }
//     addItem(name: string, description: string,
//         vegetarian: boolean, price: number) {
//         const menuItem = new MenuItem(name, description, vegetarian, price);
//         this.menuItems.push(menuItem);
//     }
//     createIterator(): MenuIterator {
//         return new PancakeMenuIterator(this.menuItems)
//     }
// }

// type DinnerMenuItems = Map<number, MenuItem>;
// class DinerHouseMenu implements Menu {
//     static MAX_ITEMS: number = 6;
//     numberOfItems: number = 0;
//     menuItems: DinnerMenuItems;

//     constructor() {
//         this.menuItems = new Map([
//             [0, new MenuItem("", "", false, 0)],
//             [1, new MenuItem("", "", false, 0)],
//             [2, new MenuItem("", "", false, 0)],
//             [3, new MenuItem("", "", false, 0)],
//             [4, new MenuItem("", "", false, 0)],
//             [5, new MenuItem("", "", false, 0)]
//         ])

//         this.addItem("Vegetarian BLT",
//             "(Fakin') Bacon with lettuce & tomato on whole wheat", true, 2.99);
//         this.addItem("BLT",
//             "Bacon with lettuce & tomato on whole wheat", false, 2.99);
//         this.addItem("Soup of the day",
//             "Soup of the day, with a side of potato salad", false, 3.29);
//         this.addItem("Hotdog",
//             "A hot dog, with sauerkraut, relish, onions, topped with cheese",
//             false, 3.05);
//         this.addItem("Steamed Veggies and Brown Rice",
//             "Steamed vegetables over brown rice", true, 3.99);
//         this.addItem("Pasta",
//             "Spaghetti with Marinara Sauce, and a slice of sourdough bread",
//             true, 3.89);
//     }

//     addItem(name: string, description: string,
//         vegetarian: boolean, price: number) {
//         const menuItem = new MenuItem(name, description, vegetarian, price);
//         if (this.numberOfItems >= DinerHouseMenu.MAX_ITEMS) {
//             console.log("Sorry, menu is full!  Can't add item to menu");
//         } else {
//             this.menuItems.set(this.numberOfItems, menuItem);
//             this.numberOfItems += 1;
//         }
//     }

//     createIterator(): MenuIterator {
//         return new DinnerMenuIterator(this.menuItems)
//     }
// }

// class DinnerMenuIterator implements MenuIterator {
//     items: DinnerMenuItems;
//     position: number = 0;
//     constructor(items: DinnerMenuItems) {
//         this.items = items;
//     }
//     next() {
//         const item = this.items.get(this.position);
//         this.position += 1;
//         return item;
//     }
//     hasNext() {
//         if (this.position >= this.items.size) {
//             return false;
//         }
//         return true;

//     }
// }

// class PancakeMenuIterator implements MenuIterator {
//     items: PancakeMenuItems;
//     position: number = 0;
//     constructor(items: PancakeMenuItems) {
//         this.items = items;
//     }
//     next() {
//         const item = this.items[this.position];
//         this.position += 1;
//         return item;
//     }
//     hasNext() {
//         if (this.position >= this.items.length) {
//             return false;
//         }
//         return true;
//     }
// }

// class Waitress {
//     menus: Array<Menu>;
//     constructor(menus: Array<Menu>) {
//         this.menus = menus;
//     }
//     printMenu() {
//         this.menus.forEach((menu) => {
//             this.printMenuItems(menu.createIterator())
//         })
//     }
//     private printMenuItems(iterator: MenuIterator) {
//         while (iterator.hasNext()) {
//             const item = iterator.next();
//             console.log(item.getName())
//             console.log(item.getPrice())
//             console.log(item.getDescription())
//         }

//     }
// }

// const waitress = new Waitress([new DinerHouseMenu(), new PancakeHouseMenu()]);
// waitress.printMenu();