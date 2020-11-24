import { Controller, Get } from '@nestjs/common';
import { MemesService } from './memes.service';

@Controller('memes')
export class MemesController {
    constructor(private memesService: MemesService) {}

    @Get()
    getMemes() {
        return this.memesService.find()
    }
}
