import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: 'healthy',
      service: 'DDS Forge Server',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  getVersion(): object {
    return {
      service: 'DDS Forge Server',
      version: '1.0.0',
      description: 'Data Distribution Service management server for system engineers',
      features: [
        'DDS monitoring',
        'Configuration management',
        'Performance analytics',
        'System health checks',
      ],
    };
  }
}
