import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HttpServiceService} from "../services/http-service.service";
import {Observable} from "rxjs";
import {isBoolean} from "class-validator";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private location: Location, private router: Router, private httpService: HttpServiceService,  private toastr: ToastrService) {

  }

  LoggedIn: boolean = false
  userid: number


  async ngOnInit() {
     await this.httpService.checklogin(localStorage.getItem("jwt")
     ).subscribe(
       ((res) => {
           // @ts-ignore
         if(res.user){
             this.LoggedIn = true
             // @ts-ignore
           this.userid = res.user
          console.log(this.userid)
          }else{
          this.LoggedIn= false
         }
         }
       ))

  }

  logout() {
    localStorage.removeItem("jwt")
    this.LoggedIn = false
    this.router.navigate(["/login"])
  }

}
