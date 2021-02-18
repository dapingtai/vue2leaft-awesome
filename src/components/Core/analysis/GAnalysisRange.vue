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
            <b-card
                header="Primary"
                header-bg-variant="primary"
                header-text-variant="white"
            >
              <template #header>
                <b-row>
                  <b-col cols="10" style="text-align: left">
                    <h5>環域分析工具</h5>
                  </b-col>
                  <b-col cols="2">
                    <span class="close-content" @click="closeMenuContent">x</span>
                  </b-col>
                </b-row>
              </template>
              <div class="geocloud-menuContent">
                <b-card>
                  <template #header><h5 style="text-align: left">1.選擇範圍</h5></template>
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
                  <div>
                    <b-input placeholder="輸入座標"></b-input>
                    <br>
                    <b-row>
                      <b-col cols="2" style="padding: 0">
                        半徑：
                      </b-col>
                      <b-col cols="10" style="padding: 0">
                        <b-row>
                          <b-col cols="1" style="padding: 0"><p>0</p></b-col>
                          <b-col cols="8" style="padding: 0">
                            <b-form-input id="range-1" v-model="value" type="range" min="0" max="5"></b-form-input>
                          </b-col>
                          <b-col cols="3" style="padding: 0">
                            <p>10公里</p>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>

                  </div>
                </b-card>
                <br>
                <b-card>
                  <template #header>
                    <h5 style="text-align:left">2.選擇潛勢災害</h5>
                  </template>
                  <b-list-group-item v-b-toggle.collapse-1-inner class="d-flex align-items-center">
                    <b-avatar variant="info" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/ROC_Water_Resources_Agency_Seal.svg/1200px-ROC_Water_Resources_Agency_Seal.svg.png" class="mr-3"></b-avatar>
                    <span class="mr-auto"><b style="font-size: 16px">淹水潛勢</b></span>
                    <b-badge variant="primary">10</b-badge>
                  </b-list-group-item>
                  <b-collapse id="collapse-1-inner" class="mt-2">
                    <b-card>
                      <b-row>
                        <b-checkbox v-for="item in water" :key="item">
                          {{item}}
                        </b-checkbox>
                      </b-row>
                    </b-card>
                  </b-collapse>

                  <br>

                  <b-list-group-item v-b-toggle.collapse-2-inner class="d-flex align-items-center">
                    <b-avatar variant="success" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ROC_Central_Geological_Survey_Emblem.svg/200px-ROC_Central_Geological_Survey_Emblem.svg.png" class="mr-3"></b-avatar>
                    <span class="mr-auto"><b style="font-size: 16px">土石流/山崩</b></span>
                    <b-badge variant="warning">10</b-badge>
                  </b-list-group-item>

                  <b-collapse id="collapse-2-inner" class="mt-2">
                    <b-card>Hello!</b-card>
                  </b-collapse>

                  <br>

                  <b-list-group-item v-b-toggle.collapse-3-inner class="d-flex align-items-center">
                    <b-avatar variant="success" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ROC_Central_Geological_Survey_Emblem.svg/200px-ROC_Central_Geological_Survey_Emblem.svg.png" class="mr-3"></b-avatar>
                    <span class="mr-auto"><b style="font-size: 16px">斷層/土壤液化</b></span>
                    <b-badge>3</b-badge>
                  </b-list-group-item>

                  <b-collapse id="collapse-3-inner" class="mt-2">
                    <b-card>Hello!</b-card>
                  </b-collapse>

                  <br>

                  <b-list-group-item v-b-toggle.collapse-4-inner class="d-flex align-items-center">
                    <b-avatar variant="success" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ROC_Central_Geological_Survey_Emblem.svg/200px-ROC_Central_Geological_Survey_Emblem.svg.png" class="mr-3"></b-avatar>
                    <span class="mr-auto"><b style="font-size: 16px">火山潛勢</b></span>
                    <b-badge variant="success">3</b-badge>
                  </b-list-group-item>
                  <b-collapse id="collapse-4-inner" class="mt-2">
                    <b-card>Hello!</b-card>
                  </b-collapse>
                </b-card>
                <br>
                <b-card>
                  <template #header>
                    <h5 style="text-align:left">3.開始潛勢分析</h5>
                  </template>
                  <div class="d-inline-block" style="font-size: 1rem;">
                    <b-form-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        :title="tag.name"
                        pill
                        :variant="tag.variant"
                        size="sm"
                        class="mr-1"
                    >
                      {{ tag.name }}
                    </b-form-tag>
                  </div>
                  <div style="padding-top: 5px">
                    <b-button variant="danger">
                      <i class="fas fa-file-pdf"></i>
                      產生潛勢分析報告
                    </b-button>
                  </div>
                  <template #footer>
                    <b-row>
                      <b-col cols="4"><span>分析進度：</span></b-col>
                      <b-col cols="8"><b-progress value="45" max="100" show-progress animated></b-progress></b-col>
                    </b-row>
                  </template>
                </b-card>
              </div>
            </b-card>
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
        water: [
          '6小時150毫米', '6小時250毫米', '6小時350毫米',
          '12小時200毫米', '12小時300毫米', '12小時400毫米',
          '24小時200毫米', '24小時350毫米', '24小時500毫米', '24小時650毫米'
        ],
        tags: [
          { name: '6小時150毫米', variant: 'primary' },
          { name: '土壤液化', variant: 'warning' },
          { name: '七星山', variant: 'success' }
        ]
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
  width: 400px;
  overflow-y: scroll;
  border-radius: .25rem;
  background-color: white;
  box-shadow: 0 3px 1px lightgray, 0 3px 1px gray;
  padding: .2rem;
  max-height: calc(90vh);
}

.close-content {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: white;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  cursor: pointer;
  padding-right: .1rem;
}
.close-content:hover{
  color: #0c0c0c;
  opacity: .5;
}

.geocloud-menuContent{
  margin: 0 10px 0 10px;
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

