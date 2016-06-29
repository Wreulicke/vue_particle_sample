import random from "./random";
function* velocity(v){
  const _v=random(-v,v);
  while(true)yield _v();
}

function* color(){
  const _c=random(255);
  while(true)yield _c();
}
export {velocity, color};