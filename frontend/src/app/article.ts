// Class nur zu Testzwecken angelegt
// GGfd. als Basis für Artikel verwenden
export class Article {
  title: string;
  creationDate: string;
  price: number;
  sold: boolean;
  category: string;
  description: string;
  articleImageSource: string;


  constructor(title: string, creationDate: string, price: number, sold: boolean, category: string, description: string, articleImageSource: string) {
    this.title = title;
    this.creationDate = creationDate;
    this.price = price;
    this.sold = sold;
    this.category = category;
    this.description = description;
    this.articleImageSource = articleImageSource;
  }
}
