"use client";
import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input';

export const FormInput = ({ form, name, placeholder, type = "text"}: {
  form: any;
  name: string;
  placeholder: string;
  type?: string;
}) => {
  return (
    <div className='space-y-2'>
      <h5>{placeholder}</h5>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    </div>
  );
};


export default FormInput