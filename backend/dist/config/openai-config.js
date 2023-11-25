import OpenAI from "openai";
export const configureOpenAI = () => {
    const config = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORG_ID,
    });
    return config;
};
//# sourceMappingURL=openai-config.js.map