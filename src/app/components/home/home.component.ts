import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor
  (
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService:ToastrService
  ) { }

  products: any[] = [];

  categories: any[] = [];

  searchTerm: string = '';


  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);

        this._ToastrService.success(response.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false,
  };


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: false,
  };




  ngOnInit(): void {

    // get all products

    this._EcomdataService.getALLProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });

    // get categories

    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    })

  }

}
