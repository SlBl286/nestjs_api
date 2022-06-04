import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(2203, { transports: ['websocket'], cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server;
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected');
  }
  private logger: Logger = new Logger('AppGateway');
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    return { event: 'message', data: ` ${payload}` };
  }
}
