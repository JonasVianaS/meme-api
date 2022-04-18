declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT:string,
            SERVER_PASS:string,
            SECRET:string,
        }
    }
}
export {}