import { Controller, Logger, Post, Body, OnModuleInit } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';

const messages = [];

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  @Post('message')
  async newMessage(@Body() body: { text: string }) {
    const { text } = body;
    messages.push(text);
    return this.grpcService.newMessage(text);
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.grpcService.accumulate({ data });
  }

  @Post('reverse')
  async reverse(@Body('data') body: { text: string }) {
    const { text } = body;
    this.logger.log('Reversing ' + text);
    return this.grpcService;
  }
}
