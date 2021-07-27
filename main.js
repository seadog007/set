const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 500;
const MARGIN = 20;
const CELL_X_COUNT = 3;
const CELL_Y_COUNT = 4;
const CELL_SIZE_X = (WINDOW_WIDTH - MARGIN * 2 ) / CELL_X_COUNT;
const CELL_SIZE_Y = (WINDOW_HEIGHT - MARGIN * 2 ) / CELL_Y_COUNT;
const COLOR_MAP = ['#FF0000', '#00FF00', '#0000FF'];
const SHAPE_SIZE = 20;
const SEP = 5;

objs = [];

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    for (var x = 0; x < CELL_X_COUNT; x++) {
        for (var y = 0; y < CELL_Y_COUNT; y++) {
            objs.push(new O(x, y, randint(0,2), randint(0,2), randint(0,2), randint(0,2)));
        }
    }
}

function draw() {
    drawgrid();
    for(var i = 0; i < objs.length; i++) {
        objs[i].draw();
    }
}

function drawgrid() {
    fill(255);
    stroke(0);    
    rect(MARGIN, MARGIN, WINDOW_WIDTH-MARGIN*2, WINDOW_HEIGHT-MARGIN*2);
    for(var x = 0; x < CELL_X_COUNT; x++) {
        line(MARGIN + x * CELL_SIZE_X, MARGIN, MARGIN + x * CELL_SIZE_X, WINDOW_HEIGHT-MARGIN);
    }
    for(var y = 0; y < CELL_Y_COUNT; y++) {
        line(MARGIN, MARGIN + y * CELL_SIZE_Y, WINDOW_WIDTH-MARGIN, MARGIN + y * CELL_SIZE_Y);
    }
}

class O {
    constructor(x, y, color, shape, filled, number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
        this.filled = filled;
        this.number = number;
    }

    update(color, shape, filled, number) {
        this.color = color;
        this.shape = shape;
        this.filled = filled;
        this.number = number;
    }

    draw() {
        let c = color(COLOR_MAP[this.color]);
        stroke(c);
        strokeWeight(1);
        if (this.filled == 0) {
            noFill();
        } else if (this.filled == 1) {
            c.setAlpha(100);
            fill(c);
        } else if (this.filled == 2) {
            fill(c);
        }

        let centerX = MARGIN + this.x * CELL_SIZE_X + CELL_SIZE_X / 2;
        let centerY = MARGIN + this.y * CELL_SIZE_Y + CELL_SIZE_Y / 2;
        point(centerX, centerY);
        const centerXs = [[centerX], [centerX - SHAPE_SIZE - SEP/2, centerX + SHAPE_SIZE + SEP/2], [centerX - SHAPE_SIZE - SEP, centerX, centerX + SHAPE_SIZE + SEP]];
        if (this.shape == 0) {
            for (var i = 0; i < centerXs[this.number].length; i++) {
                circle(centerXs[this.number][i], centerY, SHAPE_SIZE);
            }
        } else if (this.shape == 1) {
            rectMode(CENTER);
            for (var i = 0; i < centerXs[this.number].length; i++) {
                rect(centerXs[this.number][i], centerY, SHAPE_SIZE, SHAPE_SIZE);
            }
            rectMode(CORNER);
        } else if (this.shape == 2) {
            for (var i = 0; i < centerXs[this.number].length; i++) {
                triangle(centerXs[this.number][i] - SHAPE_SIZE/2, centerY-sqrt(3)*SHAPE_SIZE/6, centerXs[this.number][i], centerY+sqrt(3)*SHAPE_SIZE/3, centerXs[this.number][i] + SHAPE_SIZE/2, centerY-sqrt(3)*SHAPE_SIZE/6);
            }
        }
    }
}

function randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}