import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../productInterface.component';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {

  products: Product[];
  isLoading: boolean;
  message: string;
  error: string;
  selectedProductToEdit:Product;
  productUpdating=false;
  
  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.ps.getAllProducts().subscribe(res => { 
      if (!res.error) {
        console.log(res);
        this.isLoading = false;
       this.products = res.products;
        this.message = 'Product loaded succesfull';
      } else {
        this.error = "Failed to reach your request!! Load again."
      }
    }, err => {
      this.error = "Server Error";
      this.isLoading = false;
    })
  }

  deleteProduct(product:Product){
    this.isLoading=true;
    const confrimation= confirm('Are you sure want to delete this item???');
    if(confrimation){
     this.ps.deleteProducts(product._id).subscribe(res=>{
        if(!res.error){
          this.isLoading=false;
          this.products.slice(this.products.indexOf(product),1);
          this.message='Product deleted succesfully';
        }else{
          this.error='Product deletion failed';
        }
      },err=>{
        this.error="Serve Error";
        this.isLoading=false;
      })
    }
  }

  onEditProduct(product){
    this.selectedProductToEdit={...product};
    console.log((this.selectedProductToEdit));
    
  }

  onFormSubmit() {
    this.isLoading = true;
    this.productUpdating=true;
    this.ps.updateProduct(this.selectedProductToEdit).subscribe(res => {
      if (!res.error) {
       
        this.isLoading = false;
        this.productUpdating=false;
        this.message = 'Your changes has been saved successfully';
      } else {
        this.error = 'Something went wrong!! Try adding again.';
      }
    }, err => {
      this.error = 'Server Error';
      this.isLoading=false;
    })
  }
}
