import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpServiceService} from "../services/http-service.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Flohmarkt';
  articles:any
  searchQuery: any;
  users: any;

  constructor(private route: ActivatedRoute, private httpService: HttpServiceService, private modalService: NgbModal) {}

  ngOnInit() {
    this.httpService.getUsers().subscribe(
      (response) => {
        this.users = response;
      })

    this.httpService.getAllArticles().subscribe(
      (response) => {
        this.articles = response;
      });
  }

  searchArticles() {
    console.log(this.searchQuery)
    if (this.searchQuery == '') {
      this.httpService.getAllArticles().subscribe(
        (response) => {
          this.articles = response;
        });
    } else {
      this.httpService.searchArticle(this.searchQuery).subscribe(
        (response) => {
          this.articles = response;
        });
    }
  }
}
