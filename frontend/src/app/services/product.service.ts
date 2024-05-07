import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { Api } from "./Api.service";
import { lastValueFrom } from "rxjs";
import { Observable } from "rxjs"; // Importation d'Observable
import { map } from 'rxjs/operators'; // Importation de map depuis RxJS/operators

@Injectable({
    providedIn: 'root',
})
export class ProductService
{
    constructor(
        private api: Api
    ){}

        async getProductAll(): Promise <ProductModel[]>{
            let res = await lastValueFrom(this.api.productRetrieveAll())
            return this.formatData(res)
        }

        async getProductOne(id: string){
            let res = await lastValueFrom(this.api.productRetrieveOne(id))
            return this.formatData([res])
        }

        productCreatedOne(productData: any): Observable<ProductModel> {
            return this.api.productCreatedOne(productData).pipe(
                map((res: any) => new ProductModel(res.id, res.brand, res.title, res.description, res.price))
            );
        }

    formatData(rawdata: any[]): ProductModel[] {
        let productArray: ProductModel[] = []
            rawdata.forEach((el) => {
                let product = new ProductModel(el.id, el.brand, el.title, el.description, el.price )
                productArray.push(product);
            })
        return productArray;
    }
} 
