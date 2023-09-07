

export interface Message {
    id?: string, 
    dateSent: Date, 
    sender: string, 
    isAttachment: boolean, 
    text: string
}