export * from './Enums';
export * from './EnumValues';
export * from './EnumValue';

export enum SettingTypeEnum {
    SelectBox       = 'SelectBox',
    String          = 'String',
    Date            = 'Date',
    DateTime        = 'DateTime',
    Bool            = 'Bool',
    Url             = 'Url',
    Guid            = 'Guid',
    Number          = 'Number',
};

export enum TaskStatusEnum {
    NotStarted      = 'NotStarted',
    Running         = 'Running',
    Successful      = 'Successful',
    Error           = 'Error',
    Cancelled       = 'Cancelled',
}

export enum EntityStatusEnum {
    NotFound        = 'NotFound',
    ReadyToSend     = 'ReadyToSend',
    NotConfirmed    = 'NotConfirmed',
    Confirmed       = 'Confirmed',
    Errored         = 'Errored',
    Ignored         = 'Ignored',
}

export enum FilterTypeEnum {
    Null = 0,
    EnumCheckBoxes,
    StringList,
    Date,
    StringContains,
    Multiselect
}