import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  private webhooks: any[] = [];
  private readonly MAX_WEBHOOKS = 100; // Limit the number of stored webhooks

  storeWebhook(data: any) {
    // Add timestamp to webhook data
    const webhookWithTimestamp = {
      ...data,
      receivedAt: new Date().toISOString(),
    };

    // Add to the beginning of the array (newest first)
    this.webhooks.unshift(webhookWithTimestamp);

    // Trim the array if it exceeds the maximum size
    if (this.webhooks.length > this.MAX_WEBHOOKS) {
      this.webhooks = this.webhooks.slice(0, this.MAX_WEBHOOKS);
    }

    return webhookWithTimestamp;
  }

  getWebhooks(limit = 10, offset = 0) {
    return {
      webhooks: this.webhooks.slice(offset, offset + limit),
      total: this.webhooks.length,
      hasMore: offset + limit < this.webhooks.length,
    };
  }

  getWebhookById(id: string) {
    return this.webhooks.find(webhook => webhook.id === id);
  }

  clearWebhooks() {
    this.webhooks = [];
    return { cleared: true };
  }
} 