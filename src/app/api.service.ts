import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams, HttpErrorResponse } from "@angular/common/http";
import { AlertController } from '@ionic/angular';
import { catchError } from "rxjs/operators";
import { EMPTY } from 'rxjs';
import { environment } from "../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //TODO: read from env
  host: string = environment.host;
  loading: any;

  constructor(private http: HttpClient,
    private alertController: AlertController) { }

  handleError(error: HttpErrorResponse){
    this.presentAlert('Error Fetching Data')
    return EMPTY;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getPosts(){
    return this.http.get(`${this.host}/posts`)
    .pipe(catchError(this.handleError.bind(this)))
  }

  getPost(id: string){
    return this.http.get(`${this.host}/posts/${id}`)
    .pipe(catchError(this.handleError.bind(this)))

  }

  getComments(postId: string){
    const options = postId ?
    { params: new HttpParams().set('postId', postId) } : {};

    return this.http.get(`${this.host}/comments`,options)
    .pipe(catchError(this.handleError.bind(this)))

  }
}
