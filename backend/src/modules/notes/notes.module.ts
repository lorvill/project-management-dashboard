import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
