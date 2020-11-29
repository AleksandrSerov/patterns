// Паттерн Одиночка гарантирует, что класс имеет только один экземпляр,
// и предоставляет глобальную точку доступа к этому экземпляру.

class Singleton {
    private static uniqueInstance: Singleton = null;
    private constructor(){

    }
    public static getInstance() {
        if (this.uniqueInstance === null) {
            this.uniqueInstance = new Singleton();
        }

        return this.uniqueInstance;
    }
}