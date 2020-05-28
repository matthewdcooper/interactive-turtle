/*

I'm unsure what the role of the turtle should be exactly. It could literally just be an object that moves about based on commands: move [distance], turn [angle]. 

Should the turtle also be responsible for remembering the path, or is that a data structure that should be abstracted away from the turtle?

Let's start with simple movement.

*/

class Turtle {
    constructor(position, color) {
        this.pos = position;
        this.target = position.copy();
        this.col = color;
        this.dir = 0; // radians

        this.state = "rest"; // rest, drawing, moving
    }

    update() {
        if (this.pos.distance(this.target) < 1) return;
        const v = this.target.copy().sub(this.pos).norm();
        this.pos.add(v);
    }

    draw() {
        /*
        ctx.save();
        ctx.strokeStyle = this.col;
        ctx.rotate(this.dir);
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x+5, this.pos.y+5);
        ctx.lineTo(this.pos.x-5, this.pos.y-5);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        */
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
        ctx.fill()
    }

    move(distance) {
        const unit = new Vector(Math.cos(this.dir), Math.sin(this.dir));
        const v = unit.mult(distance);
        this.target = this.pos.copy().add(v);
    }

    turn(theta) {
        this.dir += theta;
    }




}

