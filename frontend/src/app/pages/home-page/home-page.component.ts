import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/UserService.service';
import { UserModel } from '../../models/user.model';
import { UserDisplayerComponent } from '../../components/user-displayer/user-displayer.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    UserDisplayerComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public compteur!: number
  public users: UserModel[] = []

  constructor(
    private readonly userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.compteur = 5
  }

  augmenteCompteur() {
    this.compteur++
  }

  ngOnInit(): void {
      // recupere l'eventuel parametre id dans l'url
      this.route.params.subscribe(params => {
        const id = params['id']

        if(!id) {
          this.vaChercherTousLesUsers()
        } else {
          this.VaChercherUnSeulUser(id)
      }

      })
  }

  async vaChercherTousLesUsers(): Promise<void>{
    this.users = await this.userService.getUserAll()
    console.log(this.users)
  }

  async VaChercherUnSeulUser(id: string) {
    this.users = await this.userService.getUserOne(id)
    console.log(this.users)
  }
}
