<template>
  <div style="display: none;">
    <slot v-if="ready">
      <!--控制底圖目錄-->
      <LControl class="geocloud-control-menu" :position="position">
        <img
           :src="svg"
           :class="{'geocloud-control-menu-icon':true, active: menuControlIconActive}"
           @click="controlMenuContent"
        >
      </LControl>
      <!--控制底圖目錄面板-->
      <transition name="menu-slide">
        <slot v-if="menuShow">
          <LControl class="collapse-show" :position="position">
            <span class="close-content" @click="closeMenuContent">x</span>
            <div class="card-body geocloud-menuContent-tile">
              <h2 style="text-align:left">1.選擇範圍</h2>
              <div class="G_moduleRow">
                <div class="G_labelSquare">
                  <i class="fas fa-square fa-3x"></i>
                  <span>方形</span>
                </div>
                <div class="G_labelPolygon">
                  <i class="fas fa-draw-polygon fa-3x"></i>
                  <span>多邊形</span>
                </div>
                <div class="G_labelCircle">
                  <i class="fas fa-circle fa-3x"></i>
                  <span>圓形</span>
                </div>
                <div class="G_labelCircle">
                  <i class="fas fa-street-view fa-3x"></i>
                  <span>半徑</span>
                </div>
              </div>
              <h2 style="text-align:left">2.選擇潛勢災害</h2>
              <h2 style="text-align:left">3.開始潛勢分析</h2>
              <button>產生潛勢分析報告</button>
            </div>
          </LControl>
        </slot>
      </transition>
    </slot>
  </div>
</template>

<script>
import {LControl} from 'vue2-leaflet';
import radar from '@/assets/img/radar.svg'

const props = {
  position: {
    type: String,
    default: "topright"
  }
}

export default {
  name: "GControlLayers",
  props: props,
  components: {
    LControl
  },
  data: ()=>(
      {
        svg: radar,
        ready: false,
        menuControlIconActive: false,
        menuShow: false,
      }
  ),
  methods: {
    /** Menu 控制開關 **/
    controlMenuContent(){
      if(this.menuControlIconActive){
        this.menuControlIconActive = false;
        this.menuShow = false;
      }else {
        this.menuControlIconActive = true;
        this.menuShow = true;
      }
    },
    /** Menu Content控制開關 **/
    closeMenuContent(){
      this.menuControlIconActive = false;
      this.menuShow = false;
    },
    changeLayer(event, groupindex, layerindex){
      let allEvents = document.querySelectorAll('.geocloud-tile-describe');
      // 先移除所有的active，再於指定目標加入active
      allEvents.forEach(
          (event)=>{
            event.classList.remove('active');
          }
      )
      event.currentTarget.classList.toggle('active');
      if(event.currentTarget.classList.contains('active')){
        console.log("Start Change");
        this.layerObject = this.layers[groupindex].layers[layerindex];
        this.$emit("layerChanged", this.layerObject);
      }else {
        console.log("No Change");
      }
    }
  },
  mounted() {
    this.ready = true
  }
}
</script>

<style scoped>
/**** Menu ****/
.geocloud-control-menu-icon {
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  color: #2196F3;
  background-color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  display: block;
  text-align: center;
  text-decoration: none;
  margin-bottom: 4px;
  cursor: pointer;
}

.geocloud-control-menu-icon.active {
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  color: #2196F3;
  background-color: orange;
  width: 50px;
  height: 50px;
  line-height: 50px;
  display: block;
  text-align: center;
  text-decoration: none;
  margin-bottom: 4px;
  cursor: pointer;
}

/**** Menu Content ****/
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all .8s ease;
}

.menu-slide-enter {
  transform: translateX(50px);
  opacity: 0;
}

.menu-slide-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.collapse-show{
  top: 0px;
  width: 300px;
  border-radius: .25rem;
  background-color: white;
  box-shadow: 0 3px 1px lightgray, 0 3px 1px gray;
  padding: .2rem;
}

.close-content {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  cursor: pointer;
  padding-right: .1rem;
}
.close-content:hover{
  opacity: .5;
}


.G_moduleRow{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: auto;
}

.G_labelSquare, .G_labelPolygon, .G_labelCircle{
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  width: 50px;
  height: fit-content;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.G_labelSquare span, .G_labelPolygon span, .G_labelCircle span{
  font-size: 1rem;
}

</style>

