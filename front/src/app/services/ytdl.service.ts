import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

const API_URL= "http://server:3000"

export class YtdlService{
    constructor(private http: HttpClient){}

    getInfos(url: string): Observable<any>{
        return this.http.post(`${API_URL}/api/video/infos`,{
            url
        })
    }
    
}