import { Entity, EntityUtility } from './entity';
import { Attribute, AttributeUtility, Value } from './attribute';
import { SearchStyleType, AttributeType, OperationType } from '../enumerations';
import { SearchOperationFactory } from '../client/search/search-operation-factory';
import { Operation } from './operation';

export class SearchStack{
    public id: number;

    constructor(public entity: Entity,public attribute: Attribute,public operation: Operation,public operand: string,public freeTextSearchOperand: string, public operandName: string){}
}