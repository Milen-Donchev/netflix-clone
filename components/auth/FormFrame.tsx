import * as z from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

interface FormFrameProps<TFormData extends z.ZodObject<any, any, any, any>> {
  validationSchema: TFormData;
  defaultValues: z.infer<TFormData>;
  onSubmit: (values: z.infer<TFormData>) => void;
  children: (
    form: UseFormReturn<z.TypeOf<TFormData>, any, undefined>
  ) => React.ReactNode;
  className?: string;
}

const FormFrame = <TFormData extends z.ZodObject<any, any, any, any>>({
  validationSchema,
  defaultValues,
  onSubmit,
  children,
  className,
}: FormFrameProps<TFormData>) => {
  const form = useForm<z.infer<TFormData>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children(form)}
      </form>
    </Form>
  );
};

export default FormFrame;
