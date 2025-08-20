import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api (GET) - health check', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status', 'healthy');
        expect(res.body).toHaveProperty('service', 'DDS Forge Server');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('uptime');
      });
  });

  it('/api/version (GET) - version info', () => {
    return request(app.getHttpServer())
      .get('/api/version')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('service', 'DDS Forge Server');
        expect(res.body).toHaveProperty('version', '1.0.0');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('features');
        expect(Array.isArray(res.body.features)).toBe(true);
      });
  });
});
