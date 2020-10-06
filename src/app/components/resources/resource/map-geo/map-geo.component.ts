import {Component, OnInit} from "@angular/core";
import {AppleMapsService} from "ngx-apple-maps";
import {MapConstructorOptions, MapKitInitOptions} from "ngx-apple-maps/lib/declarations";

@Component({
  selector: 'app-map-geo',
  templateUrl: './map-geo.component.html'
})


export class MapGeoComponent implements OnInit {

  latitude: 1;
  longitude: 1;

  constructor(private appleMapsService: AppleMapsService) {
  }

  options: MapKitInitOptions = {
    JWT: "/MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgpKVoGYwpAjz48yek1R60dgCjJJBqaTng7wFjnRbwQnygCgYIKoZIzj0DAQehRANCAAS9CSHA9CNURciA9NAt8v60rGWza7N3CdBljaExVbyyaKXTC1kVth/ykUt++vf9bt/XyiNJEBWZrvZ7ufP0l9in",
    language: 'en',
    callback: (data) => {
      console.log('data ', data);
      // console.log('data ', data);
    }
  }
  customAnnotation = {
    latitude: 37.8083396,
    longitude: -122.415727,
    options: {
      title: 'Custom marker callout',
      subtitle: 'subtitle 2',
      color: '#000',
      selected: false,
      glyphText: ''
    }
  };
  annotations = [
    {
      latitude: 37.8023553,
      longitude: -122.405742,
      options: {
        title: 'test 2',
        subtitle: 'subtitle 3',
        color: '#000',
        selected: false,
        glyphText: ''
      }
    },
    {
      latitude: 37.779267,
      longitude: -122.419269,
      options: {
        title: 'test 2',
        subtitle: 'subtitle 3',
        color: '#FF0000',
        selected: false,
        glyphText: '',
        calloutEnabled: true
      }
    }
  ];
  settings: MapConstructorOptions = {
    isZoomEnabled: true,
    showsZoomControl: true,
    showsUserLocationControl: true,
    showsMapTypeControl: true,
    showsUserLocation: false,
    tracksUserLocation: false,
    center: {
      latitude: 37.779267,
      longitude: -122.419269,
    }
  };
  ngOnInit(): void {

  }

}
