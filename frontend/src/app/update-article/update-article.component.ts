import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpServiceService} from "../services/http-service.service";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent {

  @ViewChild('template') templateRef: TemplateRef<any>;


  public articleForm!: FormGroup;


  @Input() public product;
  title: any;
  description: any;
  price: any;
  negotiable: any;
  category: any;
  finish:Boolean = false;


  constructor(public activeModal: NgbActiveModal, private location: Location, private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService, public modalService: NgbModal,
              private httpService: HttpServiceService) {}

  ngOnInit(): void {

    console.log(this.product);
    this.httpService.getArticle(this.product).subscribe(
      (response) => {
        //this.router.navigate(["/profil/"+this.userid])
        console.log(response)
        this.title = response[0].name;
        this.description = response[0].description;
        this.price = response[0].price;
        this.negotiable =  response[0].negotiable;
        this.category = response[0].category;
      })



    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      negotiable: ['', Validators.required],
      category: ['', Validators.required],
    })
  }

  async updateArticle() {
    console.log(this.articleForm.value)

    this.httpService.updateArticle(this.product, this.articleForm).subscribe(
      (response) => {console.log(response); this.toastr.success("Die Änderungen wurden übernommen"); this.activeModal.close(true)},
      (error) => { console.log(error); })
  }


    //this.activeModal.close(this.articleForm);


}

