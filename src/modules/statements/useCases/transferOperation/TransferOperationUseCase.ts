import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { TransferOperationError } from "./TransferOperationError";

interface IRequest {
    sender_id: string;
    recipient_id: string;
    amount: number;
    description: string;
}

@injectable()
export class TransferOperationUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StatementsRepository')
        private statementsRepository: IStatementsRepository
    ) { }

    async execute({ sender_id, recipient_id, amount, description }: IRequest) {

        const recipient_user = await this.usersRepository.findById(recipient_id);

        if (!recipient_user) {
            throw new TransferOperationError.UserNotFound();
        }

        const sender_user = await this.usersRepository.findById(sender_id);

        if (!sender_user) {
            throw new TransferOperationError.UserNotFound();
        }


        const { balance: sender_balance } = await this.statementsRepository.getUserBalance({ user_id: sender_id });

        if (sender_balance < amount) {
            throw new TransferOperationError.InsufficientFunds()
        }

        return await this.statementsRepository.createTransferOperation({
            sender_id,
            amount,
            description
        })

    }
}
