import { BaseModel } from './base/BaseModel';
import { Attribute } from './attribute';
import { ItemResourceType, AttributeType } from '../enumerations';

export class Item extends BaseModel {
	public pid: string;
	public id: string;
	public version: string;
	public entityName: string;
	public checkedOutBy: string;
	public checkedOutByName: string;
	public checkedOutTimestamp: string;
	public createdBy: string;
	public createdByName: string;
	public createdTimestamp: string;
	public lastChangedBy: string;
	public lastChangedByName: string;
	public lastChangedTimestamp: string;
	public filename: string;
	public size: string;
	public displayName: string;
	public attrs: Attributes;
	public resrs: Resources;
	public colls: Collumn[];
	public acl: Acl;


	public constructor() {
		super();
	}
}

export class Collumn {
	public name: string;
	public coll: CollumnItem[];
}

export class CollumnItem {
	public entityName: string;
	public attrs: Attributes;
}


export class Acl {
	public name: string;
}

export class Attributes {
	public attr: Attribute[];	
}

export class Resources {
	public res: Resource[];
}

export class Resource {
	public name: string;
	public size: string;
	public mimetype: string;
	public filename: string;
	public url: string;
	public sha256: string;
	public base64: string;
}

export class ItemUtility {
	public static getResourceUrl(item : Item, itemResourceType: ItemResourceType): string {
		const resourceTypeName = this.getResourceTypeName(itemResourceType);
		let resourceUrl: string;
		if(item && item.resrs && item.resrs.res){
			item.resrs.res.forEach(resource => {
				if (resource.name.toLowerCase() == resourceTypeName.toLowerCase()) {
					resourceUrl = resource.url;
				}
			});
		}
		//If we couldn't match the resource type to the requested resource item. 
		if (!resourceUrl) {
			throw new RangeError('The requested resource type was not present on the item');
		}
		return resourceUrl;
	}

	public static getResourceTypeName(itemResourceType: ItemResourceType): string {
		switch (itemResourceType) {
			case ItemResourceType.Thumbnail:
				return 'Thumbnail';
			case ItemResourceType.SmallPreview:
				return 'SmallPreview';
			case ItemResourceType.Preview:
				return 'Preview';
			case ItemResourceType.Full:
				return '';
			default:
				break;
		}
	}

	public static addAttribute(item : Item, qual: string, value: any, attributeType: AttributeType): void {
		if(qual.indexOf('\\') !== -1) {
			const qualParts = qual.split('\\');
			const coll = new Collumn();
			coll.name = qualParts[0]
			coll.coll = [];
			const collItem = new CollumnItem();
			collItem.entityName = qualParts[0];
			const attrs = new Attributes();
			attrs.attr = [];
			const newAttr = new Attribute();
			newAttr.name = qualParts[1];
			newAttr.qual = qual;
			newAttr.value = value;
			newAttr.type = attributeType.toString();
			attrs.attr.push(newAttr);
			collItem.attrs = attrs;
			coll.coll.push(collItem);
			if(item.colls === undefined) {
				item.colls = [];
			}
			item.colls.push(coll);
		} else {
			const newAttr: Attribute = new Attribute();
			newAttr.name = qual;
			newAttr.qual = qual;
			newAttr.value = value;
			newAttr.type = attributeType.toString();
			if(item.attrs === undefined) {
				item.attrs = new Attributes();
			}
			if(item.attrs.attr === undefined) {
				item.attrs.attr = [];
			}
			item.attrs.attr.push(newAttr);
		}
	}

	public static addResource(item : Item, fileName: string, base64: string): void {
		let newResource = new Resource();
		newResource.name = ItemUtility.getResourceTypeName(ItemResourceType.Full);
		newResource.base64 = base64;
		newResource.filename = fileName;
		if(item.resrs === undefined) {
			item.resrs = new Resources();
		}
		if(item.resrs.res === undefined) {
			item.resrs.res = [];
		}
		item.resrs.res.push(newResource);
	}
}