import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@app/core/store/user/user.service';
import {
  IonAvatar,
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
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { User } from '@app/domain/api-response/user-response.model';
import { generateUuid } from '@app/core/helper/util';
import { NgIf } from '@angular/common';
import { CapacitorPlatformService } from '@app/core/service/platform/capacitor-platform.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonInputPasswordToggle,
    IonGrid,
    IonCol,
    IonRow,
    NgIf,
    IonAvatar,
  ],
})
export class SignUpComponent implements OnInit {
  @Input() user: User | undefined;

  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  profileImage?: string =
    'https://ionicframework.com/docs/img/demos/avatar.svg';
  errorMessage?: string;
  mobile?: string;
  address?: string;
  bio?: string;
  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private capacitorService: CapacitorPlatformService,
  ) {}

  ngOnInit(): void {
    if (!!this.user) {
      this.prefillUserInfo();
    }
  }

  private prefillUserInfo() {
    this.username = this.user?.username;
    this.password = this.user?.password;
    this.firstname = this.user?.firstName;
    this.lastname = this.user?.lastName;
    this.email = this.user?.email;
    this.profileImage =
      this.user?.profileImage ||
      'https://ionicframework.com/docs/img/demos/avatar.svg';
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (
      !this.username ||
      !this.password ||
      !this.firstname ||
      !this.lastname ||
      !this.email
    ) {
      this.errorMessage = 'Username and Password required!';
      return;
    }

    const signedUpUser: User = {
      id: generateUuid(),
      firstName: this.firstname,
      lastName: this.lastname,
      username: this.username,
      password: this.password,
      email: this.email,
      profileImage: this.profileImage,
      mobile: this.mobile,
      address: this.address,
      bio: this.bio,
    };
    if (!this.user) {
      this.userService.doSignUp(signedUpUser);
    } else {
      this.userService.updateProfile(signedUpUser);
    }
    if (!this.user) {
      await this.userService.doSignIn(
        signedUpUser.username,
        signedUpUser.password,
      );
    }
    return this.modalCtrl.dismiss(signedUpUser.username, 'confirm');
  }

  public async uploadPhoto(): Promise<void> {
    const image = await this.capacitorService.getPhoto();
    if (!!image) {
      this.profileImage =
        await this.capacitorService.convertPhotoToBase64(image);
    }
  }
}
