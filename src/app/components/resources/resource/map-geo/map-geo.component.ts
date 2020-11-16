import {Component, Input, OnInit} from "@angular/core";
import {MapConstructorOptions, MapKitInitOptions} from "ngx-apple-maps/lib/declarations";

@Component({
  selector: 'app-map-geo',
  templateUrl: './map-geo.component.html'
})


export class MapGeoComponent implements OnInit {
  @Input() mapData: any;
  latitude: 1;
  longitude: 1;
  customAnnotation = [];

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
      latitude: 37.779267,
      longitude: -122.419269,
    }
  };
  // @ts-ignore
  options: MapKitInitOptions = {
    // tslint:disable-next-line:max-line-length
    JWT: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkY1NkJaNVdWU0cifQ.eyJpc3MiOiI4V1o5QkgzQVIzIiwiaWF0IjoxNjAyMTY4OTIwLCJleHAiOjE2MzY5ODgxMjB9.0TvY-zhIH_GJSwg7pjMlZlo8I1D9zai9gD9Qx-SweUJ68jmyuy2AXjP-mrF-Q4Is03IyqAdPTcjmo9Wf_dPK2w',
    callback: (data) => {
      console.log('data ', data);
      // console.log('data ', data);
    }
  };

  constructor() {
    console.log('s')
    console.log(this.settings)
    console.log(this.mapData)
  };



  ngOnInit(): void {
    console.log(this.settings)
    this.settings.region.center = {
      latitude: this.mapData[0].latitude,
      longitude: this.mapData[0].longitude
    };
    const mapDataOptions = this.mapDataPrepareData(this.mapData);
    mapDataOptions[0].options.color = '#02A0FC';
    this.customAnnotation.push(...mapDataOptions);
    const locationData = JSON.parse(localStorage.getItem('smartCarInfo')).location.data;
    this.customAnnotation.push({
      latitude: locationData.latitude % 10000,
      longitude: locationData.longitude % 10000,
      options: {
        title: 'My car',
        glyphText: `My car`,
        color: "#4339F2",
      }
    });
    this.settings.center = {
      latitude: this.mapData[0].latitude,
      longitude: this.mapData[0].longitude
    };
    console.log(this.customAnnotation)
  }

  mapDataPrepareData(mapData) {
    return mapData.map((item, index) => {
      return {
        ...item,
        options: {
          title: item.name,
          animates: true,
          selected: index === 0,
         // glyphText: `${index + 1}`,
          color: '#D3D4D4'
        }
      }
    })
  }

}
