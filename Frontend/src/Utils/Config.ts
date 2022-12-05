class Config {
    public targetAudienceUrl = 'http://localhost:3001/api/target-audience/';
    public giftsPerTargetAudienceUrl = 'http://localhost:3001/api/gifts-per-target-audience/';
    public giftsUrl = 'http://localhost:3001/api/gifts/';
}

const appConfig = new Config(); // Singleton

export default appConfig;
