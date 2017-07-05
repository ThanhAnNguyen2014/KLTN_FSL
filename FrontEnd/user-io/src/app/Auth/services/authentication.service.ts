import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public jwt;
    public token: string;
    public jwtHelper: JwtHelper = new JwtHelper();
    public url = 'http://hcmutefslio.herokuapp.com/';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        //console.log('con han',this.jwtHelper.isTokenExpired('JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NDVhYWU5NzNmZDdiMmY5NGQ2OWI5MyIsImlhdCI6MTQ5Nzk1Njk2NCwiZXhwIjoxNDk4MDQzMzY0fQ.fnw8tuNQNWE1WpSRZhTDt5D8_MtB-saSqoylsgpm69Q'));
        // het han
        //console.log('Het han', this.validate('JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NDVhYWU5NzNmZDdiMmY5NGQ2OWI5MyIsImlhdCI6MTQ5NzczNzk2MiwiZXhwIjoxNDk3ODI0MzYyfQ.cDFywg6aX9kdlGPZOy6zc2V87iyW8mTbCw_9HxmqLKE'));
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + 'api/v1/user/login', JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                if (response.json().results.message != null) {
                    return response.json().results.message;
                }

                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().results.doc.token;
                //let token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NDVhYWU5NzNmZDdiMmY5NGQ2OWI5MyIsImlhdCI6MTQ5NzczNzk2MiwiZXhwIjoxNDk3ODI0MzYyfQ.cDFywg6aX9kdlGPZOy6zc2V87iyW8mTbCw_9HxmqLKE';
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    //JSON.stringify({ username: username, token: token })
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }

            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        console.log('Logout!');
    }

    loggedIn() {
        
        let istoken = JSON.parse(localStorage.getItem('currentUser'));
        if (istoken) {
            if (this.jwtHelper.isTokenExpired(istoken.token)) {
                console.log('Exprired token', this.jwtHelper.getTokenExpirationDate(istoken.token), this.jwtHelper.isTokenExpired(istoken.token));
                localStorage.removeItem('currentUser');
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    getName() {
        this.jwt =JSON.parse(localStorage.getItem('currentUser'));
        if (this.jwt) {
            var decodeJwt = this.jwtHelper.decodeToken(this.jwt.token);          
            return decodeJwt.firstname;
        }
    }
    // getInfo(){
    //     this.jwt=JSON.parse(localStorage.getItem('currentUser'));
    //     if(this.jwt){
    //         var decodeJwt= this.jwtHelper.decodeToken(this.jwt.token);

    //     }
    // }
}