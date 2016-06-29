import {color} from "./util/generator";
import Particle from "./particle";
const v=5;

class Bullet extends Particle{
  initialize(x, y){
    this.vx=0;
    this.vy=-10;
    this.x=x;
    this.y=y;
    this.color={
      r:255,
      g:0,
      b:0
    }
    this.state="live";
  }
  flow(){
    this.state="death";
  }
}
export default Bullet;