import React from 'react';
import Image from 'next/image';
import { Control, FieldPath } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
}

interface CustomProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType){
    case FormFieldType.INPUT:
  return (
    <div className="flex rounded-md border border-dark-500 bg-dark-400">
      {props.iconSrc && (
        <Image
          className="ml-2"
          src={props.iconSrc}
          alt={props.iconAlt || 'icon'}
          height={24}
          width={24}
        />
      )}
      <FormControl>
        <Input
          placeholder={props.placeholder}
          className="shad-input border-0 text-white"
          type={props.name === 'password' ? 'password' : 'text'}
          {...field}
        />
      </FormControl>
    </div>
  );
  case FormFieldType.TEXTAREA:
    return (
      <FormControl>
      <Textarea
        placeholder={props.placeholder}
        className="shad-textarea"
        {...field}
      />
      </FormControl>
    )
    default:
      return null;
  
};
}


const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
        <FormItem>
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
        </div>
      )}
    />
  );
};

export default CustomFormField;
