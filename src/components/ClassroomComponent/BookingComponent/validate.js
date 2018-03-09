export default function(values) {
  const errors = {};
  const requiredFields = [
    'text-field-name',
    'text-field-regno',
    'text-field-email',
    'text-field-num',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.text-field-email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.text-field-email)
  ) {
    errors.text-field-email = 'Invalid email address';
  }
  return errors;
}
