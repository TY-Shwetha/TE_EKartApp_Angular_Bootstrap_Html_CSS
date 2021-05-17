import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../productInterface.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isLoading: boolean;
  error: string;
  message: string;
  constructor(private ps: ProductService) { }

  ngOnInit(): void {
  }

  onFormSubmit(addToProductList) {
    this.isLoading = true;
    this.ps.postProducts(addToProductList.value).subscribe(res => {
      if (!res.error) {
        console.log(addToProductList.value);
        this.isLoading = false;
        this.message = 'Product added successfully';
      } else {
        this.error = 'Something went wrong!! Try adding again.';
      }
    }, err => {
      this.error = 'Server Error';
      this.isLoading=false;
    })
  }
}
