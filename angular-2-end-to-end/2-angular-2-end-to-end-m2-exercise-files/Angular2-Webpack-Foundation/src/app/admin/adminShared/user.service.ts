import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUserName: string;
    authUser: any;

    constructor( private router: Router) {
        firebase.initializeApp({
            apiKey: "AIzaSyDkLIs3d7zVy7X1y-6hd3Z_DR1u1k0lXe4",
            authDomain: "gigabytegames-2c12a.firebaseapp.com",
            databaseURL: "https://gigabytegames-2c12a.firebaseio.com",
            projectId: "gigabytegames-2c12a",
            storageBucket: "gigabytegames-2c12a.appspot.com",
            messagingSenderId: "860355816409"
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if(this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(`${error.message} Please try again!`);
            });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;
        if(this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUserName = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function (error) {
                alert(`${error.message} Unable to login. Please try again!`);
            });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function () {
            alert(`Logged Out!`);
        }, function (error) {
            alert(`${error.message} Unable to logout. Please try again!`);
        });
    }
}