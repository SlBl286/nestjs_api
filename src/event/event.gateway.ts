import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
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
    this.logger.log('Client connected ' + client.id);
  }
  private logger: Logger = new Logger('AppGateway');
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): WsResponse<string> {
    this.logger.log(payload);
    this.logger.log(client.data);
    return { event: 'message', data: client.id };
  }
}
