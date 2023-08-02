import { getRandomInt } from './utils/getRandomInt';

interface OptionsObject {
  gravity?: number,
  velX?: any,
  velY?: any,
  position?: PositionObject,
  boundaries?: BoundariesObject,
  radius?: BoundariesObject,
  colour?: any,
  life?: any,
  points?: any,
  frameRate?:number,
  paused?: boolean
}

interface PositionObject {
  x:number,
  y:number
}

interface BoundariesObject {
  width:number,
  height:number
}

class PointMass {
  frameRate:number = 1/30;
  paused:boolean = false;
  Cd:number = 0.47;
  rho:number = 1.22;
  A:number = Math.PI * 8 * 8 / (10000);
  ag:number = 9.81; //9.81 earth's gravity
  restitution:number = -0.7;
  mass:number = 1; // kg
  position:PositionObject = { x: 0, y: 0};
  velocity:PositionObject;
  velX:number = getRandomInt(-10,10);
  velY:number = getRandomInt(-10,10);
  boundaries:BoundariesObject;
  radius:BoundariesObject = { width: 0, height: 0};
  colour:any = [255,75,40];
  life:number = getRandomInt(500,2000);
  pointmasses:any;
  creation_time:number;
  

  constructor(options?: OptionsObject) {

    if(options && options.gravity){
      this.ag = options.gravity
    }

    if(options && options.velX !== null){
      if(typeof options.velX === "object"){
        //if there it is an object with two values
        this.velX = getRandomInt(options.velX.min,options.velX.max);
      } else {
        this.velX = options.velX;
      }
    }

    if(options && options.velY !== null){
      if(typeof options.velY === "object"){
        //if there it is an object with two values
        this.velY = getRandomInt(options.velY.min,options.velY.max);
      } else {
        this.velY = options.velY;
      }
    }

    if(options && options.boundaries) {
      this.boundaries = options.boundaries;
    }
    
    if(options && options.radius) {
      this.radius = options.radius;
    } 

    if(options && options.colour) {
      this.colour = options.colour;
    }

    if(options && options.life){
      this.life = getRandomInt(options.life.min,options.life.max); // in ms;
    }

    if(options && options.position) {
      this.position = options.position;
    }

    if(options && options.points) {
      this.pointmasses = options.points;
    }

    if(options && options.frameRate) {
      this.frameRate = 1 / options.frameRate;
    }

    if(options && options.paused) {
      this.paused = options.paused
    }

    this.velocity = { x:this.velX, y:this.velY };
    this.creation_time = Date.now();

  }

  update = (updateEvent: (position: PositionObject) => void) => {

    if(!this.paused) {
      // Drag force: Fd = -1/2 * Cd * A * rho * v * v
      let Fx = -0.5 * this.Cd * this.A * this.rho * this.velocity.x * this.velocity.x * this.velocity.x / Math.abs(this.velocity.x);
      let Fy = -0.5 * this.Cd * this.A * this.rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);
      Fx = (isNaN(Fx) ? 0 : Fx);
      Fy = (isNaN(Fy) ? 0 : Fy);

      // Calculate acceleration ( F = ma )
      let ax = Fx / this.mass;
      let ay = this.ag + (Fy / this.mass);
      this.velocity.x += ax*this.frameRate;
      this.velocity.y += ay*this.frameRate;
      this.position.x += this.velocity.x*this.frameRate*100;
      this.position.y += this.velocity.y*this.frameRate*100;
      this.position.x = Math.round(this.position.x * 100) / 100;
      this.position.y = Math.round(this.position.y * 100) / 100;

      if(this.boundaries) {
        if (this.position.y < 0) {
          this.velocity.y *= this.restitution;
          this.position.y = this.radius.height;
          
        }
        if (this.position.y > this.boundaries.height - this.radius.height) {
          this.velocity.y *= this.restitution;
          this.position.y = this.boundaries.height - this.radius.height;
        }
        if (this.position.x > this.boundaries.width - this.radius.width) {
          this.velocity.x *= this.restitution;
          this.position.x = this.boundaries.width - this.radius.width;
        }
        if (this.position.x < 0) {
          this.velocity.x *= this.restitution;
          this.position.x = 0;
        }
      }

    }
    updateEvent(this.position);
  }

  destroy = () => {
    const loc = this.pointmasses.indexOf(this);
    if(loc > -1){
      //exists
      this.pointmasses.splice(loc,1);
    }
  }

}

export default PointMass;