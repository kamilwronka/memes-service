import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import admin from 'firebase-admin';
import configuration from 'src/config/configuration';

const firebaseApp = admin.initializeApp({
  projectId: configuration().project.projectId,
});

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let validateResult;

    try {
      validateResult = await firebaseApp
        .auth()
        .verifyIdToken(request.headers.authorization.replace('Bearer ', ''));
      request.user = validateResult;

      return true;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException();
    }
  }
}
