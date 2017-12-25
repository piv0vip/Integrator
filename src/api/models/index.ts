/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import { RequestOptionsBase } from "ms-rest-js";


/**
 * @interface
 * An interface representing DataTaskGroup.
 */
export interface DataTaskGroup {
  /**
   * @member {number} [dataTaskGroupId]
   */
  dataTaskGroupId?: number;
  /**
   * @member {DataTask[]} [dataTaskList]
   */
  dataTaskList?: DataTask[];
  /**
   * @member {boolean} [groupOnly]
   */
  groupOnly?: boolean;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {string} [cronSchedule]
   */
  cronSchedule?: string;
  /**
   * @member {boolean} [enabled]
   */
  enabled?: boolean;
  /**
   * @member {string} [lastDuration]
   */
  lastDuration?: string;
  /**
   * @member {Date} [lastStartTime]
   */
  lastStartTime?: Date;
  /**
   * @member {number} [maxRetries]
   */
  maxRetries?: number;
  /**
   * @member {Date} [nextStartTime]
   */
  nextStartTime?: Date;
  /**
   * @member {number} [retries]
   */
  retries?: number;
  /**
   * @member {Date} [recCreated]
   */
  recCreated?: Date;
  /**
   * @member {Date} [recModified]
   */
  recModified?: Date;
  /**
   * @member {string} [entityName]
   */
  readonly entityName?: string;
}

/**
 * @interface
 * An interface representing DataTask.
 */
export interface DataTask {
  /**
   * @member {DataTaskGroup} [dataTaskGroup]
   */
  dataTaskGroup?: DataTaskGroup;
  /**
   * @member {number} [dataTaskGroupId]
   */
  dataTaskGroupId?: number;
  /**
   * @member {number} [dataTaskId]
   */
  dataTaskId?: number;
  /**
   * @member {string} [displayName]
   */
  displayName?: string;
  /**
   * @member {number} [executionOrder]
   */
  executionOrder?: number;
  /**
   * @member {string} [handlerSettings]
   */
  handlerSettings?: string;
  /**
   * @member {boolean} [inactive]
   */
  inactive?: boolean;
  /**
   * @member {boolean} [isMaintenance]
   */
  isMaintenance?: boolean;
  /**
   * @member {Status} [status] Possible values include: 'NotStarted',
   * 'Running', 'Successful', 'Error', 'Cancelled'
   */
  status?: Status;
  /**
   * @member {string} [taskType]
   */
  taskType?: string;
  /**
   * @member {string} [cronSchedule]
   */
  cronSchedule?: string;
  /**
   * @member {boolean} [enabled]
   */
  enabled?: boolean;
  /**
   * @member {Date} [lastStartTime]
   */
  lastStartTime?: Date;
  /**
   * @member {number} [maxRetries]
   */
  maxRetries?: number;
  /**
   * @member {Date} [nextStartTime]
   */
  nextStartTime?: Date;
  /**
   * @member {number} [retries]
   */
  retries?: number;
  /**
   * @member {string} [lastDuration]
   */
  lastDuration?: string;
  /**
   * @member {Date} [recCreated]
   */
  recCreated?: Date;
  /**
   * @member {Date} [recModified]
   */
  recModified?: Date;
  /**
   * @member {string} [entityName]
   */
  readonly entityName?: string;
}

/**
 * @interface
 * An interface representing ContainFilterDataTask.
 */
export interface ContainFilterDataTask {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing ExistsFilterDataTask.
 */
export interface ExistsFilterDataTask {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing IgnoredFilterDataTask.
 */
export interface IgnoredFilterDataTask {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing PeriodFilterDataTask.
 */
export interface PeriodFilterDataTask {
  /**
   * @member {Date} [from]
   */
  from?: Date;
  /**
   * @member {Date} [to]
   */
  to?: Date;
}

/**
 * @interface
 * An interface representing FieldFilterDataTask.
 */
export interface FieldFilterDataTask {
  /**
   * @member {ContainFilterDataTask} [containValues]
   */
  containValues?: ContainFilterDataTask;
  /**
   * @member {ExistsFilterDataTask} [existsValues]
   */
  existsValues?: ExistsFilterDataTask;
  /**
   * @member {string} [fieldName]
   */
  fieldName?: string;
  /**
   * @member {IgnoredFilterDataTask} [ignoredValues]
   */
  ignoredValues?: IgnoredFilterDataTask;
  /**
   * @member {PeriodFilterDataTask} [period]
   */
  period?: PeriodFilterDataTask;
}

/**
 * @interface
 * An interface representing PagedListRequestDataTask.
 */
export interface PagedListRequestDataTask {
  /**
   * @member {number} [currentPage]
   */
  currentPage?: number;
  /**
   * @member {FieldFilterDataTask[]} [filters]
   */
  filters?: FieldFilterDataTask[];
  /**
   * @member {number} [perPage]
   */
  perPage?: number;
  /**
   * @member {string} [sortBy]
   */
  sortBy?: string;
  /**
   * @member {boolean} [sortDesc]
   */
  sortDesc?: boolean;
}

/**
 * @interface
 * An interface representing IPagedList.
 */
export interface IPagedList {
  /**
   * @member {number} [pageCount]
   */
  readonly pageCount?: number;
  /**
   * @member {number} [totalItemCount]
   */
  readonly totalItemCount?: number;
  /**
   * @member {number} [pageNumber]
   */
  readonly pageNumber?: number;
  /**
   * @member {number} [pageSize]
   */
  readonly pageSize?: number;
  /**
   * @member {boolean} [hasPreviousPage]
   */
  readonly hasPreviousPage?: boolean;
  /**
   * @member {boolean} [hasNextPage]
   */
  readonly hasNextPage?: boolean;
  /**
   * @member {boolean} [isFirstPage]
   */
  readonly isFirstPage?: boolean;
  /**
   * @member {boolean} [isLastPage]
   */
  readonly isLastPage?: boolean;
  /**
   * @member {number} [firstItemOnPage]
   */
  readonly firstItemOnPage?: number;
  /**
   * @member {number} [lastItemOnPage]
   */
  readonly lastItemOnPage?: number;
}

/**
 * @interface
 * An interface representing PagedListResponseDataTask.
 */
export interface PagedListResponseDataTask {
  /**
   * @member {IPagedList} [metadata]
   */
  metadata?: IPagedList;
  /**
   * @member {DataTask[]} [entities]
   */
  entities?: DataTask[];
}

/**
 * @interface
 * An interface representing ContainFilterDataTaskGroup.
 */
export interface ContainFilterDataTaskGroup {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing ExistsFilterDataTaskGroup.
 */
export interface ExistsFilterDataTaskGroup {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing IgnoredFilterDataTaskGroup.
 */
export interface IgnoredFilterDataTaskGroup {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing PeriodFilterDataTaskGroup.
 */
export interface PeriodFilterDataTaskGroup {
  /**
   * @member {Date} [from]
   */
  from?: Date;
  /**
   * @member {Date} [to]
   */
  to?: Date;
}

/**
 * @interface
 * An interface representing FieldFilterDataTaskGroup.
 */
export interface FieldFilterDataTaskGroup {
  /**
   * @member {ContainFilterDataTaskGroup} [containValues]
   */
  containValues?: ContainFilterDataTaskGroup;
  /**
   * @member {ExistsFilterDataTaskGroup} [existsValues]
   */
  existsValues?: ExistsFilterDataTaskGroup;
  /**
   * @member {string} [fieldName]
   */
  fieldName?: string;
  /**
   * @member {IgnoredFilterDataTaskGroup} [ignoredValues]
   */
  ignoredValues?: IgnoredFilterDataTaskGroup;
  /**
   * @member {PeriodFilterDataTaskGroup} [period]
   */
  period?: PeriodFilterDataTaskGroup;
}

/**
 * @interface
 * An interface representing PagedListRequestDataTaskGroup.
 */
export interface PagedListRequestDataTaskGroup {
  /**
   * @member {number} [currentPage]
   */
  currentPage?: number;
  /**
   * @member {FieldFilterDataTaskGroup[]} [filters]
   */
  filters?: FieldFilterDataTaskGroup[];
  /**
   * @member {number} [perPage]
   */
  perPage?: number;
  /**
   * @member {string} [sortBy]
   */
  sortBy?: string;
  /**
   * @member {boolean} [sortDesc]
   */
  sortDesc?: boolean;
}

/**
 * @interface
 * An interface representing PagedListResponseDataTaskGroup.
 */
export interface PagedListResponseDataTaskGroup {
  /**
   * @member {IPagedList} [metadata]
   */
  metadata?: IPagedList;
  /**
   * @member {DataTaskGroup[]} [entities]
   */
  entities?: DataTaskGroup[];
}

/**
 * @interface
 * An interface representing EntityStatusesValues.
 */
export interface EntityStatusesValues {
  /**
   * @member {string[]} [entityTypes]
   */
  entityTypes?: string[];
  /**
   * @member {string[]} [sources]
   */
  sources?: string[];
  /**
   * @member {string[]} [statuses]
   */
  statuses?: string[];
  /**
   * @member {string[]} [statusMessages]
   */
  statusMessages?: string[];
  /**
   * @member {string[]} [targets]
   */
  targets?: string[];
  /**
   * @member {string[]} [versions]
   */
  versions?: string[];
}

/**
 * @interface
 * An interface representing ContainFilterEntityStatus.
 */
export interface ContainFilterEntityStatus {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing ExistsFilterEntityStatus.
 */
export interface ExistsFilterEntityStatus {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing IgnoredFilterEntityStatus.
 */
export interface IgnoredFilterEntityStatus {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing PeriodFilterEntityStatus.
 */
export interface PeriodFilterEntityStatus {
  /**
   * @member {Date} [from]
   */
  from?: Date;
  /**
   * @member {Date} [to]
   */
  to?: Date;
}

/**
 * @interface
 * An interface representing FieldFilterEntityStatus.
 */
export interface FieldFilterEntityStatus {
  /**
   * @member {ContainFilterEntityStatus} [containValues]
   */
  containValues?: ContainFilterEntityStatus;
  /**
   * @member {ExistsFilterEntityStatus} [existsValues]
   */
  existsValues?: ExistsFilterEntityStatus;
  /**
   * @member {string} [fieldName]
   */
  fieldName?: string;
  /**
   * @member {IgnoredFilterEntityStatus} [ignoredValues]
   */
  ignoredValues?: IgnoredFilterEntityStatus;
  /**
   * @member {PeriodFilterEntityStatus} [period]
   */
  period?: PeriodFilterEntityStatus;
}

/**
 * @interface
 * An interface representing PagedListRequestEntityStatus.
 */
export interface PagedListRequestEntityStatus {
  /**
   * @member {number} [currentPage]
   */
  currentPage?: number;
  /**
   * @member {FieldFilterEntityStatus[]} [filters]
   */
  filters?: FieldFilterEntityStatus[];
  /**
   * @member {number} [perPage]
   */
  perPage?: number;
  /**
   * @member {string} [sortBy]
   */
  sortBy?: string;
  /**
   * @member {boolean} [sortDesc]
   */
  sortDesc?: boolean;
}

/**
 * @interface
 * An interface representing DocumentTransfer.
 */
export interface DocumentTransfer {
  /**
   * @member {string} [content]
   */
  content?: string;
  /**
   * @member {number} [documentTransferId]
   */
  documentTransferId?: number;
  /**
   * @member {string} [documentType]
   */
  documentType?: string;
  /**
   * @member {string} [errorMessage]
   */
  errorMessage?: string;
  /**
   * @member {string} [source]
   */
  source?: string;
  /**
   * @member {string} [sourceId]
   */
  sourceId?: string;
  /**
   * @member {Status1} [status] Possible values include: 'New', 'Processing',
   * 'Processed', 'Failed', 'Ignored'
   */
  status?: Status1;
  /**
   * @member {string} [target]
   */
  target?: string;
  /**
   * @member {string} [targetId]
   */
  targetId?: string;
  /**
   * @member {Date} [recCreated]
   */
  recCreated?: Date;
  /**
   * @member {Date} [recModified]
   */
  recModified?: Date;
  /**
   * @member {string} [entityName]
   */
  readonly entityName?: string;
}

/**
 * @interface
 * An interface representing EntityStatus.
 */
export interface EntityStatus {
  /**
   * @member {number} [entityStatusId]
   */
  entityStatusId?: number;
  /**
   * @member {string} [entityType]
   */
  entityType?: string;
  /**
   * @member {Date} [entityVersion]
   */
  entityVersion?: Date;
  /**
   * @member {string} [inContent]
   */
  inContent?: string;
  /**
   * @member {DocumentTransfer} [inDocTransfer]
   */
  inDocTransfer?: DocumentTransfer;
  /**
   * @member {number} [inDocTransferId]
   */
  inDocTransferId?: number;
  /**
   * @member {boolean} [hasInContent]
   */
  hasInContent?: boolean;
  /**
   * @member {boolean} [hasOutContent]
   */
  hasOutContent?: boolean;
  /**
   * @member {string} [outContent]
   */
  outContent?: string;
  /**
   * @member {DocumentTransfer} [outDocTransfer]
   */
  outDocTransfer?: DocumentTransfer;
  /**
   * @member {number} [outDocTransferId]
   */
  outDocTransferId?: number;
  /**
   * @member {string} [source]
   */
  source?: string;
  /**
   * @member {string} [sourceId]
   */
  sourceId?: string;
  /**
   * @member {Status2} [status] Possible values include: 'NotFound',
   * 'ReadyToSend', 'NotConfirmed', 'Confirmed', 'Errored', 'Ignored'
   */
  status?: Status2;
  /**
   * @member {string} [statusMessage]
   */
  statusMessage?: string;
  /**
   * @member {string} [target]
   */
  target?: string;
  /**
   * @member {string} [targetId]
   */
  targetId?: string;
  /**
   * @member {Date} [recCreated]
   */
  recCreated?: Date;
  /**
   * @member {Date} [recModified]
   */
  recModified?: Date;
  /**
   * @member {string} [entityName]
   */
  readonly entityName?: string;
}

/**
 * @interface
 * An interface representing PagedListResponseEntityStatus.
 */
export interface PagedListResponseEntityStatus {
  /**
   * @member {IPagedList} [metadata]
   */
  metadata?: IPagedList;
  /**
   * @member {EntityStatus[]} [entities]
   */
  entities?: EntityStatus[];
}

/**
 * @interface
 * An interface representing Stream.
 */
export interface Stream {
  /**
   * @member {boolean} [canRead]
   */
  readonly canRead?: boolean;
  /**
   * @member {boolean} [canSeek]
   */
  readonly canSeek?: boolean;
  /**
   * @member {boolean} [canTimeout]
   */
  readonly canTimeout?: boolean;
  /**
   * @member {boolean} [canWrite]
   */
  readonly canWrite?: boolean;
  /**
   * @member {number} [length]
   */
  readonly length?: number;
  /**
   * @member {number} [position]
   */
  position?: number;
  /**
   * @member {number} [readTimeout]
   */
  readTimeout?: number;
  /**
   * @member {number} [writeTimeout]
   */
  writeTimeout?: number;
}

/**
 * @interface
 * An interface representing SettingDescription.
 */
export interface SettingDescription {
  /**
   * @member {string} name
   */
  name: string;
  /**
   * @member {string} [defaultValue]
   */
  defaultValue?: string;
  /**
   * @member {Type} type Possible values include: 'SelectBox', 'String',
   * 'Date', 'DateTime', 'Bool', 'Url', 'Guid', 'Number', 'EditableSelectBox'
   */
  type: Type;
  /**
   * @member {string[]} [options]
   */
  options?: string[];
  /**
   * @member {boolean} [isRequired]
   */
  isRequired?: boolean;
}

/**
 * @interface
 * An interface representing SafeWaitHandle.
 */
export interface SafeWaitHandle {
  /**
   * @member {boolean} [isInvalid]
   */
  readonly isInvalid?: boolean;
  /**
   * @member {boolean} [isClosed]
   */
  readonly isClosed?: boolean;
}

/**
 * @interface
 * An interface representing WaitHandle.
 */
export interface WaitHandle {
  /**
   * @member {any} [handle]
   */
  handle?: any;
  /**
   * @member {SafeWaitHandle} [safeWaitHandle]
   */
  safeWaitHandle?: SafeWaitHandle;
}

/**
 * @interface
 * An interface representing NullableCancellationToken.
 */
export interface NullableCancellationToken {
  /**
   * @member {boolean} [isCancellationRequested]
   */
  readonly isCancellationRequested?: boolean;
  /**
   * @member {boolean} [canBeCanceled]
   */
  readonly canBeCanceled?: boolean;
  /**
   * @member {WaitHandle} [waitHandle]
   */
  readonly waitHandle?: WaitHandle;
}

/**
 * @interface
 * An interface representing IHandler.
 */
export interface IHandler {
  /**
   * @member {any} [handlerSettings]
   */
  readonly handlerSettings?: any;
  /**
   * @member {SettingDescription[]} [defaultHandlerSettings]
   */
  readonly defaultHandlerSettings?: SettingDescription[];
  /**
   * @member {string} [taskType]
   */
  readonly taskType?: string;
  /**
   * @member {string} [taskHandlerName]
   */
  readonly taskHandlerName?: string;
  /**
   * @member {NullableCancellationToken} [cancellationToken]
   */
  cancellationToken?: NullableCancellationToken;
  /**
   * @member {any} [logger]
   */
  readonly logger?: any;
}

/**
 * @interface
 * An interface representing Log.
 */
export interface Log {
  /**
   * @member {number} [id]
   */
  id?: number;
  /**
   * @member {Date} [timestamp]
   */
  timestamp?: Date;
  /**
   * @member {Level} [level] Possible values include: 'Verbose', 'Debug',
   * 'Information', 'Warning', 'Error', 'Fatal'
   */
  readonly level?: Level;
  /**
   * @member {string} [exception]
   */
  exception?: string;
  /**
   * @member {string} [renderedMessage]
   */
  renderedMessage?: string;
  /**
   * @member {string} [properties]
   */
  properties?: string;
}

/**
 * @interface
 * An interface representing ContainFilterLog.
 */
export interface ContainFilterLog {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing ExistsFilterLog.
 */
export interface ExistsFilterLog {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing IgnoredFilterLog.
 */
export interface IgnoredFilterLog {
  /**
   * @member {string[]} [values]
   */
  values?: string[];
}

/**
 * @interface
 * An interface representing PeriodFilterLog.
 */
export interface PeriodFilterLog {
  /**
   * @member {Date} [from]
   */
  from?: Date;
  /**
   * @member {Date} [to]
   */
  to?: Date;
}

/**
 * @interface
 * An interface representing FieldFilterLog.
 */
export interface FieldFilterLog {
  /**
   * @member {ContainFilterLog} [containValues]
   */
  containValues?: ContainFilterLog;
  /**
   * @member {ExistsFilterLog} [existsValues]
   */
  existsValues?: ExistsFilterLog;
  /**
   * @member {string} [fieldName]
   */
  fieldName?: string;
  /**
   * @member {IgnoredFilterLog} [ignoredValues]
   */
  ignoredValues?: IgnoredFilterLog;
  /**
   * @member {PeriodFilterLog} [period]
   */
  period?: PeriodFilterLog;
}

/**
 * @interface
 * An interface representing PagedListRequestLog.
 */
export interface PagedListRequestLog {
  /**
   * @member {number} [currentPage]
   */
  currentPage?: number;
  /**
   * @member {FieldFilterLog[]} [filters]
   */
  filters?: FieldFilterLog[];
  /**
   * @member {number} [perPage]
   */
  perPage?: number;
  /**
   * @member {string} [sortBy]
   */
  sortBy?: string;
  /**
   * @member {boolean} [sortDesc]
   */
  sortDesc?: boolean;
}

/**
 * @interface
 * An interface representing PagedListResponseLog.
 */
export interface PagedListResponseLog {
  /**
   * @member {IPagedList} [metadata]
   */
  metadata?: IPagedList;
  /**
   * @member {Log[]} [entities]
   */
  entities?: Log[];
}

/**
 * @interface
 * An interface representing IDocumentTransfer.
 */
export interface IDocumentTransfer {
  /**
   * @member {string} [content]
   */
  content?: string;
  /**
   * @member {number} [documentTransferId]
   */
  documentTransferId?: number;
  /**
   * @member {string} [documentType]
   */
  documentType?: string;
  /**
   * @member {string} [errorMessage]
   */
  errorMessage?: string;
  /**
   * @member {string} [source]
   */
  source?: string;
  /**
   * @member {string} [sourceId]
   */
  sourceId?: string;
  /**
   * @member {Status3} [status] Possible values include: 'New', 'Processing',
   * 'Processed', 'Failed', 'Ignored'
   */
  status?: Status3;
  /**
   * @member {string} [target]
   */
  target?: string;
  /**
   * @member {string} [targetId]
   */
  targetId?: string;
}

/**
 * @interface
 * An interface representing IEntityStatus.
 */
export interface IEntityStatus {
  /**
   * @member {number} [entityStatusId]
   */
  readonly entityStatusId?: number;
  /**
   * @member {string} [entityType]
   */
  readonly entityType?: string;
  /**
   * @member {Date} [entityVersion]
   */
  readonly entityVersion?: Date;
  /**
   * @member {string} [inContent]
   */
  inContent?: string;
  /**
   * @member {IDocumentTransfer} [inDocTransfer]
   */
  readonly inDocTransfer?: IDocumentTransfer;
  /**
   * @member {string} [outContent]
   */
  outContent?: string;
  /**
   * @member {IDocumentTransfer} [outDocTransfer]
   */
  outDocTransfer?: IDocumentTransfer;
  /**
   * @member {string} [source]
   */
  source?: string;
  /**
   * @member {string} [sourceId]
   */
  sourceId?: string;
  /**
   * @member {Status4} [status] Possible values include: 'NotFound',
   * 'ReadyToSend', 'NotConfirmed', 'Confirmed', 'Errored', 'Ignored'
   */
  readonly status?: Status4;
  /**
   * @member {string} [statusMessage]
   */
  statusMessage?: string;
  /**
   * @member {string} [target]
   */
  target?: string;
  /**
   * @member {string} [targetId]
   */
  targetId?: string;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskGetPagedListPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskGetPagedListPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {PagedListRequestDataTask} [pagedListRequest]
   */
  pagedListRequest?: PagedListRequestDataTask;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskInsertPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskInsertPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTask} [entity]
   */
  entity?: DataTask;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskInsertArrayPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskInsertArrayPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTask[]} [entities]
   */
  entities?: DataTask[];
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskUpdatePutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskUpdatePutOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTask} [entity]
   */
  entity?: DataTask;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskUpdateArrayPutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskUpdateArrayPutOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTask[]} [entities]
   */
  entities?: DataTask[];
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskGroupGetPagedListPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskGroupGetPagedListPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {PagedListRequestDataTaskGroup} [pagedListRequest]
   */
  pagedListRequest?: PagedListRequestDataTaskGroup;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskGroupInsertPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskGroupInsertPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTaskGroup} [entity]
   */
  entity?: DataTaskGroup;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskGroupInsertArrayPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskGroupInsertArrayPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTaskGroup[]} [entities]
   */
  entities?: DataTaskGroup[];
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskGroupUpdatePutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskGroupUpdatePutOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTaskGroup} [entity]
   */
  entity?: DataTaskGroup;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestDataTaskGroupUpdateArrayPutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestDataTaskGroupUpdateArrayPutOptionalParams extends RequestOptionsBase {
  /**
   * @member {DataTaskGroup[]} [entities]
   */
  entities?: DataTaskGroup[];
}

/**
 * @interface
 * An interface representing IntegratorAPIRestEntityStatusGetEntityStatusShortPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestEntityStatusGetEntityStatusShortPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {PagedListRequestEntityStatus} [pagedListRequest]
   */
  pagedListRequest?: PagedListRequestEntityStatus;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestEntityStatusGetPagedListPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestEntityStatusGetPagedListPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {PagedListRequestEntityStatus} [pagedListRequest]
   */
  pagedListRequest?: PagedListRequestEntityStatus;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestEntityStatusInsertPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestEntityStatusInsertPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {EntityStatus} [entity]
   */
  entity?: EntityStatus;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestEntityStatusInsertArrayPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestEntityStatusInsertArrayPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {EntityStatus[]} [entities]
   */
  entities?: EntityStatus[];
}

/**
 * @interface
 * An interface representing IntegratorAPIRestEntityStatusUpdatePutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestEntityStatusUpdatePutOptionalParams extends RequestOptionsBase {
  /**
   * @member {EntityStatus} [entity]
   */
  entity?: EntityStatus;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestEntityStatusUpdateArrayPutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestEntityStatusUpdateArrayPutOptionalParams extends RequestOptionsBase {
  /**
   * @member {EntityStatus[]} [entities]
   */
  entities?: EntityStatus[];
}

/**
 * @interface
 * An interface representing IntegratorAPIRestSchedulerExecuteTaskByDataTaskIdPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestSchedulerExecuteTaskByDataTaskIdPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {{ [propertyName: string]: string }} [dataTaskParameters]
   */
  dataTaskParameters?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing IntegratorAPIRestSchedulerGetLogsPagedListPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestSchedulerGetLogsPagedListPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {PagedListRequestLog} [pagedListRequest]
   */
  pagedListRequest?: PagedListRequestLog;
}

/**
 * @interface
 * An interface representing IntegratorAPIRestSchedulerResendEntityPostOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface IntegratorAPIRestSchedulerResendEntityPostOptionalParams extends RequestOptionsBase {
  /**
   * @member {EntityStatus} [entityStatus]
   */
  entityStatus?: EntityStatus;
}

/**
 * Defines values for Status.
 * Possible values include: 'NotStarted', 'Running', 'Successful', 'Error',
 * 'Cancelled'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status = <Status>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Status {
  NotStarted = 'NotStarted',
  Running = 'Running',
  Successful = 'Successful',
  Error = 'Error',
  Cancelled = 'Cancelled',
}

/**
 * Defines values for Status1.
 * Possible values include: 'New', 'Processing', 'Processed', 'Failed',
 * 'Ignored'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status1 = <Status1>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Status1 {
  New = 'New',
  Processing = 'Processing',
  Processed = 'Processed',
  Failed = 'Failed',
  Ignored = 'Ignored',
}

/**
 * Defines values for Status2.
 * Possible values include: 'NotFound', 'ReadyToSend', 'NotConfirmed',
 * 'Confirmed', 'Errored', 'Ignored'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status2 = <Status2>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Status2 {
  NotFound = 'NotFound',
  ReadyToSend = 'ReadyToSend',
  NotConfirmed = 'NotConfirmed',
  Confirmed = 'Confirmed',
  Errored = 'Errored',
  Ignored = 'Ignored',
}

/**
 * Defines values for Type.
 * Possible values include: 'SelectBox', 'String', 'Date', 'DateTime', 'Bool',
 * 'Url', 'Guid', 'Number', 'EditableSelectBox'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Type = <Type>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Type {
  SelectBox = 'SelectBox',
  String = 'String',
  Date = 'Date',
  DateTime = 'DateTime',
  Bool = 'Bool',
  Url = 'Url',
  Guid = 'Guid',
  Number = 'Number',
  EditableSelectBox = 'EditableSelectBox',
}

/**
 * Defines values for Level.
 * Possible values include: 'Verbose', 'Debug', 'Information', 'Warning',
 * 'Error', 'Fatal'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Level = <Level>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Level {
  Verbose = 'Verbose',
  Debug = 'Debug',
  Information = 'Information',
  Warning = 'Warning',
  Error = 'Error',
  Fatal = 'Fatal',
}

/**
 * Defines values for Status3.
 * Possible values include: 'New', 'Processing', 'Processed', 'Failed',
 * 'Ignored'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status3 = <Status3>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Status3 {
  New = 'New',
  Processing = 'Processing',
  Processed = 'Processed',
  Failed = 'Failed',
  Ignored = 'Ignored',
}

/**
 * Defines values for Status4.
 * Possible values include: 'NotFound', 'ReadyToSend', 'NotConfirmed',
 * 'Confirmed', 'Errored', 'Ignored'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status4 = <Status4>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum Status4 {
  NotFound = 'NotFound',
  ReadyToSend = 'ReadyToSend',
  NotConfirmed = 'NotConfirmed',
  Confirmed = 'Confirmed',
  Errored = 'Errored',
  Ignored = 'Ignored',
}

/**
 * Defines values for RestDataTaskGetStatusByDataTaskIdGetOKResponse.
 * Possible values include: 'NotStarted', 'Running', 'Successful', 'Error',
 * 'Cancelled'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: RestDataTaskGetStatusByDataTaskIdGetOKResponse =
 * <RestDataTaskGetStatusByDataTaskIdGetOKResponse>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum RestDataTaskGetStatusByDataTaskIdGetOKResponse {
  NotStarted = 'NotStarted',
  Running = 'Running',
  Successful = 'Successful',
  Error = 'Error',
  Cancelled = 'Cancelled',
}

/**
 * Defines values for ContentType.
 * Possible values include: 'InContent', 'OutContent'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ContentType =
 * <ContentType>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export enum ContentType {
  InContent = 'InContent',
  OutContent = 'OutContent',
}
