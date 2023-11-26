import { Component } from '@angular/core';
import { Article } from "../article";
import { HttpServiceService } from "../services/http-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-products-of-user',
  templateUrl: './all-products-of-user.component.html',
  styleUrls: ['./all-products-of-user.component.scss'],
  providers: [HttpServiceService]
})
export class AllProductsOfUserComponent {

  products:any
  id:any=1
  private LoggedIn: boolean;
  private userid: number;

  constructor( private httpServiceService: HttpServiceService) {}

  async ngOnInit() {

    await this.httpServiceService.checklogin(localStorage.getItem("jwt")
    ).subscribe(
      ((res) => {
          // @ts-ignore
          if (res.user) {
            this.LoggedIn = true
            // @ts-ignore
            this.userid = res.user
            console.log(this.userid)

            this.httpServiceService.getAllArticlesOfUser(this.userid).subscribe(
              (response) => {
                console.log(response);
                this.products = response;
              },
              (error) => {
                console.log(error);
              })

          }
        }
      ), msg => {
      })



  }


  clickedNewProduct() {
    //this.router.navigate(["/addproduct/"])
    //this.location.go('/profile/');
  }
}
