import { Component } from '@angular/core';
import { UserService } from '@app/core/store/user/user.service';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from '@app/sign-up/sign-up.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonButtons,
    IonContent,
    IonItem,
    IonInput,
    FormsModule,
    IonInputPasswordToggle,
    IonGrid,
    IonRow,
    IonCol,
    NgIf,
    IonText,
  ],
})
export class SignInComponent {
  username?: string;
  password?: string;
  errorMessage?: string;
  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Username and Password required!';
      return;
    }

    if (!(await this.userService.doSignIn(this.username, this.password))) {
      this.errorMessage = 'Invalid Username or Password!';
      return;
    }

    return this.modalCtrl.dismiss(this.username, 'confirm');
  }

  public async handleSignUp() {
    await this.modalCtrl.dismiss(undefined, 'cancel');
    this.errorMessage = '';
    const modal = await this.modalCtrl.create({
      component: SignUpComponent,
    });

    await modal.present();
  }
}
