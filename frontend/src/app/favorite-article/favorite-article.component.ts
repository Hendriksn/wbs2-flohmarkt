import {Component} from '@angular/core';
import {HttpServiceService} from "../services/http-service.service";

@Component({
  selector: 'app-favorite-article',
  templateUrl: './favorite-article.component.html',
  styleUrls: ['./favorite-article.component.scss']
})
export class FavoriteArticleComponent {

  // this needs to be set to Id of currently logged-in user via session-management
  userId: any;

  // representing all favorite article of given user
  favoritesOfUser: any;
  articleObjects: any;

  constructor(private httpService: HttpServiceService) {
  }

  ngOnInit() {

    // Authorization and grabbing the id of logged-in user
    this.httpService.checklogin(localStorage.getItem("jwt")).subscribe(
      res => {
        // @ts-ignore
        this.userId = res.user;

        try {
          // get all favorites of logged-in user
          this.httpService.getAllFavoritesOfUser(this.userId).subscribe(
            (response) => {
              // format the response to make it accessible
              const stringFavoritesOfUser = JSON.stringify(response);
              this.favoritesOfUser = JSON.parse(stringFavoritesOfUser);

              // extract the articleIds out of object structure to make them iterable
              const articleIds = this.favoritesOfUser.map(article => article.articleId);
              console.log(articleIds);

              const articlePromises = articleIds.map(id => fetch(`http://localhost:3000/articles/${id}`)
                .then(response => response.json()));

              Promise.all(articlePromises)
                .then(responses => {
                  const stringOfArticleObjects = JSON.stringify(responses);
                  this.articleObjects = JSON.parse(stringOfArticleObjects);
                  console.log(this.articleObjects);
                })
                .catch(error => {
                  console.error(error);
                })
            })

        } catch (error) {
          console.error('Error getting all the user specific favorite: ', error);
        }
      }
    )

  }

}
