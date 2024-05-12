export class Field {
  constructor(name, label, type, required, minLength, maxLength, subValues) {
    this.name = name;
    this.label = label;
    this.type = type;
    // this.value = "";
    // this.placeholder = '';
    this.required = required;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.subValues = subValues;
    // this.validation = [];
    // this.error = "";
  }
}

export class SubField {
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}

const webFormFields = [
  new Field("firstName", "First Name", "text", true, 2, 20, []),
  new Field("lastName", "Last Name", "text", true, 2, 20, []),
  new Field("email", "Email", "email", true, 5, 50, []),
  //   new Field("password", "Password", "password", true, 8, 20, []),
  //   new Field("confirmPassword", "Confirm Password", "password", true, 8, 20, []),
  new Field("dob", "Date of Birth", "date", true, 8, 20, []),
  new Field("gender", "Gender", "radio", true, 1, 20, [
    new SubField("Male", "male"),
    new SubField("Female", "female"),
    new SubField("Other", "other"),
    new SubField("Prefer not to answer", "prefer-not-to-answer"),
  ]),
  new Field("checkbox_choices", "Checkbox Choices", "checkbox", true, 1, 20, [
    new SubField("Choice One", "choice1"),
    new SubField("Choice Two", "choice2"),
    new SubField("Choice Three", "choice3"),
  ]),
  new Field("country", "Country", "select", true, 1, 20, [
    new SubField("", ""),
    new SubField("USA", "usa"),
    new SubField("India", "india"),
    new SubField("England", "england"),
  ]),
  new Field("feedback", "Feedback", "textarea", false, 8, 20, []),
];

export default webFormFields;
