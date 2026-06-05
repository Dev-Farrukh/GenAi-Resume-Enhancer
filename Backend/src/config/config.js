import "dotenv/config"

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'GENAI_API_KEY'];

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`${varName} is not defined in environment variables`);
    }

});
const config = {
    PORT : process.env.PORT || 5000,
    MONGO_URI : process.env.MONGO_URI ,
    JWT_SECRET : process.env.JWT_SECRET ,
    GENAI_API_KEY : process.env.GENAI_API_KEY
}

export default Object.freeze(config);