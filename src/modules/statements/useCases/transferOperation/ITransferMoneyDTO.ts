export interface ITransferMoneyDTO {
    sender_id: string;
    recipient_id: string;
    sender_balance: number;
    recipient_balance: number;
    amount: number;
}