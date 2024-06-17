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
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  CHECKBOXES: 'checkboxes',
  TOGGLE: 'toggle',
  TOGGLES: 'toggles',
  RADIO: 'radio',
  RADIOS: 'radios',
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
  options?: Array<FormItemOption>;
  multiple?: boolean;
  errors?: string[];
  wrapperProps?: Record<string, any>;
  inputProps?: Record<string, any>;
};

// FormFieldset
export type FormFieldsetProps = {
  name: string;
  label: string;
  disabled?: boolean;
  id?: string;
  wrapperProps?: Record<string, any>;
}

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
  inputProps?: Record<string, any>;
};

export type FormItemRadioProps = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  wrapperProps?: Record<string, any>;
  inputProps?: Record<string, any>
}

export type FormItemCheckboxProps = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  wrapperProps?: Record<string, any>;
  inputProps?: Record<string, any>
}

export type FormItemRadiosProps = {
  options: Array<FormItemRadioProps>;
} & Omit<FormItemBaseProps, 'type'>;

export type FormItemCheckboxesProps = {
  options: Array<FormItemCheckboxProps>;
} & Omit<FormItemBaseProps, 'type'>;

// FormItemSelect
export type FormItemOption = {
  value: string;
  name?: string,
  label: string;
  disabled?: boolean;
  readonly?: boolean;
  title?: string;
  size?: FormItemSize;
  id?: string;
  options?: Array<FormItemOption>;
  wrapperProps?: Record<string, any>;
  inputProps?: Record<string, any>;
};

export type FormItemSelectProps = {
  options: Array<FormItemOption>;
  multiple?: boolean;
} & Omit<FormItemBaseProps, 'type'>;

// FormErrors
export type FormErrorsProps = {
  errors: string[];
};