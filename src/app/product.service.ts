import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './productInterface.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
    return this.http.get<{error:boolean,message:string,products:Product[]}>
    (`${environment.baseUrl}/api/products`);
  }

  postProducts(form){
    return this.http.post<{error:boolean,message:string,products:Product}>
    ('https://ty-shop.herokuapp.com/api/products',form);
  }

  deleteProducts(id){
    const dburl='https://ty-shop.herokuapp.com/api/products/'+id;
    return this.http.delete<{error:boolean,message:string,products:Product}>
    (dburl);
  }

  updateProduct(product){
    return this.http.put<{error:boolean,message:string,products:Product}>
    (`${environment.baseUrl}/api/products/${product._id}`,product);
  }
}
