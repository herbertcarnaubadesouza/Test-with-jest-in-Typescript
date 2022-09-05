import { getRepository, Repository } from "typeorm";

import { OperationType, Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { IStatementsRepository } from "./IStatementsRepository";
import { ICreateTransferOperationDTO } from "../../statements/useCases/transferOperation/ICreateTransferOperationDTO"
import { IGetRecipientUserBalanceDTO } from "../useCases/getBalance/IGetRecipientUserBalanceDTO";
import { ITransferMoneyDTO } from "../useCases/transferOperation/ITransferMoneyDTO";

export class StatementsRepository implements IStatementsRepository {
  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async create({
    user_id,
    amount,
    description,
    type
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      amount,
      description,
      type
    });

    return this.repository.save(statement);
  }

  async createTransferOperation({ sender_id, amount, description }: ICreateTransferOperationDTO): Promise<Statement> {

    const transferOperation = this.repository.create({ user_id: sender_id, sender_id, amount, description, type: OperationType.TRANSFER });

    return this.repository.save(transferOperation);
  }

  async findStatementOperation({ statement_id, user_id }: IGetStatementOperationDTO): Promise<Statement | undefined> {
    return this.repository.findOne(statement_id, {
      where: { user_id }
    });
  }

  async getUserBalance({ user_id, with_statement = false }: IGetBalanceDTO):
    Promise<
      { balance: number } | { balance: number, statement: Statement[] }
    > {
    const statement = await this.repository.find({
      where: { user_id }
    });

    const balance = statement.reduce((acc, operation) => {
      if (operation.type === 'deposit') {
        return acc + operation.amount;
      } else {
        return acc - operation.amount;
      }
    }, 0)

    if (with_statement) {
      return {
        statement,
        balance
      }
    }

    return { balance }
  }

  async getRecipientUserBalance({ recipient_id }: IGetRecipientUserBalanceDTO): Promise<{ balance: number }> {
    const statement = await this.repository.find({
      where: { user_id: recipient_id }
    });

    const balance = statement.reduce((acc, operation) => {
      if (operation.type === 'deposit') {
        return acc + operation.amount;
      } else {
        return acc - operation.amount;
      }
    }, 0)

    return { balance }
  }

  async transferMoney({ sender_id, recipient_id, amount, recipient_balance, sender_balance }: ITransferMoneyDTO): Promise<void> {

    const sender_statement = await this.repository.find({
      where: { user_id: sender_id }
    });

    sender_statement.map((statement) => {
      if (statement.user_id === sender_id) {
        statement.amount = sender_balance - amount
      }
    })

    const recipient_statement = await this.repository.find({
      where: { user_id: recipient_id }
    });

    recipient_statement.map((statement) => {
      if (statement.user_id === recipient_id) {
        statement.amount = recipient_balance + amount
      }
    })

    await this.repository.save(sender_statement);

    await this.repository.save(recipient_statement);


  }
}
