/*
 * Parser class for handling user input strings and deriving their corresponding turtle methods.
 * The class constructor receives a turtle and an optional errorHandler.
 * The parse method takes a string and returns a function that, once called,
 * will instruct the turtle what to do to fulfill the user's command.
 * 
 * The class stores two dictionaries: compass and palette, for translating English
 * into their corresponding turtle values. E.g. 'red' -> '' and 'north' -> ''.

*/
class Parser {

    constructor(turtle, errorHandler = (e) => alert(e)) {
        this.turtle = turtle;
        this.errorHandler = errorHandler;

        this.compass = {
            'north': -90,
            'south': 90,
            'east': 0,
            'west': 180
        }

        this.palette = {
            // Zam: where is pink?
            'red': '#ff6663',
            'orange': '#feb144',
            'yellow': '#fdfd97',
            'green': '#9ee09e',
            'blue': '#9ec1cf',
            'purple': '#cc99c9',
            'white': '#f4f4f2',
            'black': '#080d14'            
        }
    }

    _tokenize(s) {
        return s.trim().replace('  ', ' ').split(' ');
    }

    _parseMove(args) {
        if (args.length === 0) {
            return () => this.errorHandler("move how far or in which direction?");
        } else if (args.length === 1) {
            const distance = parseInt(args[0]);
            return () => this.turtle.move(distance);
        } else if (args.length === 2) {
            const [direction, distance] = [this.compass[args[0]], args[1]];
            if (direction === undefined) {
                return () => this.errorHandler("unrecognised direction: " + direction);
            }
            return () => {
                this.turtle.dir = direction;
                this.turtle.move(distance);
            }
        } else {
            return () => this.errorHandler("move received too many arguments");
        }
    }

    _parseTurn(args) {
        if (args.length === 0) {
            return () => this.errorHandler("turn in which direction?");
        } else if (args.length === 1) {
            const direction = args[0];
            const numeric = !isNaN(direction);
            if (numeric) {
                return () => this.turtle.turn(parseInt(direction));
            } else if (direction in this.compass) {
                return () => this.turtle.direction = this.compass[direction];
            } else {
                return () => this.errorHandler("unrecognised direction: " + direction);
            }
        } else {
            return () => this.errorHandler("turn received too many arguments");
        }

    }

    _parseColor(args) {
        if (args.length === 0) {
            return () => this.errorHandler("change turtle to which colour?");
        } else if (args.length === 1) {
            const color = args[0];
            if (color in this.palette) {
                return () => this.turtle.col = color;
            } else {
                return () => this.errorHandler("unrecognised colour: " + color);
            }
        } else {
            return () => this.errorHandler("turn received too many arguments");
        }


    }

    parse(s) {
        const tokens = this._tokenize(s);
        if (tokens.length === 0) return;
        const [command, args] = [tokens[0], tokens.splice(1)];
        switch (command) {
            case 'move':
                return this._parseMove(args);
            case 'turn':
                return this._parseTurn(args);
            case 'colour':
            case 'color':
                return this._parseColor(args);
            default:
                return () => this.errorHandler("unrecognised command: " + command);
        }
    }
}