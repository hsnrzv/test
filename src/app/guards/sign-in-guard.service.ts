import { Injectable } from '@angular/core';
import { UserService } from '@app/core/store/user/user.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInGuard {
  constructor(private userService: UserService) {}

  async canActivate() {
    const signedInUser = await firstValueFrom(
      this.userService.getSignedInUser(),
    );
    return !!signedInUser?.id || (await this.userService.handleUserSignIn());
  }
}
