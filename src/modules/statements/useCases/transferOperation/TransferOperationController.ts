import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { TransferOperationUseCase } from './TransferOperationUseCase';

export class TransferOperationController {
    async execute(request: Request, response: Response) {
        const { id: sender_id } = request.user;
        const { recipient_id } = request.params;
        const { amount, description } = request.body;

        const createTransferOperation = container.resolve(TransferOperationUseCase);

        const transferOperation = await createTransferOperation.execute({
            sender_id,
            recipient_id,
            amount,
            description
        });

        return response.status(201).json(transferOperation);
    }
}
