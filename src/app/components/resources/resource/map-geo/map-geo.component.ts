import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {MapConstructorOptions, MapKitInitOptions} from "ngx-apple-maps/lib/declarations";

@Component({
  selector: 'app-map-geo',
  templateUrl: './map-geo.component.html'
})


export class MapGeoComponent implements OnInit, OnChanges {
  @Input() mapData: any;
  @Input() type: string;
  @Input() public locationData: any;
  latitude: 1;
  longitude: 1;
  customAnnotation = [];
  map;

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
  options: MapKitInitOptions = {
    // tslint:disable-next-line:max-line-length
    JWT: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkY1NkJaNVdWU0cifQ.eyJpc3MiOiI4V1o5QkgzQVIzIiwiaWF0IjoxNjAyMTY4OTIwLCJleHAiOjE2MzY5ODgxMjB9.0TvY-zhIH_GJSwg7pjMlZlo8I1D9zai9gD9Qx-SweUJ68jmyuy2AXjP-mrF-Q4Is03IyqAdPTcjmo9Wf_dPK2w',
    callback: (data) => {
      console.log('data ', data);
    }
  };

  ngOnChanges(changes: SimpleChanges): void {

   if (changes.mapData && changes.mapData.currentValue !== changes.mapData.previousValue) {
    //this.customAnnotation = [];
    this.initMapData(changes.mapData.currentValue); 
  }

  if(changes.locationData && changes.locationData.currentValue !== changes.locationData.previousValue) {
    this.initLocations(changes.locationData.currentValue)
  }
  }

  onLoaded(e) {
    this.map = e;
    this.map.zoom = 50;
  
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
          title: 'My car',
          glyphText: `My car`,
          color: "#4339F2",
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
          
          title: item.name,
          animates: true,
          //selected: index === 0,
         // glyphText: `${index + 1}`,
          color
        }
      }
    })
  }

}
