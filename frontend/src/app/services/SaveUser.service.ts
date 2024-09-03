import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../models/user.model";
import { UserDto } from "../dto/UserDto";



@Injectable({
  providedIn: "root",
})
export class SaveUser {
  private currentUserSubject: BehaviorSubject<UserDto>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<UserDto>(
      JSON.parse(localStorage.getItem("currentUserDashboard") || "{}")
    );
  }

  /**
   * return current User
   * @return Users or null
   */
  public get currentUserValue(): UserDto | null {
    if (
      this.currentUserSubject.value == null ||
      this.currentUserSubject.value.token == undefined
    ) {
      return null;
    }
    return this.currentUserSubject.value;
  }

  /**
   * methode save user information
   * @param user
   */
  public saveUser(user: UserDto) {
    localStorage.setItem("currentUserDashboard", JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public clearUser() {
  }

}
