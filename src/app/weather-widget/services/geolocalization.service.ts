import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

@Injectable({
  providedIn: 'root',
})
export class GeolocalizationService {
  public getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          observer.next(resp);
        },
        (err) => {
          observer.error(err);
        },
        options
      );
    });
  }
}
