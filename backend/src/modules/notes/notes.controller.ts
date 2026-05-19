import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserId } from '../../libs/common/decorators/current-userId.decorator';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @CurrentUserId() userId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(userId, createNoteDto);
  }

  @Get()
  findAll(@CurrentUserId() userId: string) {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUserId() userId: string) {
    return this.notesService.findOne(id, userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.notesService.update(id, updateNoteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUserId() userId: string) {
    return this.notesService.remove(id, userId);
  }
}
