const v=10;
function rand(s,e){
  const range=e?e-s:s;
  const offset=e?s:0;
  return () => range*Math.random()+offset;
}
function toHex(code) {
  return Math.floor(code).toString(16);
}

function* velocity(){
  const _v=rand(-v,v);
  while(true)yield _v();
}

function* color(){
  const _c=rand(255);
  while(true)yield _c();
}
const vf=velocity();
const cf=color();
class ColofulParticle{
  constructor(width, height){
    this.vx=vf.next().value;
    this.vy=vf.next().value;
    this.x=rand(width)();
    this.y=rand(height)();
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
      this.x=(this.x+width)%width;
      this.y+=this.vy;
      this.y=(this.y+height)%height;
  }
  updateVelocity(){
    this.vx=vf.next().value;
    this.vy=vf.next().value;
  }
  force(x, y){
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
export default ColofulParticle;