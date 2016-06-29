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
      for (var i = 0; i < n; i++){
        let particle=new Particle(this.width,this.height);
        this.particles.push(particle);
      }
    },
    ready:function() {
      setTimeout(this.tick,200);
    },
    methods:{
      calc:function(particle){
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
      onKeydown: function (e) {
        console.log(e.keyIdentifier);
        this.keyState=e.keyIdentifier;
      }
    },
    data:() => {
      return {
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

  