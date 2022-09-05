import { Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetRecipientUserBalanceDTO } from "../useCases/getBalance/IGetRecipientUserBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { ICreateTransferOperationDTO } from "../useCases/transferOperation/ICreateTransferOperationDTO";
import { ITransferMoneyDTO } from "../useCases/transferOperation/ITransferMoneyDTO";

export interface IStatementsRepository {
  create: (data: ICreateStatementDTO) => Promise<Statement>;
  createTransferOperation: (data: ICreateTransferOperationDTO) => Promise<Statement>;
  findStatementOperation: (data: IGetStatementOperationDTO) => Promise<Statement | undefined>;
  getUserBalance: (data: IGetBalanceDTO) => Promise<
    { balance: number } | { balance: number, statement: Statement[] }
  >;
  getRecipientUserBalance: (data: IGetRecipientUserBalanceDTO) => Promise<{ balance: number }>;
  transferMoney: (data: ITransferMoneyDTO) => Promise<void>
}
