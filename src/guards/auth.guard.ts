import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  firebaseApp;

  constructor(private configProvider: ConfigService) {
    this.firebaseApp = admin.initializeApp({
      projectId: this.configProvider.get<string>('project.projectId'),
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let validateResult;

    try {
      validateResult = await this.firebaseApp
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
