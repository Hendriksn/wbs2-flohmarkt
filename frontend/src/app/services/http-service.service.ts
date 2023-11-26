/*****************************************************************************
 * Imports                                                            *
 *****************************************************************************/

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Observable, of, BehaviorSubject, from, lastValueFrom, pipe, catchError, throwError} from "rxjs";
import {Article} from "../article";
import {Router} from '@angular/router';

import {map, switchMap, take, tap} from 'rxjs/operators';

import {User} from "../models/user.model";



@Injectable({
  providedIn: 'root'
})

/*****************************************************************************
 * Routing                                                        *
 *****************************************************************************/
export class HttpServiceService {

  private user$ = new BehaviorSubject<User>(null);

  get userId(): Observable<number> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        return of(user.id);
      })
    );
  }

  get userFullName(): Observable<string> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        if (!user) {
          return of(null);
        }
        const fullName = user.firstName + ' ' + user.lastName;
        return of(fullName);
      })
    );
  }


  constructor(private http: HttpClient, private router: Router) {

  }

  server: any = "http://localhost:3000";

  /*****************************************************************************
   * Authorisation                                                     *
   *****************************************************************************/

  login(LoginForm: FormGroup) {
    console.log(LoginForm.value)
    return this.http.post<any>(this.server + "/auth/login",
      LoginForm.value
    )
  }

  register(SignUpForm: FormGroup) {
    console.log(SignUpForm.value)
    return this.http.post<any>(this.server + "/auth/register",
      SignUpForm.value)
  }

  checklogin(jwt: string) {
    console.log(jwt)
    return this.http.post(this.server + "/auth/checklogin", {"jwt": jwt})
  }

  /*****************************************************************************
   * allArticlesOfUser                                                        *
   *****************************************************************************/


  getMessages(): Observable<any[]> {
    const messages = [
      {
        id: 1,
        from: 'Jana Schmidt',
        subject: 'Interesse am Teddy',
        body: 'Hallo, ist der Teddy noch zu haben?',
        received: '2022-12-22T09:00:00.000Z',
        read: false,
        selected: false
      },
      {
        id: 2,
        from: 'Markus Siemensfrau',
        subject: 'Ich habe Interessa an der Porzellanpuppe',
        body: 'Wenn Sie mir noch 5€ entgegen kommen, dann würde ich die Puppe direkt kaufen.',
        received: '2022-12-21T12:00:00.000Z',
        read: false,
        selected: false
      },
      {
        id: 3,
        from: 'Hasan Akkus',
        subject: 'Porzellanpuppe',
        body: 'Ich suche eine schöne Puppe.',
        received: '2022-12-20T15:00:00.000Z',
        read: false,
        selected: false
      },
    ];
    return of(messages);
  }


  /*********************************************************************************************************************
   *
   * USERS
   *
   ********************************************************************************************************************/

  getUser(id: number) {
    return this.http.get(this.server + "/users/" + id);
  }

  getUsers() {
    return this.http.get(this.server + "/users/");
  }

  updateUser(id: number, SignUpForm: FormGroup) {
    return this.http.put(this.server + "/users/" + id, SignUpForm.value);
  }

  deleteUser(id: number){
    return this.http.delete(this.server + "/users/" + id)
  }

  /*********************************************************************************************************************
   *
   *  Chat
   *
   ********************************************************************************************************************/

  getChatRooms(id: any) {
    return this.http.get(this.server + "/chat/" + id);
  }

  createChatRoom(userid: number, article: number, sellerId: any) {
    //ArticleForm.addControl('picture', "picture");
    return this.http.post<any>(this.server + "/chat", {"buyer": userid, "seller" : sellerId, "article": article})
  }


  getChatMessages(id: any) {
    return this.http.get(this.server + "/message/" + id);
  }

  sendChatMessage(messageForm: FormGroup) {
    console.log(messageForm.value)
    //ArticleForm.addControl('picture', "picture");
    return this.http.post<any>(this.server + "/message", messageForm.value)
  }



  /*********************************************************************************************************************
   *
   *  ARTICLE
   *
   ********************************************************************************************************************/


  getArticle(id: any) {
    return this.http.get(this.server + "/articles/" + id);
  }

  searchArticle(query: string) {
    return this.http.get(this.server + "/articles/search/" + query);
  }

  getAllArticles() {
    return this.http.get(this.server + "/articles");
  }

  getAllArticlesOfUser(id: any) {
    return this.http.get(this.server + "/articles/user/" + id);
  }

  postArticle(ArticleForm: FormGroup) {
    console.log(ArticleForm.value)
    //ArticleForm.addControl('picture', "picture");
    return this.http.post<any>(this.server + "/articles", ArticleForm.value)
  }

  getAllFavorites() {
    return this.http.get(this.server + "/favorites");
  }

  deleteArticle(id: number) {
    return this.http.delete(this.server + "/articles/" + id);
  }

  updateArticle(product: number, articleForm: FormGroup) {
    return this.http.put(this.server + "/articles/" + product, articleForm.value);
  }

  /*********************************************************************************************************************
   *
   *  FAVORITES
   *
   ********************************************************************************************************************/
  // adds a new favorite relationship between articleId and userId
  async addArticleToFavorites(articleId: number, userId: number): Promise<void> {
    console.log("articleId: " + articleId + " userID: " + userId);
    await lastValueFrom(this.http.post(this.server + "/favorites/", {
      articleId, userId
    }).pipe(
      catchError((err) => {
        console.error('Error adding article to favorites: ', err);
        return throwError(err);
      })
    ));
  }


  getAllFavoritesOfUser(userId: any) {
    return this.http.get(this.server + "/favorites/" + userId);
  }


  // will get all favorites of specific user
  /*
  async getAllFavoritesOfUser(userId: number): Promise<any> {
    try {
      const result = await lastValueFrom(this.http.get(this.server + "/favorites/" + userId));
      return result;
    } catch (error) {
      console.error('Error getting all the user specific favorite: ', error);
      throw error;
    }
  }

   */


  /*********************************************************************************************************************
   *
   *  PicUpload
   *
   ********************************************************************************************************************/

  uploadProfilePicFile(pbToUpload: File) {
    const formData = new FormData();
    formData.append("file", pbToUpload)

    return this.http.post(this.server + "/upload/pb/", formData);
  }

  uploadArticleFile(pbToUpload: File) {
    const formData = new FormData();
    formData.append("file", pbToUpload)

    return this.http.post(this.server + "/upload/article/", formData);
  }
}
