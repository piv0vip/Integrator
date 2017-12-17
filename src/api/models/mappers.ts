/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */


export const SettingDescription = {
  required: false,
  serializedName: 'SettingDescription',
  type: {
    name: 'Composite',
    className: 'SettingDescription',
    modelProperties: {
      name: {
        required: true,
        serializedName: 'name',
        type: {
          name: 'String'
        }
      },
      defaultValue: {
        required: false,
        serializedName: 'defaultValue',
        type: {
          name: 'String'
        }
      },
      type: {
        required: false,
        serializedName: 'type',
        type: {
          name: 'String'
        }
      },
      options: {
        required: false,
        serializedName: 'options',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      },
      isRequired: {
        required: false,
        serializedName: 'isRequired',
        type: {
          name: 'Boolean'
        }
      }
    }
  }
};

export const SafeWaitHandle = {
  required: false,
  serializedName: 'SafeWaitHandle',
  type: {
    name: 'Composite',
    className: 'SafeWaitHandle',
    modelProperties: {
      isInvalid: {
        required: false,
        readOnly: true,
        serializedName: 'isInvalid',
        type: {
          name: 'Boolean'
        }
      },
      isClosed: {
        required: false,
        readOnly: true,
        serializedName: 'isClosed',
        type: {
          name: 'Boolean'
        }
      }
    }
  }
};

export const WaitHandle = {
  required: false,
  serializedName: 'WaitHandle',
  type: {
    name: 'Composite',
    className: 'WaitHandle',
    modelProperties: {
      handle: {
        required: false,
        serializedName: 'handle',
        type: {
          name: 'Object'
        }
      },
      safeWaitHandle: {
        required: false,
        serializedName: 'safeWaitHandle',
        type: {
          name: 'Composite',
          className: 'SafeWaitHandle'
        }
      }
    }
  }
};

export const NullableCancellationToken = {
  required: false,
  serializedName: 'Nullable[CancellationToken]',
  type: {
    name: 'Composite',
    className: 'NullableCancellationToken',
    modelProperties: {
      isCancellationRequested: {
        required: false,
        readOnly: true,
        serializedName: 'isCancellationRequested',
        type: {
          name: 'Boolean'
        }
      },
      canBeCanceled: {
        required: false,
        readOnly: true,
        serializedName: 'canBeCanceled',
        type: {
          name: 'Boolean'
        }
      },
      waitHandle: {
        required: false,
        readOnly: true,
        serializedName: 'waitHandle',
        type: {
          name: 'Composite',
          className: 'WaitHandle'
        }
      }
    }
  }
};

export const IHandler = {
  required: false,
  serializedName: 'IHandler',
  type: {
    name: 'Composite',
    className: 'IHandler',
    modelProperties: {
      handlerSettings: {
        required: false,
        readOnly: true,
        serializedName: 'handlerSettings',
        type: {
          name: 'Object'
        }
      },
      defaultHandlerSettings: {
        required: false,
        readOnly: true,
        serializedName: 'defaultHandlerSettings',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'SettingDescriptionElementType',
              type: {
                name: 'Composite',
                className: 'SettingDescription'
              }
          }
        }
      },
      taskType: {
        required: false,
        readOnly: true,
        serializedName: 'taskType',
        type: {
          name: 'String'
        }
      },
      taskHandlerName: {
        required: false,
        readOnly: true,
        serializedName: 'taskHandlerName',
        type: {
          name: 'String'
        }
      },
      cancellationToken: {
        required: false,
        serializedName: 'cancellationToken',
        type: {
          name: 'Composite',
          className: 'NullableCancellationToken'
        }
      },
      logger: {
        required: false,
        readOnly: true,
        serializedName: 'logger',
        type: {
          name: 'Object'
        }
      }
    }
  }
};

export const DataTaskGroup = {
  required: false,
  serializedName: 'DataTaskGroup',
  type: {
    name: 'Composite',
    className: 'DataTaskGroup',
    modelProperties: {
      cronSchedule: {
        required: false,
        serializedName: 'cronSchedule',
        type: {
          name: 'String'
        }
      },
      dataTaskGroupId: {
        required: false,
        serializedName: 'dataTaskGroupId',
        type: {
          name: 'Number'
        }
      },
      dataTaskList: {
        required: false,
        serializedName: 'dataTaskList',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'DataTaskElementType',
              type: {
                name: 'Composite',
                className: 'DataTask'
              }
          }
        }
      },
      enabled: {
        required: false,
        serializedName: 'enabled',
        type: {
          name: 'Boolean'
        }
      },
      groupOnly: {
        required: false,
        serializedName: 'groupOnly',
        type: {
          name: 'Boolean'
        }
      },
      maxRetries: {
        required: false,
        serializedName: 'maxRetries',
        type: {
          name: 'String'
        }
      },
      name: {
        required: false,
        serializedName: 'name',
        type: {
          name: 'String'
        }
      },
      retries: {
        required: false,
        serializedName: 'retries',
        type: {
          name: 'String'
        }
      },
      recCreated: {
        required: false,
        serializedName: 'recCreated',
        type: {
          name: 'DateTime'
        }
      },
      recModified: {
        required: false,
        serializedName: 'recModified',
        type: {
          name: 'DateTime'
        }
      },
      entityName: {
        required: false,
        readOnly: true,
        serializedName: 'entityName',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const DataTask = {
  required: false,
  serializedName: 'DataTask',
  type: {
    name: 'Composite',
    className: 'DataTask',
    modelProperties: {
      cronSchedule: {
        required: false,
        serializedName: 'cronSchedule',
        type: {
          name: 'String'
        }
      },
      dataTaskGroup: {
        required: false,
        serializedName: 'dataTaskGroup',
        type: {
          name: 'Composite',
          className: 'DataTaskGroup'
        }
      },
      dataTaskGroupId: {
        required: false,
        serializedName: 'dataTaskGroupId',
        type: {
          name: 'Number'
        }
      },
      dataTaskId: {
        required: false,
        serializedName: 'dataTaskId',
        type: {
          name: 'Number'
        }
      },
      displayName: {
        required: false,
        serializedName: 'displayName',
        type: {
          name: 'String'
        }
      },
      enabled: {
        required: false,
        serializedName: 'enabled',
        type: {
          name: 'Boolean'
        }
      },
      handlerSettings: {
        required: false,
        serializedName: 'handlerSettings',
        type: {
          name: 'String'
        }
      },
      inactive: {
        required: false,
        serializedName: 'inactive',
        type: {
          name: 'Boolean'
        }
      },
      isMaintenance: {
        required: false,
        serializedName: 'isMaintenance',
        type: {
          name: 'Boolean'
        }
      },
      lastStartTime: {
        required: false,
        serializedName: 'lastStartTime',
        type: {
          name: 'DateTime'
        }
      },
      maxRetries: {
        required: false,
        serializedName: 'maxRetries',
        type: {
          name: 'Number'
        }
      },
      nextStartTime: {
        required: false,
        serializedName: 'nextStartTime',
        type: {
          name: 'DateTime'
        }
      },
      retries: {
        required: false,
        serializedName: 'retries',
        type: {
          name: 'Number'
        }
      },
      status: {
        required: false,
        serializedName: 'status',
        type: {
          name: 'String'
        }
      },
      taskType: {
        required: false,
        serializedName: 'taskType',
        type: {
          name: 'String'
        }
      },
      recCreated: {
        required: false,
        serializedName: 'recCreated',
        type: {
          name: 'DateTime'
        }
      },
      recModified: {
        required: false,
        serializedName: 'recModified',
        type: {
          name: 'DateTime'
        }
      },
      entityName: {
        required: false,
        readOnly: true,
        serializedName: 'entityName',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const ContainFilterDataTask = {
  required: false,
  serializedName: 'ContainFilter[DataTask]',
  type: {
    name: 'Composite',
    className: 'ContainFilterDataTask',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const ExistsFilterDataTask = {
  required: false,
  serializedName: 'ExistsFilter[DataTask]',
  type: {
    name: 'Composite',
    className: 'ExistsFilterDataTask',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const IgnoredFilterDataTask = {
  required: false,
  serializedName: 'IgnoredFilter[DataTask]',
  type: {
    name: 'Composite',
    className: 'IgnoredFilterDataTask',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const PeriodFilterDataTask = {
  required: false,
  serializedName: 'PeriodFilter[DataTask]',
  type: {
    name: 'Composite',
    className: 'PeriodFilterDataTask',
    modelProperties: {
      from: {
        required: false,
        serializedName: 'from',
        type: {
          name: 'DateTime'
        }
      },
      to: {
        required: false,
        serializedName: 'to',
        type: {
          name: 'DateTime'
        }
      }
    }
  }
};

export const FieldFilterDataTask = {
  required: false,
  serializedName: 'FieldFilter[DataTask]',
  type: {
    name: 'Composite',
    className: 'FieldFilterDataTask',
    modelProperties: {
      fieldName: {
        required: false,
        serializedName: 'fieldName',
        type: {
          name: 'String'
        }
      },
      containValues: {
        required: false,
        serializedName: 'containValues',
        type: {
          name: 'Composite',
          className: 'ContainFilterDataTask'
        }
      },
      existsValues: {
        required: false,
        serializedName: 'existsValues',
        type: {
          name: 'Composite',
          className: 'ExistsFilterDataTask'
        }
      },
      ignoredValues: {
        required: false,
        serializedName: 'ignoredValues',
        type: {
          name: 'Composite',
          className: 'IgnoredFilterDataTask'
        }
      },
      period: {
        required: false,
        serializedName: 'period',
        type: {
          name: 'Composite',
          className: 'PeriodFilterDataTask'
        }
      }
    }
  }
};

export const ContainFilterDataTaskGroup = {
  required: false,
  serializedName: 'ContainFilter[DataTaskGroup]',
  type: {
    name: 'Composite',
    className: 'ContainFilterDataTaskGroup',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const ExistsFilterDataTaskGroup = {
  required: false,
  serializedName: 'ExistsFilter[DataTaskGroup]',
  type: {
    name: 'Composite',
    className: 'ExistsFilterDataTaskGroup',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const IgnoredFilterDataTaskGroup = {
  required: false,
  serializedName: 'IgnoredFilter[DataTaskGroup]',
  type: {
    name: 'Composite',
    className: 'IgnoredFilterDataTaskGroup',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const PeriodFilterDataTaskGroup = {
  required: false,
  serializedName: 'PeriodFilter[DataTaskGroup]',
  type: {
    name: 'Composite',
    className: 'PeriodFilterDataTaskGroup',
    modelProperties: {
      from: {
        required: false,
        serializedName: 'from',
        type: {
          name: 'DateTime'
        }
      },
      to: {
        required: false,
        serializedName: 'to',
        type: {
          name: 'DateTime'
        }
      }
    }
  }
};

export const FieldFilterDataTaskGroup = {
  required: false,
  serializedName: 'FieldFilter[DataTaskGroup]',
  type: {
    name: 'Composite',
    className: 'FieldFilterDataTaskGroup',
    modelProperties: {
      fieldName: {
        required: false,
        serializedName: 'fieldName',
        type: {
          name: 'String'
        }
      },
      containValues: {
        required: false,
        serializedName: 'containValues',
        type: {
          name: 'Composite',
          className: 'ContainFilterDataTaskGroup'
        }
      },
      existsValues: {
        required: false,
        serializedName: 'existsValues',
        type: {
          name: 'Composite',
          className: 'ExistsFilterDataTaskGroup'
        }
      },
      ignoredValues: {
        required: false,
        serializedName: 'ignoredValues',
        type: {
          name: 'Composite',
          className: 'IgnoredFilterDataTaskGroup'
        }
      },
      period: {
        required: false,
        serializedName: 'period',
        type: {
          name: 'Composite',
          className: 'PeriodFilterDataTaskGroup'
        }
      }
    }
  }
};

export const EntityStatusesValues = {
  required: false,
  serializedName: 'EntityStatusesValues',
  type: {
    name: 'Composite',
    className: 'EntityStatusesValues',
    modelProperties: {
      entityTypes: {
        required: false,
        serializedName: 'entityTypes',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      },
      sources: {
        required: false,
        serializedName: 'sources',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      },
      statuses: {
        required: false,
        serializedName: 'statuses',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      },
      statusMessages: {
        required: false,
        serializedName: 'statusMessages',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      },
      targets: {
        required: false,
        serializedName: 'targets',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      },
      versions: {
        required: false,
        serializedName: 'versions',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const DocumentTransfer = {
  required: false,
  serializedName: 'DocumentTransfer',
  type: {
    name: 'Composite',
    className: 'DocumentTransfer',
    modelProperties: {
      content: {
        required: false,
        serializedName: 'content',
        type: {
          name: 'String'
        }
      },
      documentTransferId: {
        required: false,
        serializedName: 'documentTransferId',
        type: {
          name: 'Number'
        }
      },
      documentType: {
        required: false,
        serializedName: 'documentType',
        type: {
          name: 'String'
        }
      },
      errorMessage: {
        required: false,
        serializedName: 'errorMessage',
        type: {
          name: 'String'
        }
      },
      source: {
        required: false,
        serializedName: 'source',
        type: {
          name: 'String'
        }
      },
      sourceId: {
        required: false,
        serializedName: 'sourceId',
        type: {
          name: 'String'
        }
      },
      status: {
        required: false,
        serializedName: 'status',
        type: {
          name: 'String'
        }
      },
      target: {
        required: false,
        serializedName: 'target',
        type: {
          name: 'String'
        }
      },
      targetId: {
        required: false,
        serializedName: 'targetId',
        type: {
          name: 'String'
        }
      },
      recCreated: {
        required: false,
        serializedName: 'recCreated',
        type: {
          name: 'DateTime'
        }
      },
      recModified: {
        required: false,
        serializedName: 'recModified',
        type: {
          name: 'DateTime'
        }
      },
      entityName: {
        required: false,
        readOnly: true,
        serializedName: 'entityName',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const EntityStatus = {
  required: false,
  serializedName: 'EntityStatus',
  type: {
    name: 'Composite',
    className: 'EntityStatus',
    modelProperties: {
      entityStatusId: {
        required: false,
        serializedName: 'entityStatusId',
        type: {
          name: 'Number'
        }
      },
      entityType: {
        required: false,
        serializedName: 'entityType',
        type: {
          name: 'String'
        }
      },
      entityVersion: {
        required: false,
        serializedName: 'entityVersion',
        type: {
          name: 'DateTime'
        }
      },
      inContent: {
        required: false,
        serializedName: 'inContent',
        type: {
          name: 'String'
        }
      },
      inDocTransfer: {
        required: false,
        serializedName: 'inDocTransfer',
        type: {
          name: 'Composite',
          className: 'DocumentTransfer'
        }
      },
      inDocTransferId: {
        required: false,
        serializedName: 'inDocTransferId',
        type: {
          name: 'Number'
        }
      },
      outContent: {
        required: false,
        serializedName: 'outContent',
        type: {
          name: 'String'
        }
      },
      outDocTransfer: {
        required: false,
        serializedName: 'outDocTransfer',
        type: {
          name: 'Composite',
          className: 'DocumentTransfer'
        }
      },
      outDocTransferId: {
        required: false,
        serializedName: 'outDocTransferId',
        type: {
          name: 'Number'
        }
      },
      source: {
        required: false,
        serializedName: 'source',
        type: {
          name: 'String'
        }
      },
      sourceId: {
        required: false,
        serializedName: 'sourceId',
        type: {
          name: 'String'
        }
      },
      status: {
        required: false,
        serializedName: 'status',
        type: {
          name: 'String'
        }
      },
      statusMessage: {
        required: false,
        serializedName: 'statusMessage',
        type: {
          name: 'String'
        }
      },
      target: {
        required: false,
        serializedName: 'target',
        type: {
          name: 'String'
        }
      },
      targetId: {
        required: false,
        serializedName: 'targetId',
        type: {
          name: 'String'
        }
      },
      recCreated: {
        required: false,
        serializedName: 'recCreated',
        type: {
          name: 'DateTime'
        }
      },
      recModified: {
        required: false,
        serializedName: 'recModified',
        type: {
          name: 'DateTime'
        }
      },
      entityName: {
        required: false,
        readOnly: true,
        serializedName: 'entityName',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const ContainFilterEntityStatus = {
  required: false,
  serializedName: 'ContainFilter[EntityStatus]',
  type: {
    name: 'Composite',
    className: 'ContainFilterEntityStatus',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const ExistsFilterEntityStatus = {
  required: false,
  serializedName: 'ExistsFilter[EntityStatus]',
  type: {
    name: 'Composite',
    className: 'ExistsFilterEntityStatus',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const IgnoredFilterEntityStatus = {
  required: false,
  serializedName: 'IgnoredFilter[EntityStatus]',
  type: {
    name: 'Composite',
    className: 'IgnoredFilterEntityStatus',
    modelProperties: {
      values: {
        required: false,
        serializedName: 'values',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const PeriodFilterEntityStatus = {
  required: false,
  serializedName: 'PeriodFilter[EntityStatus]',
  type: {
    name: 'Composite',
    className: 'PeriodFilterEntityStatus',
    modelProperties: {
      from: {
        required: false,
        serializedName: 'from',
        type: {
          name: 'DateTime'
        }
      },
      to: {
        required: false,
        serializedName: 'to',
        type: {
          name: 'DateTime'
        }
      }
    }
  }
};

export const FieldFilterEntityStatus = {
  required: false,
  serializedName: 'FieldFilter[EntityStatus]',
  type: {
    name: 'Composite',
    className: 'FieldFilterEntityStatus',
    modelProperties: {
      fieldName: {
        required: false,
        serializedName: 'fieldName',
        type: {
          name: 'String'
        }
      },
      containValues: {
        required: false,
        serializedName: 'containValues',
        type: {
          name: 'Composite',
          className: 'ContainFilterEntityStatus'
        }
      },
      existsValues: {
        required: false,
        serializedName: 'existsValues',
        type: {
          name: 'Composite',
          className: 'ExistsFilterEntityStatus'
        }
      },
      ignoredValues: {
        required: false,
        serializedName: 'ignoredValues',
        type: {
          name: 'Composite',
          className: 'IgnoredFilterEntityStatus'
        }
      },
      period: {
        required: false,
        serializedName: 'period',
        type: {
          name: 'Composite',
          className: 'PeriodFilterEntityStatus'
        }
      }
    }
  }
};

export const Log = {
  required: false,
  serializedName: 'Log',
  type: {
    name: 'Composite',
    className: 'Log',
    modelProperties: {
      id: {
        required: false,
        serializedName: 'id',
        type: {
          name: 'Number'
        }
      },
      timestamp: {
        required: false,
        serializedName: 'timestamp',
        type: {
          name: 'DateTime'
        }
      },
      level: {
        required: false,
        serializedName: 'level',
        type: {
          name: 'String'
        }
      },
      exception: {
        required: false,
        serializedName: 'exception',
        type: {
          name: 'String'
        }
      },
      renderedMessage: {
        required: false,
        serializedName: 'renderedMessage',
        type: {
          name: 'String'
        }
      },
      properties: {
        required: false,
        serializedName: 'properties',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const Stream = {
  required: false,
  serializedName: 'Stream',
  type: {
    name: 'Composite',
    className: 'Stream',
    modelProperties: {
      canRead: {
        required: false,
        readOnly: true,
        serializedName: 'canRead',
        type: {
          name: 'Boolean'
        }
      },
      canSeek: {
        required: false,
        readOnly: true,
        serializedName: 'canSeek',
        type: {
          name: 'Boolean'
        }
      },
      canTimeout: {
        required: false,
        readOnly: true,
        serializedName: 'canTimeout',
        type: {
          name: 'Boolean'
        }
      },
      canWrite: {
        required: false,
        readOnly: true,
        serializedName: 'canWrite',
        type: {
          name: 'Boolean'
        }
      },
      length: {
        required: false,
        readOnly: true,
        serializedName: 'length',
        type: {
          name: 'Number'
        }
      },
      position: {
        required: false,
        serializedName: 'position',
        type: {
          name: 'Number'
        }
      },
      readTimeout: {
        required: false,
        serializedName: 'readTimeout',
        type: {
          name: 'Number'
        }
      },
      writeTimeout: {
        required: false,
        serializedName: 'writeTimeout',
        type: {
          name: 'Number'
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskExecuteTaskWithParamsByDataTaskIdPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskExecuteTaskWithParamsByDataTaskIdPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskExecuteTaskWithParamsByDataTaskIdPostOptionalParams',
    modelProperties: {
      dataTaskParameters: {
        required: false,
        serializedName: 'dataTaskParameters',
        type: {
          name: 'Dictionary',
          value: {
              required: false,
              serializedName: 'stringElementType',
              type: {
                name: 'String'
              }
          }
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskGetPagedListPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskGetPagedListPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskGetPagedListPostOptionalParams',
    modelProperties: {
      fieldFilters: {
        required: false,
        serializedName: 'fieldFilters',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'FieldFilterDataTaskElementType',
              type: {
                name: 'Composite',
                className: 'FieldFilterDataTask'
              }
          }
        }
      },
      sortBy: {
        required: false,
        serializedName: 'sortBy',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskInsertPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskInsertPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskInsertPostOptionalParams',
    modelProperties: {
      entity: {
        required: false,
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'DataTask'
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskInsertEntitiesPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskInsertEntitiesPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskInsertEntitiesPostOptionalParams',
    modelProperties: {
      entities: {
        required: false,
        serializedName: 'entities',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'DataTaskElementType',
              type: {
                name: 'Composite',
                className: 'DataTask'
              }
          }
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskUpdatePutOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskUpdatePutOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskUpdatePutOptionalParams',
    modelProperties: {
      entity: {
        required: false,
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'DataTask'
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskGroupGetPagedListPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskGroupGetPagedListPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskGroupGetPagedListPostOptionalParams',
    modelProperties: {
      fieldFilters: {
        required: false,
        serializedName: 'fieldFilters',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'FieldFilterDataTaskGroupElementType',
              type: {
                name: 'Composite',
                className: 'FieldFilterDataTaskGroup'
              }
          }
        }
      },
      sortBy: {
        required: false,
        serializedName: 'sortBy',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskGroupInsertPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskGroupInsertPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskGroupInsertPostOptionalParams',
    modelProperties: {
      entity: {
        required: false,
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'DataTaskGroup'
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskGroupInsertEntitiesPostOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskGroupInsertEntitiesPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskGroupInsertEntitiesPostOptionalParams',
    modelProperties: {
      entities: {
        required: false,
        serializedName: 'entities',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'DataTaskGroupElementType',
              type: {
                name: 'Composite',
                className: 'DataTaskGroup'
              }
          }
        }
      }
    }
  }
};

export const IntegratorAPIRestDataTaskGroupUpdatePutOptionalParams = {
  required: false,
  serializedName: 'RestDataTaskGroupUpdatePutOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestDataTaskGroupUpdatePutOptionalParams',
    modelProperties: {
      entity: {
        required: false,
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'DataTaskGroup'
        }
      }
    }
  }
};

export const IntegratorAPIRestEntityStatusGetPagedListPostOptionalParams = {
  required: false,
  serializedName: 'RestEntityStatusGetPagedListPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestEntityStatusGetPagedListPostOptionalParams',
    modelProperties: {
      fieldFilters: {
        required: false,
        serializedName: 'fieldFilters',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'FieldFilterEntityStatusElementType',
              type: {
                name: 'Composite',
                className: 'FieldFilterEntityStatus'
              }
          }
        }
      },
      sortBy: {
        required: false,
        serializedName: 'sortBy',
        type: {
          name: 'String'
        }
      }
    }
  }
};

export const IntegratorAPIRestEntityStatusInsertPostOptionalParams = {
  required: false,
  serializedName: 'RestEntityStatusInsertPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestEntityStatusInsertPostOptionalParams',
    modelProperties: {
      entity: {
        required: false,
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'EntityStatus'
        }
      }
    }
  }
};

export const IntegratorAPIRestEntityStatusInsertEntitiesPostOptionalParams = {
  required: false,
  serializedName: 'RestEntityStatusInsertEntitiesPostOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestEntityStatusInsertEntitiesPostOptionalParams',
    modelProperties: {
      entities: {
        required: false,
        serializedName: 'entities',
        type: {
          name: 'Sequence',
          element: {
              required: false,
              serializedName: 'EntityStatusElementType',
              type: {
                name: 'Composite',
                className: 'EntityStatus'
              }
          }
        }
      }
    }
  }
};

export const IntegratorAPIRestEntityStatusUpdatePutOptionalParams = {
  required: false,
  serializedName: 'RestEntityStatusUpdatePutOptions',
  type: {
    name: 'Composite',
    className: 'IntegratorAPIRestEntityStatusUpdatePutOptionalParams',
    modelProperties: {
      entity: {
        required: false,
        serializedName: 'entity',
        type: {
          name: 'Composite',
          className: 'EntityStatus'
        }
      }
    }
  }
};
