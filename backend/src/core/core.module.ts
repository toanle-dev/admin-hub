import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: ResponseTransformer },
    // { provide: APP_INTERCEPTOR, useClass: ResponseValidation },
    // { provide: APP_FILTER, useClass: ExpectionHandler },
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     transform: true,
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //   }),
    // },
    // WinstonLogger,
  ],
  controllers: [],
})
export class CoreModule {}
