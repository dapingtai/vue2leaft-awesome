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
        <LControl class="collapse-show" :position="position" v-show="menuShow">
          <div class="card-body geocloud-menuContent-localGeojson">
            <span class="close-content" @click="closeMenuContent">x</span>
            <table class="table table-bordered" v-for="(group, groupindex) in geojsons" :key="group.name">
              <thead>
              <tr>
                <th>{{group.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="title">
                <td>
                  <div class="geocloud-menuContent-localGeojson" v-for="(file, fileindex) in group.geojsons" :key="fileindex">
                    <div class="geocloud-localGeojson-button">
                      <div class="geocloud-localGeojson-describe"
                           @click="changeGeojson($event, groupindex, fileindex)"
                      >
                        {{file.name}}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <label for="geoJson-upload" class="custom-geoJson-upload">
            <i class="fas fa-upload"></i>
          </label>
          <input id="geoJson-upload" type="file" @change="handleGeojson"/>

          <button class="geocloud-localGeojson-removeDescribes" @click="removeGeojson">
            Remove All
          </button>
        </LControl>
      </transition>
      <!--顯示本地GeoJson-->
      <slot v-if="geojsonShow">
        <div v-for="(geojson, index) in addGeoJsons" :key="index">
          <LGeoJson :geojson="geojson.data" :options="geojsonOptions"></LGeoJson>
        </div>
      </slot>
    </slot>
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
        color: 'black',
        weight: 1,
        fillColor: 'blue',
        fillOpacity: 0.5,
      }
    })
  }
}

export default {
  name: "GControlMultiLocalGeojson",
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
      buttonActive: false,
      geojsons: [
        {
          name: '外部圖像',
          geojsons: [
            {
              name: '法國區域',
              url: 'https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson'
            }
          ]
        },
        {
          name: '本地圖像',
          geojsons: []
        }
      ],
      geojsonShow: false,
      addGeoJsons: [],
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
    removeGeojson(){
      let allEvents = document.querySelectorAll('.geocloud-localGeojson-describe');
      // 先移除所有的active，再移除所有圖層
      allEvents.forEach(
          (event)=>{
            event.classList.remove('active');
          }
      )
      this.geojsonShow = false;
      this.addGeoJsons = [];
    },
    changeGeojson(event, groupindex, fileindex) {
      this.geojsonShow = true;

      if(event.currentTarget.classList.contains('active')){
        event.currentTarget.classList.remove('active');
        this.addGeoJsons.forEach(
            (geojson, findindex)=>{
              if (geojson.groupindex === groupindex && geojson.fileindex === fileindex){
                this.addGeoJsons.splice(findindex, 1);
              }
            }
        )
      }else {
        event.currentTarget.classList.toggle('active');
        console.log("Start Change");
        let filepath = this.geojsons[groupindex].geojsons[fileindex].url;
        axios.get(filepath, {responseType: 'json', 'Content-Type': 'application/json'}).then(
            (res)=> {
              let geojsonObject = {
                groupindex: groupindex,
                fileindex: fileindex,
                data: res.data
              };
              this.addGeoJsons.push(geojsonObject);
            }
        )
      }
    },
    handleGeojson(element){
      let file = element.target.files[0];
      let url = window.URL.createObjectURL(file);
      let fileObject = {
        name: file.name,
        url: url
      };
      console.log(fileObject)
      this.geojsons[1].geojsons.push(fileObject);
    }
  },
  mounted() {
    this.ready = true
    let getfiles = require.context('@/assets/geojson/', true, /\.geojson$/).keys();
    getfiles.forEach(
        (file)=> {
          let localFile = {};
          let fileName = file.replace('./', '');
          localFile.name = fileName;
          localFile.url = `./geojson/${fileName}`;
          this.geojsons[1].geojsons.push(localFile);
        }
    )
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
  transition: all .5s ease;
}

.menu-slide-enter {
  transform: translateX(50px);
  opacity: 0;
}

.menu-slide-leave-to {
  transform: translateX(50px);
  opacity: 0;
}


.collapse-show{
  top: 0px;
  width: 240px;
  border-radius: .25rem;
  background-color: white;
  box-shadow: 0 3px 1px lightgray, 0 3px 1px gray;
  padding: .2rem;
  z-index: 99;
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

table{
  border: 1px solid #0c0c0c;
  border-collapse: collapse;
  text-align: center;
}

tr{
  padding: rem;
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

.geocloud-localGeojson-removeDescribes {
  color: white;
  background-color: red;
  border-radius: 6px;
  padding: .2rem;
  border: none;
  cursor: pointer;
}

#geoJson-upload {
  display: none;
}

.custom-geoJson-upload {
  background-color: #FAFAFA;
  color: #4CAF50;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin-right: 5px;
}


</style>
