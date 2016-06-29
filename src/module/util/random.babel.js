export default function random(s,e){
  const range=e?e-s:s;
  const offset=e?s:0;
  return () => range*Math.random()+offset;
}