
export interface Conversation {
    id?: string, 
    dateCreated: Date, 
    isEncrypted: boolean, 
    name?: string, 
    participants: string[], 
    messages: string[]
}