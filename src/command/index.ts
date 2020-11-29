// Паттерн Команда инкапсулирует запрос в виде объекта, делая возможной 
// параметризацию клиентских объектов с другими запросами, организацию очереди
// или регистрацию запросов, а также поддержку отмены операции.

interface Command {
    execute(): void;
    undo(): void;
}

class Light {
    constructor() {
    }
    on() {
        console.log('Light is On')
    }
    off() {
        console.log('Light is Off')
    }
}

class GarageDoor {
    constructor() {

    }
    up() {
        console.log('Garage Door is Open');
    }
    down() {
        console.log('Garage Door is Close');
    }
    stop() {
        console.log('Garage Door is Stop');
    }
    lightOn() {
        console.log('Door Light is On');
    }
    lightOff() {
        console.log('Door Light is Off');
    }
}

class NoCommand implements Command {
    static displayName: string = "NoCommand";
    constructor() {

    }
    public execute() {
    }
    public undo() {
    }
    public getName() {
        return 'NoCommand'
    }
}

class LightOnCommand implements Command {
    light: Light;

    constructor(light: Light) {
        this.light = light;
    }
    public execute() {
        this.light.on();
    }
    public undo() {
        this.light.off();
    }
}

class LightOffCommand implements Command {
    light: Light;

    constructor(light: Light) {
        this.light = light;
    }
    public execute() {
        this.light.off();
    }
    public undo() {
        this.light.on();
    }
}

class Stereo {
    constructor() {

    }
    on() {
        console.log('Stereo is On');
    };
    off() {
        console.log('Stereo is Off');
    }
    setCd() {
        console.log('CD is set');
    }
    setDvd() {
        console.log('DVD is set');
    }
    setRadio() {
        console.log('Radio is set');
    }
    setVolume(value: number) {
        console.log('Volume - %d is set', value);
    }

}

class StereoOnWithCdCommand implements Command {
    stereo: Stereo;
    constructor(stereo: Stereo) {
        this.stereo = stereo;
    }
    execute() {
        this.stereo.on();
        this.stereo.setCd();
        this.stereo.setVolume(11);
    }
    undo() {
        this.stereo.off();
    }
}
class StereoOffCommand implements Command {
    stereo: Stereo;
    constructor(stereo: Stereo) {
        this.stereo = stereo;
    }
    execute() {
        this.stereo.off();
    }
    undo() {
        this.stereo.on();
        this.stereo.setCd();
        this.stereo.setVolume(11);
    }

}
class GarageDoorOpenCommand implements Command {
    garageDoor: GarageDoor;
    constructor(garageDoor: GarageDoor) {
        this.garageDoor = garageDoor;
    }
    public execute() {
        this.garageDoor.up()
        this.garageDoor.lightOn();
    }
    public undo() {
        this.garageDoor.lightOff();
        this.garageDoor.down();
    }
};
class GarageDoorCloseCommand implements Command {
    garageDoor: GarageDoor;
    constructor(garageDoor: GarageDoor) {
        this.garageDoor = garageDoor;
    }
    public execute() {
        this.garageDoor.lightOff();
        this.garageDoor.down()
    }
    public undo() {
        this.garageDoor.up()
        this.garageDoor.lightOn();
    }
}


class RemoteControl {
    onCommands: Array<Command>;
    offCommands: Array<Command>;
    undoCommand: Command;
    constructor() {
        this.onCommands = new Array(7);
        this.offCommands = new Array(7);
        this.undoCommand = new NoCommand();
        for (let i = 0; i < 7; i++) {
            this.onCommands[i] = new NoCommand();
            this.offCommands[i] = new NoCommand();
        }
    }
    public setCommand(slot: number, onCommand: Command, offCommand: Command) {
        this.onCommands[slot] = onCommand;
        this.offCommands[slot] = offCommand;
    }
    public onButtonWasPusshed(slot: number) {
        this.onCommands[slot].execute();
        this.undoCommand = this.onCommands[slot];
    }
    public offButtonWasPusshed(slot: number) {
        this.offCommands[slot].execute();
        this.undoCommand = this.offCommands[slot];
    }
    public undoWasPushed() {
        this.undoCommand.undo();
    }
    public toString() {
        console.log("\n------ Remote Control ------\n");
        for (let i = 0; i < this.onCommands.length; i++) {
            console.log("[slot", i, "] ", this.onCommands[i], " ", this.offCommands[i])
        }
        console.log("[undo] ", this.undoCommand)
    }
}

class CeilingFan {
    public static HIGH: number = 3;
    public static MEDIUM: number = 2;
    public static LOW: number = 1;
    public static OFF: number = 0;
    speed: number;
    constructor() {
        this.speed = CeilingFan.OFF;
    }
    public high() {
        this.speed = CeilingFan.HIGH;
        console.log('Fan speed is ', CeilingFan.HIGH);
    }
    public medium() {
        this.speed = CeilingFan.MEDIUM;
        console.log('Fan speed is ', CeilingFan.MEDIUM);
    }
    public low() {
        this.speed = CeilingFan.LOW;
        console.log('Fan speed is ', CeilingFan.LOW);
    }
    public off() {
        this.speed = CeilingFan.OFF;
        console.log('Fan speed is ', CeilingFan.OFF);
    }
    public getSpeed() {
        return this.speed;
    }
};

class CeilingFanHighCommand implements Command {
    fan: CeilingFan;
    prevSpeed: number;
    constructor(fan: CeilingFan) {
        this.fan = fan;
    }
    execute() {
        this.prevSpeed = this.fan.getSpeed();
        this.fan.high();
    }
    undo() {
        switch (this.prevSpeed) {
            case CeilingFan.HIGH:
                this.fan.high();
                break;
            case CeilingFan.MEDIUM:
                this.fan.medium();
                break;
            case CeilingFan.LOW:
                this.fan.low();
                break;
            case CeilingFan.OFF:
                this.fan.off();
                break;
            default:
                break;
        }
    }
}

class CeilingFanMediumCommand implements Command {
    fan: CeilingFan;
    prevSpeed: number;
    constructor(fan: CeilingFan) {
        this.fan = fan;
    }
    execute() {
        this.prevSpeed = this.fan.getSpeed();
        this.fan.medium();
    }
    undo() {
        switch (this.prevSpeed) {
            case CeilingFan.HIGH:
                this.fan.high();
                break;
            case CeilingFan.MEDIUM:
                this.fan.medium();
                break;
            case CeilingFan.LOW:
                this.fan.low();
                break;
            case CeilingFan.OFF:
                this.fan.off();
                break;
            default:
                break;
        }
    }
}

class CeilingFanOffCommand implements Command {
    fan: CeilingFan;
    prevSpeed: number;
    constructor(fan: CeilingFan) {
        this.fan = fan;
    }
    execute() {
        this.prevSpeed = this.fan.getSpeed();
        this.fan.off();
    }
    undo() {
        switch (this.prevSpeed) {
            case CeilingFan.HIGH:
                this.fan.high();
                break;
            case CeilingFan.MEDIUM:
                this.fan.medium();
                break;
            case CeilingFan.LOW:
                this.fan.low();
                break;
            case CeilingFan.OFF:
                this.fan.off();
                break;
            default:
                break;
        }
    }
}

class MacroCommand implements Command {
    commands: Array<Command>;
    constructor(commands: Array<Command>) {
        this.commands = commands;
    }
    execute() {
        this.commands.forEach((command) => {
            command.execute();
        })
    }
    undo() {
        this.commands.forEach((command) => {
            command.undo();
        })
    }
};

class RemoteLoader {
    constructor() { }
    public static main() {
        const remoteControl = new RemoteControl();
        const light: Light = new Light();
        const garageDoor: GarageDoor = new GarageDoor();
        const stereo: Stereo = new Stereo();
        const fan: CeilingFan = new CeilingFan();

        const lightOn = new LightOnCommand(light);
        const lightOff = new LightOffCommand(light);

        const garageDoorOpen = new GarageDoorOpenCommand(garageDoor);
        const garageDoorClose = new GarageDoorCloseCommand(garageDoor);

        const stereoOnWithCd = new StereoOnWithCdCommand(stereo);
        const stereoOff = new StereoOffCommand(stereo);

        const ceilingFanHigh = new CeilingFanHighCommand(fan);
        const ceilingFanMedium = new CeilingFanMediumCommand(fan);
        const ceilingFanOff = new CeilingFanOffCommand(fan);

        const partyOnMacro = new MacroCommand([lightOn, stereoOnWithCd, ceilingFanHigh]);
        const partyOffMacro = new MacroCommand([lightOff, stereoOff, ceilingFanOff]);

        remoteControl.setCommand(0, lightOn, lightOff);
        remoteControl.setCommand(1, garageDoorOpen, garageDoorClose);
        remoteControl.setCommand(2, stereoOnWithCd, stereoOff);
        remoteControl.setCommand(3, ceilingFanHigh, ceilingFanOff);
        remoteControl.setCommand(4, ceilingFanMedium, ceilingFanOff);
        remoteControl.setCommand(5, partyOnMacro, partyOffMacro)
        console.log(remoteControl.toString());

        // remoteControl.onButtonWasPusshed(0);
        // remoteControl.offButtonWasPusshed(0);
        // remoteControl.undoWasPushed();
        // remoteControl.onButtonWasPusshed(1);
        // remoteControl.undoWasPushed();
        // remoteControl.offButtonWasPusshed(1);
        // remoteControl.onButtonWasPusshed(2);
        // remoteControl.offButtonWasPusshed(2);

        remoteControl.onButtonWasPusshed(4);
        remoteControl.offButtonWasPusshed(4);
        remoteControl.onButtonWasPusshed(3);
        remoteControl.undoWasPushed();

        // remoteControl.onButtonWasPusshed(5);
        // remoteControl.undoWasPushed()

    }
}
RemoteLoader.main()