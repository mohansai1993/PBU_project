import { ErrorMessage, Field } from "formik";
function SelectField({
  name,
  isRequired = true,
  label = null,
  onChange = null,
  value = null,
  colorText = "black",
  children,
}) {
  return (
    <div className="flex-1">
      <div className="my-3">
        {label && (
          <div className="mb-2">
            <label style={{ color: colorText }}>
              {label}
              <span className="text-red-500">&nbsp;{isRequired && "*"}</span>
            </label>
          </div>
        )}
        {console.log(value)}
        <Field name={name} style={{ width: "100%" }} value={value}>
          {({ field }) => (
            <select
              {...field}
              onChange={onChange}
              className="border border-black w-full px-3 py-2 rounded-md text-black"
              // onChange={(value) => form.setFieldValue(field.name, value)}
              // onBlur={() => form.setFieldTouched(field.name, true)}
              style={{ width: "100%" }}
            >
              {children}
            </select>
          )}
        </Field>
        <div className="text-red-500 text-xs mt-1">
          <ErrorMessage name={name} />
        </div>
      </div>
    </div>
  );
}
export default SelectField;
