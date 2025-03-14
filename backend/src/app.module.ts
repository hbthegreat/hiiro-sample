import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HiiroModule } from './hiiro/hiiro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HiiroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
