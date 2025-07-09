import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decarator';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      name: 'sergey',
      userAgent,
    };
  }
}
