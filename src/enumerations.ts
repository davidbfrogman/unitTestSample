export enum OperationType {
  NotEqual = 1,
  EqualTo = 2,
  Before = 3,
  After = 4,
  BeforeOrEqual = 5,
  AfterOrEqual = 6,
  HasValue = 7,
  NoValue = 8,
  Like = 9,
  NotLike = 10,
  True = 11,
  False = 12,
}

export enum SearchStyleType{
  String,
  Boolean,
  DateTime,
  Timestamp,
  Time,
  MultiValue,
  ValueSet,
  User
}

export enum EnvironmentType{
  Dev,
  QA,
  Stage,
  Prod
}

export enum AttributeType {
    String,
    Short,
    Long,
    Decimal,
    DateTime,
    Time,
    Timestamp,
    Double,
    Boolean,
    ValueSet,
    MultiValue
}

export enum ItemResourceType {
	Thumbnail,
	SmallPreview,
	Preview,
	Full
}
