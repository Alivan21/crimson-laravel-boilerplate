import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver, UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

type UseZodFormParams<TFieldValues extends FieldValues> = {
  schema: z.ZodType<TFieldValues>;
} & Omit<UseFormProps<TFieldValues>, "resolver">;

export function useZodForm<TFieldValues extends FieldValues>(
  params: UseZodFormParams<TFieldValues>,
) {
  const compatResolver = zodResolver as unknown as (schema: unknown) => Resolver<TFieldValues>;
  return useForm<TFieldValues>({
    ...params,
    resolver: compatResolver(params.schema),
  });
}
