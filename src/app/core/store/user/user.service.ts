import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { signIn, signOut, signUp, updateProfile } from './user.actions';
import { firstValueFrom, Observable } from 'rxjs';
import {
  getRegisteredUsers,
  getSignedInUser,
} from '@app/core/store/user/user.selectors';
import { SignUpRequest } from '@app/domain/api-request/user-requests.model';
import { Router } from '@angular/router';
import { UserState } from '@app/core/store/user/user.reducer';
import { User } from '@app/domain/api-response/user-response.model';
import { generateUuid } from '@app/core/helper/util';
import { map } from 'rxjs/operators';
import { SignInComponent } from '@app/sign-in/sign-in.component';
import { ModalController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private store$: Store<UserState>,
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

  private getRegisteredUsers(): Observable<User[] | undefined> {
    return this.store$.select(getRegisteredUsers);
  }

  public getSignedInUser(): Observable<User | undefined> {
    return this.store$.select(getSignedInUser);
  }

  public getUserByUsernameAndPassword(
    username: string,
    password: string,
  ): Observable<User | undefined> {
    return this.getRegisteredUsers().pipe(
      map((users) =>
        users?.find(
          (user) => user.username === username && user.password === password,
        ),
      ),
    );
  }

  public async handleUserSignIn(): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: SignInComponent,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'cancel') {
      return false;
    }

    return role === 'confirm' && !!data;
  }

  public async doSignIn(username: string, password: string) {
    const signedInUser = await firstValueFrom(
      this.getUserByUsernameAndPassword(username, password),
    );
    if (!signedInUser) {
      return false;
    }

    this.store$.dispatch(signIn({ user: signedInUser }));
    return true;
  }

  public doSignUp(signUpRequest: SignUpRequest) {
    const user: User = {
      id: generateUuid(),
      username: signUpRequest.username,
      firstName: signUpRequest.firstName,
      lastName: signUpRequest.lastName,
      password: signUpRequest.password,
      email: signUpRequest.email,
      profileImage: signUpRequest.profileImage,
      mobile: signUpRequest.mobile,
      address: signUpRequest.address,
      bio: signUpRequest.bio,
    };
    this.store$.dispatch(signUp({ user }));
  }

  public updateProfile(signUpRequest: SignUpRequest) {
    const user: User = {
      id: generateUuid(),
      username: signUpRequest.username,
      firstName: signUpRequest.firstName,
      lastName: signUpRequest.lastName,
      password: signUpRequest.password,
      email: signUpRequest.email,
      profileImage: signUpRequest.profileImage,
      mobile: signUpRequest.mobile,
      address: signUpRequest.address,
      bio: signUpRequest.bio,
    };
    this.store$.dispatch(updateProfile({ user }));
  }

  public signOut() {
    this.store$.dispatch(signOut());
    this.router.navigateByUrl('');
  }
}
