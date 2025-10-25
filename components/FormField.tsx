"use client";

import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    label: string,
    placeholder?: string,
    type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({ name, control, label, placeholder, type = "text" }: FormFieldProps<T>) => (
    <Controller name={name} control={control} render={({ field, fieldState }) => (
        <FormItem className='w-full'>
            <FormLabel className='label'> {label} </FormLabel>
            <FormControl>
                <Input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type={type} placeholder={placeholder} {...field} />
            </FormControl>
            {fieldState?.error && (
                <FormMessage className="text-red-500 text-sm mt-1"> {fieldState.error.message}</FormMessage>
            )}
        </FormItem>
    )} />
)

export default FormField