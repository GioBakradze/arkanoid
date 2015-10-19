function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function getF(k, b) {
    return function(x) {
        return k * x + b;
    };
}

var linear = {
    getSlope: function(x1, y1, x2, y2) {
        if (x1 == x2) return false;
        return (y1 - y2) / (x1 - x2);
    },
    getYInt: function(x1, y1, x2, y2) {
        if (x1 === x2) return y1 === 0 ? 0 : false;
        if (y1 === y2) return y1;
        return y1 - this.getSlope(x1, y1, x2, y2) * x1;
    },
    getXInt: function(x1, y1, x2, y2) {
        var slope;
        if (y1 === y2) return x1 === 0 ? 0 : false;
        if (x1 === x2) return x1;
        return (-1 * ((slope = this.getSlope(x1, y1, x2, y2)) * x1 - y1)) / slope;
    },
    getInt: function(x11, y11, x12, y12, x21, y21, x22, y22) {
        var slope1, slope2, yint1, yint2, intx, inty;

        // check if either of the points are the same. if so that's our intersection
        if (x11 == x21 && y11 == y21) return [x11, y11];
        if (x12 == x22 && y12 == y22) return [x12, y22];

        // get slope: (y1 - y1) / (x1 - x2)
        slope1 = this.getSlope(x11, y11, x12, y12);
        slope2 = this.getSlope(x21, y21, x22, y22);

        // if both lines have the same slope, they are paralell; never touch.
        if (slope1 === slope2) return false;

        // get y-intersection: y - slope * x
        yint1 = this.getYInt(x11, y11, x12, y12);
        yint2 = this.getYInt(x21, y21, x22, y22);

        // check to see if both lines have the same yintcept, and if so, return the point
        if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

        // if one of the lines doesn't have a slope:
        if (slope1 === false) return [x21, slope2 * x21 + yint2];
        if (slope2 === false) return [x11, slope1 * x11 + yint1];

        //if both lines have a slop and y intercept, calulate the x-intercept:
        // (slope1 * x1 + yint1 - yint2) / slope2;
        intx = (slope1 * x11 + yint1 - yint2) / slope2;

        // calculate the y-intercept, and return an array:
        return [intx, slope1 * intx + yint1];
    }
};

function getIntersection(a, b, c, d) {
    return linear.getInt(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
}

export default {
    toRadians: toRadians,
    distance: distance,
    getIntersection: getIntersection,
    getF: getF
};
