import 'babel-core/register';
import 'babel-polyfill';
import 'material-design-lite';

import Vue from 'vue';
import VueMdl from 'vue-mdl';
import Particle from './module/particle';
import Bullet from './module/Bullet';

Vue.use(VueMdl);
const d=10;
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
        /**
         * このへんイラネ
         */
        if(this.cursor.enable){
          const inRange=Math.hypot(particle.x-this.cursor.x,particle.y-this.cursor.y) < this.cursor.r;
          if(!particle.controlled){
            if(inRange){
              particle.reflect(this.cursor.x, this.cursor.y);
              particle.controlled=true;
            }
          }else if(!inRange)particle.controlled=false;
        }
        particle.update(this.width, this.height);
        if(particle.state==="death"){
          this.particles.$remove(particle);
        }
      },
      tick:function(){
        this.particles.forEach(this.calc, this);
        switch (this.keyState) {
          case "Left":
            this.player.x-=d;
            break;
          case "Right":
            this.player.x+=d;
            break;
          case "Up":
            this.player.y-=d;
            break;
          case "Down":
            this.player.y+=d;
            break;
          case "U+0058":
            this.particles.push(new Bullet(this.player.x,this.player.y-this.player.r))
            break;
          default:
            break;
        }
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
      },
      onKeydown: function (e) {
        console.log(e.keyIdentifier);
        this.keyState=e.keyIdentifier;
      }
    },
    data:() => {
      return {
        cursor:{
          x:0,
          y:0,
          r:0,
          enable:false
        },
        player:{
          x:400,
          y:500,
          r:5
        },
        width:800,
        height:600,
        particles:[
        ],
        keyState:""
      }
    }
  });
  window.e=new App({el:document.body});
})

  