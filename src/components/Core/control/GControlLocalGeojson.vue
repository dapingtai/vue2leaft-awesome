<template>
  <div style="display: none;">
    <slot v-if="ready">
      <!--控制本地GeoJson按扭-->
      <LControl class="geocloud-control-menu" :position="position">
        <a :class="{'geocloud-control-menu-icon':true, active: menuControlIconActive}"
           @click="controlMenuContent"
        >
          <i class="fas fa-file-import"></i>
        </a>
      </LControl>
      <!--控制本地GeoJson面板-->
      <transition name="menu-slide">
        <slot v-if="menuShow">
          <LControl class="collapse-show" :position="position">
            <div class="card-body geocloud-menuContent-localGeojson">
              <span class="close-content" @click="closeMenuContent">x</span>
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th>本地目錄</th>
                </tr>
                </thead>
                <tbody>
                <tr class="title">
                  <td>
                    <div class="geocloud-menuContent-localGeojson" v-for="(file, index) in files" :key="index">
                      <div class="geocloud-localGeojson-button">
                        <div class="geocloud-localGeojson-describe"
                             @click="changeGeojson($event, index)"
                        >
                          {{file}}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </LControl>
        </slot>
      </transition>
    </slot>
    <!--顯示本地GeoJson-->
    <LGeoJson :geojson="geojson" :options="geojsonOptions"></LGeoJson>
  </div>
</template>

<script>
import {LControl, LGeoJson} from 'vue2-leaflet';
import axios from 'axios';

const props = {
  position: {
    type: String,
    default: "topright"
  },
  geojsonOptions: {
    type: Object,
    default: () => ({
      style: {
        color: '#DFDFDF',
        weight: 1,
        fillColor: 'blue',
        fillOpacity: 0.5,
      }
    })
  }
}

export default {
  name: "GControlLocalGeojson",
  props: props,
  components: {
    LControl,
    LGeoJson
  },
  data: ()=>(
    {
      ready: false,
      menuControlIconActive: false,
      menuShow: false,
      geojson: null,
      files: Array
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
      let getfiles = require.context('@/assets/geojson/', true, /\.geojson$/).keys();
      let files = [];
      getfiles.forEach(
        (file)=> {
          files.push(file.replace('./', ''));
        }
      )
      this.files = files;
    },
    /** Menu Content控制開關 **/
    closeMenuContent(){
      this.menuControlIconActive = false;
      this.menuShow = false;
    },
    changeGeojson(event, index) {
      let allEvents = document.querySelectorAll('.geocloud-localGeojson-describe');
      // 先移除所有的active，再於指定目標加入active
      allEvents.forEach(
          (event)=>{
            event.classList.remove('active');
          }
      )
      event.currentTarget.classList.toggle('active');
      if(event.currentTarget.classList.contains('active')){
        console.log("Start Change");
        let filepath = `./geojson/${this.files[index]}`;
        axios.get(filepath, {'Content-Type': 'application/json'}).then(
            (res)=> {
              this.geojson = res.data;
            }
        )
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
  width: 30px;
  height: 30px;
  line-height: 30px;
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
  width: 30px;
  height: 30px;
  line-height: 30px;
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
  width: 240px;
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

/**** Menu Content Table ****/

.table{
  width: 100%;
  margin-bottom: .3rem;
  padding-bottom: 5px;
}

table {
  border: 1px solid #0c0c0c;
  border-collapse: collapse;
  text-align: center;
}

tr{
  padding: .1rem;
}

th{
  border: 1px solid #0c0c0c;
}

td{
  padding: .5rem;
}

/**** Menu Content Table body ****/
.geocloud-localGeojson-button {
  margin: 5px 6px;
  cursor: pointer;
  transition: 0.3s;
  background-color: #FAFAFA;
  border: 1px solid #8ab48c;
}

.geocloud-localGeojson-describe {
  background-color: #FAFAFA;
  color: #4CAF50;
  opacity: 0.9;
  font-family: 微軟正黑體;
  padding: 4px 8px;
  transition: 0.3s;
  cursor: pointer;
}

.geocloud-localGeojson-describe.active {
  background-color: #4CAF50;
  color: #FAFAFA;
  opacity: 0.9;
  font-family: 微軟正黑體;
  padding: 4px 8px;
  transition: 0.3s;
  cursor: pointer;
}


</style>
