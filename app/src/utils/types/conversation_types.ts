
export type CreateConversationType = {
    name?: string, 
    isEncrypted: boolean, 
    participants: string[]
}

export type ConversationType = CreateConversationType & {
    id: string, 
    dateCreated: Date, 
    messages: string[]
}

export type ConversationResponseType = {
    conversations: {[key: string]: ConversationType}
}