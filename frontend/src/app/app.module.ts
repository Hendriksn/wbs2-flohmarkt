import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {AddproductComponent} from './addproduct/addproduct.component';
import {ProductdetailComponent} from './productdetail/productdetail.component';
import {AllProductsOfUserComponent} from './all-products-of-user/all-products-of-user.component';
import {ArticleComponent} from "./article/article.component";
import {InboxViewComponent} from './inbox-view/inbox-view.component';
import {RegisterDataComponent} from './register-data/register-data.component';
import {LoginComponent} from './login/login.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastrModule} from 'ngx-toastr';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {ChatComponent} from "./chat/chat.component";
import {DateformaterPipe} from './helper/dateformater.pipe';
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from './navbar/navbar.component';
import {ProfileComponent} from "./profile/profile.component";
import {UpdateUserComponent} from './update-user/update-user.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { FavoriteArticleComponent } from './favorite-article/favorite-article.component';
import { FooterComponent } from './footer/footer.component';

import { ChatsComponent } from './chats/chats.component';

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "admindashboard", component: AdmindashboardComponent},
  {path: "addproduct", component: AddproductComponent},
  {path: "productdetail/:id", component: ProductdetailComponent},
  {path: "all-products", component: AllProductsOfUserComponent},
  {path: "inbox", component: InboxViewComponent},
  {path: "chatroom/:id", component: ChatComponent},
  {path: "home", component: HomeComponent},
  {path: 'profil/:id', component: ProfileComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'register-data', component: RegisterDataComponent},
  {path: 'favorite-articles', component: FavoriteArticleComponent},
  {path: 'chats', component: ChatsComponent},
];

const config: SocketIoConfig = {
  url: "http://localhost:3001", // socket server url;
  options: {
    transports: ['websocket']
  }
}


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    AdmindashboardComponent,
    AddproductComponent,
    ProductdetailComponent,
    ProfileComponent,
    AllProductsOfUserComponent,
    ArticleComponent,
    InboxViewComponent,
    RegisterDataComponent,
    LoginComponent,
    ChatComponent,
    DateformaterPipe,
    NavbarComponent,
    HomeComponent,
    UpdateUserComponent,
    UpdateArticleComponent,
    FavoriteArticleComponent,
    ChatsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(), // ToastrModule added
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModules {

}
