import * as P5 from 'p5';
import PointMass from "./PointMass";
import './shatter.css'

class Shatter {
  container:HTMLDivElement;
  hammer:HTMLImageElement;
  col:number = 7;
  points:any = Array();
  frameRate:number = 100;
  isShattered:boolean = false;
  constructor(container: HTMLDivElement, hammer:HTMLImageElement) {
    this.container = container;
    this.hammer = hammer;
    new P5(this.sketch);
    this.populateMass();

    this.hammer.addEventListener("click", () => {
      this.hammer.classList.add("hammertime");
    })
  }

  populateMass = () => {
    const sideLength = this.container.clientWidth / this.col;
    const rows = Math.ceil(this.container.clientHeight / sideLength);

    for(let r = 0; r < rows; r++) {
      for(let i = 0; i < this.col; i++) {
        let point = new PointMass({ 
          velX: {min: -0.5, max: 0.5},
          velY: {min: -1, max: 0},
          position: {x: i * sideLength, y: r * sideLength},
          points: this.points,
          frameRate: this.frameRate,
          paused: true,
          radius: {width: sideLength, height: sideLength}
        });
        this.points.push(point);
      }
    }

  }

  sketch = (p5: P5) => {
    const self = this;

    p5.setup = () => {
      const canvas = p5.createCanvas(this.container.clientWidth, this.container.clientHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('z-index', '1');
      p5.frameRate(this.frameRate);
    }

    p5.windowResized = () => {
      if(!this.isShattered) {
        this.points = [];
        this.populateMass();
      }
      p5.resizeCanvas(this.container.clientWidth, this.container.clientHeight);
    }

    p5.mousePressed = () => {
      self.isShattered = true;
     self.points.forEach((point:PointMass) => {
      point.paused = false;
     })
    }

    p5.draw = () => {
      p5.clear(0,0,0,0);
      if(!this.isShattered) {
        p5.background(0);
      }
     
      if(this.points.length > 0) {
        this.points.forEach((point:PointMass) => {
          point.update((position: any) => {
            p5.push();
            p5.stroke(0);
            p5.fill(0);
            p5.translate(position.x,position.y)
            p5.rect(0, 0, point.radius.width, point.radius.height); 
            p5.pop();
          });
        });
      }
    }
  }
  
}

export default Shatter;
