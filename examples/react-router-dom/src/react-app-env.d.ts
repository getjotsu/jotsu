declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            REACT_APP_ACCOUNT_ID: string;
        }
    }
}

export {};
