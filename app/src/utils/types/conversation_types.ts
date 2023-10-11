
export type ConversationType = {
    id: string, 
    dateCreated: Date, 
    isEncrypted: boolean, 
    name?: string, 
    participants: string[], 
    messages: string[]
}