import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// const API_URL= "http://server:3000"
const API_URL= "http://localhost:3000"

@Injectable({
    providedIn: 'root'
})
export class YtdlService{
    constructor(private http: HttpClient){}

    getInfos(url: string): Observable<any>{
        return this.http.post(`${API_URL}/api/video/infos`,{
            url
        })
    }
}