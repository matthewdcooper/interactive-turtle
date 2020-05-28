class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    norm() {
        const m = this.mag();
        this.x /= m;
        this.y /= m;
        return this;

    }

    distance(v) {
        const x = Math.abs(this.x - v.x);
        const y = Math.abs(this.y - v.y);
        return Math.sqrt(x*x + y*y);
    }

    copy() {
        return new Vector(this.x, this.y);
    }

}