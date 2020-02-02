const process = require('process');
const line = require('readline');

class loadingBar{
    constructor(size){
        this.size = size;
        this.cursor = 1;
    }

    start(){
        process.stdout.write("\x1B[?25l");
        process.stdout.write("[");
        for (let i = 0; i < this.size; i++) {
            process.stdout.write("-");
        //    this.cursor++;
        }
        process.stdout.write("]");
        line.cursorTo(process.stdout, this.cursor, line.cursor);


    }

    step(){
        line.moveCursor(process.stdout, 0, 0);
        //this.cursor++;
        process.stdout.write('=');
    }

    stop(){
        line.cursorTo(process.stdout,0);
        line.moveCursor(process.stdout, 0, 2);
        process.stdout.write("\x1B[?25h");
    }
}

module.exports = loadingBar;