import {Component, Input} from '@angular/core';
import { HttpServiceService } from "../services/http-service.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent {
  @Input() articleID: number;

  article:any;

  constructor(public httpServiceService: HttpServiceService) {
  }

  ngOnInit(): void {
    this.httpServiceService.getArticle(this.articleID).subscribe(
      (response) => {console.log(response);
        this.article = response;
      },
      (error) => { console.log(error); })
  }

}
