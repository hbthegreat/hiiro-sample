import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HiiroController } from './hiiro.controller';
import { HiiroService } from './hiiro.service';
import { WebhookService } from './webhook.service';
import hiiroConfig from './hiiro.config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(hiiroConfig),
  ],
  controllers: [HiiroController],
  providers: [HiiroService, WebhookService],
  exports: [HiiroService, WebhookService]
})
export class HiiroModule {}
