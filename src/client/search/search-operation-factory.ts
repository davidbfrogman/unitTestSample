import { Attribute, AttributeUtility } from '../../models/attribute';
import { AttributeType, OperationType } from '../../enumerations';
import { Operation } from '../../models/operation';

//TODO: The Text in these operation's needs to be translated.
export class SearchOperationFactory {
  private currentSearchOperators: Array<Operation> = [
      new Operation("= Equal", OperationType.EqualTo),
      new Operation("!= Not equal", OperationType.NotEqual),
      new Operation("Like", OperationType.Like),
      new Operation("Not Like", OperationType.NotLike),
      new Operation("< Before", OperationType.Before),
      new Operation("> After", OperationType.After),
      new Operation("<= Before or equal", OperationType.BeforeOrEqual),
      new Operation(">= After or equal", OperationType.AfterOrEqual),
      new Operation("True", OperationType.True),
      new Operation("False", OperationType.False),
      new Operation("Has Value", OperationType.HasValue),
      new Operation("No Value", OperationType.NoValue),
  ];

  constructor() {
  }

  public getOperations(attribute: Attribute): Array<Operation>{
    attribute = AttributeUtility.MapAttributeTypeEnumeration(attribute);
    let searchOperations = new Array<Operation>();

    switch (attribute.AttributeType) {
      case AttributeType.String:
      case AttributeType.Long:
      case AttributeType.Decimal:
      case AttributeType.Double:
      case AttributeType.ValueSet:
      case AttributeType.MultiValue:
        searchOperations.push(
          this.findOperationByType(OperationType.EqualTo),
          this.findOperationByType(OperationType.NotEqual),
          this.findOperationByType(OperationType.Like),
          this.findOperationByType(OperationType.NotLike),
          this.findOperationByType(OperationType.HasValue),
          this.findOperationByType(OperationType.NoValue),
        );
        return searchOperations;
      case AttributeType.DateTime:
      case AttributeType.Time:
      case AttributeType.Timestamp:
        searchOperations.push(
          this.findOperationByType(OperationType.EqualTo),
          this.findOperationByType(OperationType.NotEqual),
          this.findOperationByType(OperationType.Before),
          this.findOperationByType(OperationType.After),
          this.findOperationByType(OperationType.BeforeOrEqual),
          this.findOperationByType(OperationType.AfterOrEqual),
        );
        return searchOperations;
      case AttributeType.Boolean:
              searchOperations.push(
          this.findOperationByType(OperationType.True),
          this.findOperationByType(OperationType.False),
          this.findOperationByType(OperationType.HasValue),
          this.findOperationByType(OperationType.NoValue),
        );
        return searchOperations;
      default:
        break;
    }
  }

  public findOperationByType(operationType: OperationType): Operation {
    return this.currentSearchOperators.find((operation: Operation) => {
      return operation.operationType == operationType;
    });
  }
}
