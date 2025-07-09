import {
  type ArgumentsHost,
  type ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

// export class AllExpectionsFilter implements ExceptionFilter {
//   private readonly logger = new Logger(AllExpectionsFilter.name);
//
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse() as Response;
//     const status =
//       exception instanceof HttpException ? exception.getStatus() : 500;
//     const massage =
//       exception instanceof HttpException
//         ? exception.message
//         : 'internal server eror';
//     this.logger.error(massage, exception);
//     response.status(status).json({
//       status,
//       massage,
//       timestamp: new Date().toISOString(),
//       path: ctx.getRequest().url,
//     });
//   }
// }
