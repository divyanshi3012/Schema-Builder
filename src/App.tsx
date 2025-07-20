import { FormProvider, useForm } from "react-hook-form";
import { FieldNode } from "./components/FieldNode";
import { useEffect, useState } from "react";

function App() {
  const methods = useForm({
    defaultValues: {
      fields: []
    }
  });

  const { watch } = methods;
  const watchedFields = watch();

  const [jsonOutput, setJsonOutput] = useState({});

  useEffect(() => {
    const buildSchema = (fields: any[]) => {
      const result: Record<string, any> = {};
      fields.forEach(field => {
        if (field.type === "nested") {
          result[field.key] = buildSchema(field.children || []);
        } else {
          result[field.key] = field.type === "number" ? 0 : "";
        }
      });
      return result;
    };
    setJsonOutput(buildSchema(watchedFields.fields || []));
  }, [watchedFields]);

  return (
    <div className="p-6 grid md:grid-cols-2 gap-4">
      <FormProvider {...methods}>
        <form className="space-y-4">
          <h2 className="text-xl font-semibold">Schema Builder</h2>
          <FieldNode />
        </form>
      </FormProvider>

      <div>
        <h2 className="text-xl font-semibold mb-2">📦 JSON Preview</h2>
        <pre className="bg-black text-white p-4 rounded text-sm max-h-[80vh] overflow-auto">
          {JSON.stringify(jsonOutput, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
