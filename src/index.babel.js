import 'babel-core/register';
import 'babel-polyfill';
import 'material-design-lite';

import Vue from 'vue';
import VueMdl from 'vue-mdl';
import Particle from './module/particle';

Vue.use(VueMdl);

document.addEventListener('DOMContentLoaded',() =>{
  const App=Vue.extend({
    created:function() {
      const n=300;
      for (var i = 0; i < n; i++)this.particles.push(new Particle(this.width, this.height));
    },
    ready:function() {
      setTimeout(this.tick,200);
    },
    methods:{
      calc:function(particle){
        if(this.cursor.enable){
          const inRange=Math.hypot(particle.x-this.cursor.x,particle.y-this.cursor.y) < this.cursor.r;
          if(!particle.controlled){
            if(inRange){
              particle.force(this.cursor.x, this.cursor.y);
              particle.controlled=true;
            }
          }else if(!inRange)particle.controlled=false;
        }
        particle.update(this.width, this.height);
      },
      tick:function(){
        this.particles.forEach(this.calc, this);
        setTimeout(this.tick,30);
      },
      calcVelocity:function (particle) {
        particle.updateVelocity();
      },
      updateVelocity:function () {
        this.particles.forEach(this.calcVelocity,this);
      },
      updateCursor:function(e){
        this.cursor.x=e.offsetX;
        this.cursor.y=e.offsetY;
        if(!this.cursor.enable)this.cursor.enable=true;
      }
    },
    data:() => {
      return {
        cursor:{
          x:0,
          y:0,
          r:100,
          enable:false
        },
        width:800,
        height:600,
        particles:[
        ]
      }
    }
  });
  window.e=new App({el:document.body});
})

  