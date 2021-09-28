import { Param } from '@nestjs/common';
import { Controller, Get, StreamableFile ,UseGuards,Response} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AuthGuard } from './auth.guard';

@Controller('file')
@UseGuards(AuthGuard)
export class FileController {
  @Get(':name')
  getFile(@Param() params): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'src/assets/'+params.name));
    return new StreamableFile(file);
  }
}