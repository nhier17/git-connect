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
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');

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
};

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
