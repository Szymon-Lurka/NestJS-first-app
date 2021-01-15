// import {
//   Catch,
//   ExceptionFilter,
//   ImATeapotException,
//   ArgumentsHost,
// } from '@nestjs/common';
// import { exception } from 'console';

// @Catch(ImATeapotException)
// export class ImATeapotExceptionFilter implements ExceptionFilter {
//   catch(ImATeapotException, ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();
//     response.json({
//         status
//     })
//   }
// }
