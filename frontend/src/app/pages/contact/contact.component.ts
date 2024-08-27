import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactService } from '../../services/ContactService.service';
import { NotificationService } from '../../services/NotificationService.service';
import { NgForm, FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    NotificationComponent // Ajoutez le composant de notification ici
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    prenom: '',
    email: '',
    message: ''
  };

  constructor(
    private contactService: ContactService,
    private notificationService: NotificationService // Injectez le service de notification
  ) {}

  onSubmit() {
    this.contactService.sendMessage(this.contact).subscribe(
      response => {
        console.log('Message sent successfully', response);
        // Utilisez le service de notification pour afficher un message de succès
        this.notificationService.showNotification('Votre message a été envoyé avec succès !', 'success');
        this.contact = { name: '', prenom: '', email: '', message: '' };
      },
      error => {
        console.error('Error sending message', error);
        // Utilisez le service de notification pour afficher un message d'erreur
        this.notificationService.showNotification('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.', 'error');
      }
    );
  }
}
