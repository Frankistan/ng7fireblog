import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of as observableOf, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LocationService {

    position: any;

    constructor(
        private _http: HttpClient,
    ) { }

    getLocation(): any {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    return this.position;
                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                    return this.position = null;
                }
            );
        };
    }

    getAddress(position): Observable<string> {

        if (!position) {
            return observableOf('');
        }

        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&sensor=false`;

        return this._http
            .get(url).pipe(
                map(res => {
                    if (!res) return '';
                    let data: any = res;
                    let ad = data.results[1];
                    if (data.results[1]) return ad.formatted_address;
                }));
    }

    getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position.coords);
            }, (err) => {
                reject(err);
            });
        });
    }

    async getCurrentLocation(): Promise<any> {
        let position: any = await this.getPosition();
        this.position = {
            lat: position.latitude,
            lng: position.longitude
        };

        return this.position;
    }
}

