import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AllExceptionsFilter } from './any-exception.filter';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';
const { createProxyMiddleware } = require('http-proxy-middleware');
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.useGlobalFilters(new AllExceptionsFilter());

  ///https://github.com/chimurai/http-proxy-middleware 反向代理资源
  var options = {
    // target: 'http://193.168.70.107:3001', // target host
    changeOrigin: true, 
    router: function(req) {
      return 'http://193.168.70.107:8080';
  },
  pathRewrite: {'^/static' : ''},
  onProxyRes:function(proxyRes, req, res) {
    console.log(proxyRes.statusCode);
    
    
  }
};
const filter = function (pathname, req) {
  return pathname.match('^/static') && req.method === 'GET';
};
var exampleProxy = createProxyMiddleware(filter,options);
app.use('/static',exampleProxy);


  await app.listen(3000);

  ///配置静态资源
  const app1 = await NestFactory.create<NestExpressApplication>(AppModule);
  // 3.配置静态资源目录
  app1.use(function (req, res, next) { 
    next()
  });
  app1.useGlobalFilters(new AllExceptionsFilter());

  app1.useStaticAssets(join(__dirname,'..','assets'), {
    
    prefix: '/static/', // 虚拟名称 http://localhost:3010/static/...png
  });
  await app1.listen(3001);
}
bootstrap();
