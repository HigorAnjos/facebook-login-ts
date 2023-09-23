export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '690757743075069',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '903b52c1972f1b3a6ba707b06b4cf417'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'any_secret'
}
