import { AttributeType } from '../enumerations';

export class Attribute {
    name: string;
    desc: string;
    type: string;
    qual: string;
    value: string;
    required: string;
    unique: string;
    searchable: string;
    repr: string;
    size: string;
    vsEntity: string;
    vsAttr: string;
    valueset: Valueset;
    max: string;
    min: string;
    default: string;
    AttributeType: AttributeType;
    isMultiValue: boolean;
    isUserForSearching: boolean;
}

export class Value {
    name: string;
    desc: string;
}

export class Valueset {
    value: Value[];
}

export class AttributeUtility {

    public static MapAttributeTypeEnumeration(attribute: Attribute): Attribute {
        //TODO: Figure out what short should map to.
        //there seems to be a conflict between short, and valueset
        switch (attribute.type) {
            case "1": //String
                attribute.AttributeType = AttributeType.String;
                break;
            case "4": //Long
                attribute.AttributeType = AttributeType.Long;
                break;
            case "6": //Decimal
                attribute.AttributeType = AttributeType.Decimal;
                break;
            case "10": //Double
                attribute.AttributeType = AttributeType.Double;
                break;
            case "7": //Date
                attribute.AttributeType = AttributeType.DateTime;
                break;
            case "8": //Time
                attribute.AttributeType = AttributeType.Time;
                break;
            case "9": //Timestamp
                attribute.AttributeType = AttributeType.Timestamp;
                break;
            case "20": //Boolean
                attribute.AttributeType = AttributeType.Boolean;
                break;
            case "3": //Value Set -- Although I'm not sure this is 100% correct - This could be short as well.
                attribute.AttributeType = AttributeType.ValueSet;
                break;
            //TODO What is the case for MultiValue sets?    
            default:
                break;
        }
        return attribute;
    }
    
    public static BuildDefaultAttribute(name: string, description: string, qualifyer: string,  isUserForSearching: boolean, attributeType: AttributeType): Attribute{
        let attribute = new Attribute();
        attribute.AttributeType = attributeType;
        attribute.isUserForSearching = isUserForSearching;
        attribute.isMultiValue = false;
        attribute.name = name;
        attribute.desc = description;
        attribute.qual = qualifyer;
        return attribute;
    }
}