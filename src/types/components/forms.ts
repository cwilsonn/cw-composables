import type { sizes } from '$types/index.ts';

export type FormStructure<T> = {
  field: keyof T,
} & FormItem;

// Generic form item types
export type FormItemSize = Exclude<typeof sizes[number], 'xl'>;

export const formItemTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  DATE: 'date',
  DATETIME: 'datetime',
  DATETIME_LOCAL: 'datetime-local',
  TIME: 'time',
  WEEK: 'week',
  MONTH: 'month',
  SELECT: 'select',
} as const;

export type FormItemType = typeof formItemTypes[keyof typeof formItemTypes];

export type FormItem = {
  name: string;
  label: string;
  type: FormItemType;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  size?: FormItemSize;
  options?: Array<FormItemSelectOption | FormItemSelectOptionGroup>;
  multiple?: boolean;
  errors?: string[];
  wrapperProps?: Record<string, any>;
};

// FormItemBase
export type FormItemBaseType = Exclude<FormItemType, 'select'>;
export type FormItemBaseProps = {
  name: string;
  label: string;
  type?: FormItemBaseType,
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  size?: FormItemSize;
  errors?: FormErrorsProps['errors'];
  wrapperProps?: Record<string, any>;
};

// FormItemSelect
export type FormItemSelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
  title?: string;
  id?: string;
} | string | number;

export type FormItemSelectOptionGroup = {
  label: string;
  options: Array<FormItemSelectOption>;
  disabled?: boolean;
  id?: string;
};

export type FormItemSelectProps = {
  options: Array<FormItemSelectOption | FormItemSelectOptionGroup>;
  multiple?: boolean;
} & Omit<FormItemBaseProps, 'type'>;

// FormItemTextarea
export type FormItemTextareaProps = {
  rows?: number;
} & Omit<FormItemBaseProps, 'type'>;

// FormErrors
export type FormErrorsProps = {
  errors: string[];
};