import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { Api } from "./Api.service";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProductService
{
    constructor(
        private api: Api
    ){}

        // methode de service pour recup
        // tous les users
        async getProductAll(): Promise <ProductModel[]>{
            let res = await lastValueFrom(this.api.productRetrieveAll())
            return this.formatData(res)
        }

        async getProductOne(id: string){
            let res = await lastValueFrom(this.api.productRetrieveOne(id))
            return this.formatData([res])
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
