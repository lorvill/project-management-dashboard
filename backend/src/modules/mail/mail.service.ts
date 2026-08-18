import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger: Logger = new Logger(MailService.name);

  async sendMail(email: string, token: string): Promise<void> {
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

    this.logger.log('Password reset email');
    this.logger.log(`To: ${email}`);
    this.logger.log(`Link: ${resetUrl}`);
  }
}
