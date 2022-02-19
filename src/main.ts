import { INestApplication, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppEnvironment, AppEnvKey } from './app.const';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
    try {
        dotenv.config({ path: `${process.env.NODE_ENV}.env` });
        const configService = new ConfigService<AppEnvKey>();
        const port = Number(configService.get<number>('PORT') || 3000);
        const env = configService.get<AppEnvironment>('ENV') || AppEnvironment.Development;

        const app = await getNestApp(env);
        tryInitSwagger(env, app);

        app.useGlobalPipes(new ValidationPipe());
        await app.listen(port);
        console.info(`Mobius is started on port ${port}`);
    } catch (error) {
        console.error('ERROR while bootstraping: ', error);
    }
}

async function getNestApp(env: AppEnvironment): Promise<INestApplication> {
    const options: NestApplicationOptions = {
        logger: env === AppEnvironment.Development ? ['debug'] : ['log']
    };
    return NestFactory.create(AppModule, options);
}

function tryInitSwagger(env: AppEnvironment, app: INestApplication): void {
    if (env !== AppEnvironment.Production) {
        const config = new DocumentBuilder()
            .setTitle('Mobius')
            .setDescription(`Mobius API document`)
            .setVersion('1.0')
            .addTag('mobius')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-docs', app, document);
    }
}

bootstrap();
