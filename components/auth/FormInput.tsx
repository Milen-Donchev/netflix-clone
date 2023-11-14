import type { Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps<TFormData extends Record<string, any>> {
  name: keyof TFormData;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  isInvalid?: boolean;
}

const FormInput = <TFormData extends Record<string, any>>({
  name,
  control,
  label,
  disabled = false,
  type = "text",
  isInvalid,
}: FormInputProps<TFormData>) => {
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input isInvalid={isInvalid} label={label} type={type} {...field} />
          </FormControl>
          <FormMessage className="text-amber-600 text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
