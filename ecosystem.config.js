module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // Application description
    {
      name: 'ZSmartHome RPGPIO REST Service',
      script: 'index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 8000,
        PIN_NUMBER: 17
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'pi',
      host: 'raspberrypi',
      ref: 'origin/master',
      repo: 'https://github.com/ZSmartHome/smart-rgpio.git',
      path: '/home/pi/smart-rgpio',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js'
    }
  }
};
