import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMail(email: string, token: string): Promise<void> {
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

    console.log('Password reset email');
    console.log('To:', email);
    console.log('Link:', resetUrl);
  }
}
