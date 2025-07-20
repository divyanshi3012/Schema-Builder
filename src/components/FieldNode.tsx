import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const FieldNode = ({ nestIndex = "", fieldName = "fields" }: any) => {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${nestIndex}${fieldName}`
  });

  return (
    <div className="pl-4 border-l border-gray-300 space-y-2 mt-2">
      {fields.map((field, index) => {
        const currentName = `${nestIndex}${fieldName}[${index}]`;
        const type = watch(`${currentName}.type`);

        return (
          <div key={field.id} className="flex gap-2 items-start">
            <Input {...register(`${currentName}.key`)} placeholder="Field name" className="w-1/3" />

            <Select
              onValueChange={(value) => {
                setValue(`${currentName}.type`, value);
              }}
              value={type}
            >
              <SelectTrigger className="w-1/4">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="nested">Nested</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="destructive" onClick={() => remove(index)}>
              Delete
            </Button>

            {type === "nested" && (
              <FieldNode nestIndex={`${currentName}.`} fieldName="children" />
            )}
          </div>
        );
      })}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ key: "", type: "string" })}
      >
        ➕ Add Field
      </Button>
    </div>
  );
};
