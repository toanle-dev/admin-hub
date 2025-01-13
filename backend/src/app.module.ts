import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [CommonModule, AuthModule, CoreModule, FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
