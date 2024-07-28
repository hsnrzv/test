import { Component } from '@angular/core';
import { UserService } from '@app/core/store/user/user.service';
import { Observable } from 'rxjs';
import { User } from '@app/domain/api-response/user-response.model';
import { LetDirective } from '@ngrx/component';
import { SignUpComponent } from '@app/sign-up/sign-up.component';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    LetDirective,
    IonCard,
    IonHeader,
    IonToolbar,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  ],
  standalone: true,
})
export class ProfileComponent {
  public signedInUser$: Observable<User | undefined>;
  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
  ) {
    this.signedInUser$ = this.userService.getSignedInUser();
  }

  public handleLogOut() {
    this.userService.signOut();
  }

  public async editProfile(signedInUser: User | undefined): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SignUpComponent,
      componentProps: {
        user: signedInUser,
      },
    });

    await modal.present();
  }
}
