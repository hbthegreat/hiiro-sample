import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query, 
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HiiroService } from './hiiro.service';
import { WebhookService } from './webhook.service';
import { DocumentDto, GroupDto, TemplateDto } from './dto';

@Controller('api/hiiro')
export class HiiroController {
  constructor(
    private readonly hiiroService: HiiroService,
    private readonly webhookService: WebhookService,
  ) {}

  // Document endpoints
  @Post('document')
  createDocument(@Body() document: DocumentDto) {
    return this.hiiroService.createDocument(document);
  }

  @Get('document')
  getDocuments(
    @Query('groupId') groupId: string,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.hiiroService.getDocuments(groupId, page, limit);
  }

  @Get('document/:id')
  getDocument(@Param('id') id: string) {
    return this.hiiroService.getDocument(id);
  }

  @Put('document/:id')
  updateDocument(
    @Param('id') id: string,
    @Body('document') document: string,
  ) {
    return this.hiiroService.updateDocument(id, document);
  }

  @Delete('document/:id')
  deleteDocument(@Param('id') id: string) {
    return this.hiiroService.deleteDocument(id);
  }

  // Template endpoints
  @Post('template')
  createTemplate(@Body() template: TemplateDto) {
    return this.hiiroService.createTemplate(template);
  }

  @Get('template')
  getTemplates(
    @Query('tag') tag: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.hiiroService.getTemplates(tag, skip, limit);
  }

  @Get('template/:id')
  getTemplate(@Param('id') id: string) {
    return this.hiiroService.getTemplate(id);
  }

  @Put('template/:id')
  updateTemplate(
    @Param('id') id: string,
    @Body() template: TemplateDto,
  ) {
    return this.hiiroService.updateTemplate(id, template);
  }

  @Delete('template/:id')
  deleteTemplate(@Param('id') id: string) {
    return this.hiiroService.deleteTemplate(id);
  }

  // Group endpoints
  @Post('group')
  createGroup(@Body() group: GroupDto) {
    return this.hiiroService.createGroup(group);
  }

  @Get('group')
  getGroups(
    @Query('skip') skip: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.hiiroService.getGroups(skip, limit);
  }

  @Get('group/:id')
  getGroup(@Param('id') id: string) {
    return this.hiiroService.getGroup(id);
  }

  @Put('group/:id')
  updateGroup(
    @Param('id') id: string,
    @Body() group: GroupDto,
  ) {
    return this.hiiroService.updateGroup(id, group);
  }

  @Delete('group/:id')
  deleteGroup(@Param('id') id: string) {
    return this.hiiroService.deleteGroup(id);
  }

  // Webhook endpoints
  @Post('webhook')
  handleWebhook(@Body() webhookData: any) {
    const storedWebhook = this.webhookService.storeWebhook(webhookData);
    return { status: 'ok', id: storedWebhook.id };
  }

  @Get('webhooks')
  getWebhooks(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.webhookService.getWebhooks(limit, offset);
  }

  @Get('webhook/:id')
  getWebhook(@Param('id') id: string) {
    return this.webhookService.getWebhookById(id);
  }

  @Delete('webhooks')
  clearWebhooks() {
    return this.webhookService.clearWebhooks();
  }
}
