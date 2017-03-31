import { BaseModel } from './base/BaseModel';
import { Attribute, AttributeUtility } from './attribute';
import { AttributeType } from '../enumerations';

export class Entity extends BaseModel {
    public name: string;
    public desc: string;
    public root: string;
    public search: string;
    public resEnabled: string;
    public versionEnabled: string;
    public classification: string;
    public defaultAcl: string;
    public reprItem: string;
    public attrs: Attributes;
    public acls: Acls;
    public entities: Entity;
    public entity: Entity[];
    public multiValueAttributes: Attribute[];  //A list of multivalue attributes that is built by entity utility
    public comprehensiveAttributes: Attribute[];  //A comprehnsive list of attributes( MultiValue + Regular ), that must be built by Entity Utility.
    public defaultAttributes: Attribute[]; //This is the list of default attributes, like createdBy, Size, etc
    public isMultiValueAttrBuilt: boolean;
    public isComprehensiveAttrBuilt: boolean;
    public isDefaultAttrBuilt: boolean;
}

export class Acl {
    public name: string;
}

export class Acls {

    public acls: Acl[]
}

export class Attributes {

    public attr: Attribute[];
}

export class EntityUtility {

    public static BuildMultiValueAttributes(entity: Entity): Entity {
        //Here we're going to drill down through the entities array on our entity object, 
        //and surface the multivalue attributes so we can use them in drop downs etc.
        if (!entity.isMultiValueAttrBuilt) {
            if (entity && entity.entities && entity.entities.entity) {
                entity.entities.entity.forEach(childEntity => {
                    if (childEntity && childEntity.attrs && childEntity.attrs.attr) {
                        childEntity.attrs.attr.forEach(mvAttribute => {
                            if (!entity.multiValueAttributes) {
                                entity.multiValueAttributes = new Array<Attribute>();
                            }
                            mvAttribute.isMultiValue = true;
                            mvAttribute.name = mvAttribute.qual;
                            entity.multiValueAttributes.push(mvAttribute);
                        });
                    }
                });
            }
            entity.isMultiValueAttrBuilt = true;
            if (entity.multiValueAttributes) {
                entity.multiValueAttributes = entity.multiValueAttributes.sort();
            }
        }
        return entity;
    }
    
    public static BuildDefaultAttributes(entity: Entity): Entity {
        if (!entity.isDefaultAttrBuilt) {
            if(!entity.defaultAttributes){
                entity.defaultAttributes = new Array<Attribute>();
            }
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Created By', 'CreatedBy', 'CreatedBy', true, AttributeType.String));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Created Date', 'createdTS', 'CreatedTS', false, AttributeType.DateTime));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Checked Out By', 'CheckedOutBy', 'CheckedOutBy', true, AttributeType.String));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Checked Out Date', 'checkedOutTS', 'checkedOutTS', false, AttributeType.DateTime));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Modified By', 'ModifiedBy', 'ModifiedBy', true, AttributeType.String));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Modified Date', 'ModifiedTS', 'ModifiedTS', false, AttributeType.DateTime));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Size', 'RESOURCESIZE', 'RESOURCESIZE', false, AttributeType.Long));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('Display Name', 'displayName', 'displayName', false, AttributeType.String));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('File Name', 'RESOURCENAME', 'RESOURCENAME', false, AttributeType.String));
            entity.defaultAttributes.push(AttributeUtility.BuildDefaultAttribute('ID', 'ITEMID', 'ITEMID', false, AttributeType.String));
            entity.isDefaultAttrBuilt = true;
        }
        return entity;
    }

    //This method will ensure your entity object has a comprehensive list of both
    //regular attributes, and multivalue ones.  Including building out the default properties, like created on etc.
    public static BuildComprehensiveAttributes(entity: Entity): Entity {
        //Let's make sure we actually have mv attributes and we
        //have pushed them up to an easier to work with object on the entity.
        this.BuildMultiValueAttributes(entity);
        this.BuildDefaultAttributes(entity);

        if (!entity.isComprehensiveAttrBuilt) {
            if (!entity.comprehensiveAttributes) {
                entity.comprehensiveAttributes = new Array<Attribute>();
            }
            if (entity && entity.attrs && entity.attrs.attr) {
                entity.attrs.attr.forEach(regularAttribute => {
                    entity.comprehensiveAttributes.push(regularAttribute);
                });
            }
            if (entity.multiValueAttributes) {
                entity.multiValueAttributes.forEach(mvAttribute => {
                    entity.comprehensiveAttributes.push(mvAttribute);
                });
            }
            if(entity.defaultAttributes){
                entity.defaultAttributes.forEach(defaultAttribute => {
                    entity.comprehensiveAttributes.push(defaultAttribute);
                });
            }
            if (entity.comprehensiveAttributes) {
                entity.comprehensiveAttributes = entity.comprehensiveAttributes.sort((a1,a2) => {
                    if(a1.name < a2.name){
                        return -1;
                    }
                    if(a1.name > a2.name){
                        return 1;
                    }
                    return 0;
                });
            }
            entity.isComprehensiveAttrBuilt = true;
        }
        return entity;
    }
}