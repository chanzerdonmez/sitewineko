import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
// import { ApiService } from "./ApiService.service";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService
{
    constructor(
        // private apiService: ApiService
    ){}

        // methode de service pour recup
        // tous les users
    //     async getUserAll(){
    //         let res = await lastValueFrom(this.apiService.retrieveAllUsers())
    //         return this.formatData(res)
    //     }

    //     async getUserOne(id: string){
    //         let res = await lastValueFrom(this.apiService.retrieveOneUser(id))
    //         return this.formatData([res])
    //     }

    // formatData(rawdata: any[]) {
    //         const temp: UserModel[] = []
    //         rawdata.map((el) => {
    //             let tempObj: UserModel = new UserModel(el.id, el.name, el.username, el.email)
    //             temp.push(tempObj);
    //         })
    //  console.log('Data Formatté: ', temp)
    //  return temp
    // }
}
