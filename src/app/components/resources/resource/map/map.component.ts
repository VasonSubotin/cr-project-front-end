import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {MapConstructorOptions, MapKitInitOptions} from "ngx-apple-maps/lib/declarations";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})


export class MapComponent implements OnInit, OnChanges {
  @Input() mapData: any;
  @Input() type: string;
  @Input() public locationData: any;
  latitude: 1;
  longitude: 1;
  customAnnotation = [];
  map;
  zoom = 15;


  settings: MapConstructorOptions = {
    region: {
      center: {
        latitude: 0,
        longitude: 0
      },
      span: {
        from: 0,
        to: 1,
      },
    },
    isZoomEnabled: true,
    showsZoomControl: true,
    showsUserLocationControl: true,
    showsMapTypeControl: true,
    showsUserLocation: false,
    tracksUserLocation: false,
    mapType: 'standard',
    colorScheme: 'dark',
    center: {
      latitude: 0,
      longitude: 0,
    }
  };

  // @ts-ignore
  options = {
 
  };

  ngOnChanges(changes: SimpleChanges): void {

   if (changes.mapData && changes.mapData.currentValue !== changes.mapData.previousValue) {
    this.customAnnotation = [];
    this.initLocations(this.locationData);
    this.initMapData(changes.mapData.currentValue); 
  }

  if(changes.locationData && changes.locationData.currentValue !== changes.locationData.previousValue) {
    this.initLocations(changes.locationData.currentValue)
  }

  }


  ngOnInit(): void {
   
    if (this.mapData) {
      this.initMapData(this.mapData);
    }
  
    if(this.locationData) {
      this.initLocations(this.locationData)
    }
    
    
  }

  initLocations(locationData) {
    if(locationData && locationData.latitude && locationData.longitude) {
      this.customAnnotation.push({
        latitude: locationData.latitude % 10000,
        longitude: locationData.longitude % 10000,
        options: {
          glyphTitle: 'My car',
          text: ` `,
          color: "white",
          icon : { url: '../../../../assets/imgs/my_car.png', scaledSize: {height: 40, width: 40}}
        }
      });
    }
  
  }

  initMapData(mapData) {
  
    if(mapData && mapData[0]) {
      this.settings.region.center = {
        latitude: mapData[0].latitude,
        longitude: mapData[0].longitude
      };
      const mapDataOptions = this.mapDataPrepareData(this.mapData, this.type === "driving" ? '#02A0FC':"#D3D4D4");
      mapDataOptions[0].options.color = '#02A0FC';
      console.log("mapData initLocations", mapDataOptions);
      this.customAnnotation.push(...mapDataOptions);
  
      this.settings.center = {
        latitude: mapData[0].latitude,
        longitude: mapData[0].longitude
      };
    }
   
  }



  mapDataPrepareData(mapData, color: string) {
    console.log("mapDataPrepareData", mapData);
    return mapData.map((item, index) => {
      return {
        ...item,
        options: {
          glyphTitle: item.name,
          animates: true,
          //selected: index === 0,
          text: index === 0 ? " ": `${index + 1}`,
          color,
          icon : { url: index === 0 ? '../../../../assets/imgs/charging_station.png' : '../../../../assets/imgs/address_of_visiting.png', scaledSize: {height: 40, width: 40}}
        }
      }
    })
  }

}
