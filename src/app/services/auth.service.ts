import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private api = "http://localhost:5105/api/auth"; // Update with your API URL
    constructor(private http: HttpClient) {}

    login (data:any): Observable<any> {
        return this.http.post(`${this.api}/login`, data, { responseType: 'text' });
    }

    register (data:any): Observable<any> {
        return this.http.post(`${this.api}/register`, data,{ responseType: 'text' });
    }
}