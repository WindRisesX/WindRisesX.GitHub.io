<template>
    <canvas id="canvas"></canvas>
</template>

<script>
function Line(direction, ctx, ctxWidth, ctxHeight) {
  this.ctx = ctx
  this.direction = direction;
  this.startPoint = {};
  this.endPoint = {};
  this.ctxWidth = ctxWidth
  this.ctxHeight = ctxHeight

  if (direction == "v") {
    this.startPoint.y = 0;
    this.endPoint.y = ctxHeight;
    this.startPoint.x = randomIntFromInterval(0, ctxWidth);
    this.endPoint.x = randomIntFromInterval(0, ctxWidth);
  } else {
    this.startPoint.x = 0;
    this.endPoint.x = ctxWidth;
    this.startPoint.y = randomIntFromInterval(0, ctxHeight);
    this.endPoint.y = randomIntFromInterval(0, ctxHeight);
  }
  this.va = randomIntFromInterval(15, 75) / 100;
  this.vb = randomIntFromInterval(15, 75) / 100;
}

Line.prototype = {
  draw() {
    this.ctx.strokeStyle = "#eef2f3";
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
    this.ctx.stroke();
  },

  update() {
    if ((this.direction == "v")) {
      this.startPoint.x += this.va;
      this.endPoint.x += this.vb;
    } else {
      this.startPoint.y += this.va;
      this.endPoint.y += this.vb;
    }

    // 到达边缘时改变方向
    if (this.direction == "v") {
      if (this.startPoint.x < 0 || this.startPoint.x > this.ctxWidth) {
        this.va *= -1;
      }
      if (this.endPoint.x < 0 || this.endPoint.x > this.ctxWidth) {
        this.vb *= -1;
      }
    } else {
      if (this.startPoint.y < 0 || this.startPoint.y > this.ctxHeight) {
        this.va *= -1;
      }
      if (this.endPoint.y < 0 || this.endPoint.y > this.ctxHeight) {
        this.vb *= -1;
      }
    }
  },

    // 绘制交叉点
  drawIntersection(line) {
    let p1 = this.startPoint,
      p2 = this.endPoint,
      p3 = line.startPoint,
      p4 = line.endPoint;
    let denominator =
      (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
    let ua =
      ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
      denominator;
    let ub =
      ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) /
      denominator;
    let x = p1.x + ua * (p2.x - p1.x);
    let y = p1.y + ua * (p2.y - p1.y);
    if (ua > 0 && ub > 0) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#8e9eab";
      this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
};

function randomIntFromInterval(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}

export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      linesNum: 16,
      lines: [],
      requestId: null,
      ctxWidth: 0,
      ctxHeight: 0
    };
  },
  mounted() {
    let canvas = document.getElementById("canvas");
    this.canvas = canvas;
    this.ctxWidth = canvas.width = window.innerWidth;
    this.ctxHeight = canvas.height = window.innerHeight;

    this.ctx = canvas.getContext("2d");

    for (let i = 0; i < this.linesNum; i++) {
      let direction = i % 2 == 0 ? "h" : "v";
      let l = new Line(direction, this.ctx, this.ctxWidth, this.ctxHeight);
      this.lines.push(l);
    }
    this.draw();
    window.addEventListener("resize", this.init, false);
  },
  methods: {
    init() {
      this.lines = [];
      for (let i = 0; i < this.linesNum; i++) {
          let direction = i % 2 == 0 ? "h" : "v";
          let l = new Line(direction, this.ctx, this.ctxWidth, this.ctxHeight);
        this.lines.push(l);
      }
      if (this.requestId) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
      }
      this.ctxWidth = this.canvas.width = window.innerWidth;
      this.ctxHeight = this.canvas.height = window.innerHeight;
      this.draw();
    },
    draw() {
      this.requestId = window.requestAnimationFrame(this.draw);
      this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight);

      for (let i = 0; i < this.lines.length; i++) {
        let l = this.lines[i];
        l.draw();
        l.update();
      }
      for (let i = 0; i < this.lines.length; i++) {
          let l = this.lines[i];
        for (let j = i + 1; j < this.lines.length; j++) {
          var l1 = this.lines[j];
          l.drawIntersection(l1);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#canvas {
  position: fixed;
  z-index: -1;
}
</style>
