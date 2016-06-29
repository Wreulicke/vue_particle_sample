const v=10;
import random from "./util/random";
import toHex from "./util/toHex";
import {velocity,color} from "./util/generator"

const vf=velocity(v);
const cf=color();
class Particle{
  constructor(){
    this.initialize.apply(this,arguments);
  }
  initialize(width, height){
    this.vx=vf.next().value;
    this.vy=vf.next().value;
    this.x=random(width)();
    this.y=random(height)();
    this.color={
      r:cf.next().value,
      g:cf.next().value,
      b:cf.next().value
    }
    this.controlled=false;
  }
  toColor(){
    return `#${toHex(this.color.r)}${toHex(this.color.g)}${toHex(this.color.b)}`
  }
  
  update(width, height){
      this.x+=this.vx;
      this.y+=this.vy;
      if(this.x>width||this.x<0){
        this.flow("x",width);
      };
      if(this.y>height||this.y<0){
        this.flow("y", height);
      }
  }
  flow(type, range){
    switch (type) {
      case "x":
        this.x=(this.x+range)%range;
        break;
      default:
        this.y=(this.y+range)%range;
        break;
    }
  }
  updateVelocity(){
    this.vx=vf.next().value;
    this.vy=vf.next().value;
  }
  /**
   * not used
   */
  reflect(x, y){
    const vx=this.vx;
    const vy=this.vy;

    const alpha=Math.atan2(y-this.y,x-this.x);
    const beta=Math.atan2(vy,vx);

    let theta=2*(alpha-beta);
    const sin=Math.sin(theta);
    const cos=Math.cos(theta);

    this.vx=-(vx*cos-vy*sin);
    this.vy=-(vx*sin+vy*cos);
  }
}
export default Particle;