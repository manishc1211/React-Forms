import { useState, useRef } from 'react';
import webFormFields from '../assets/webFormFields';
import moment from 'moment';

export default function Webform() {
    const [formFields, setFormFields] = useState([...webFormFields]);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({});
    const form = useRef();

    function clearErrorMessage(event) {
        let tempFormErrors = { ...formErrors };
        delete tempFormErrors[event.target.name];
        setFormErrors({ ...tempFormErrors });
    }

    function validateForm(event, isSubmit) {
        const fd = new FormData(form.current);
        const data = Object.fromEntries(fd.entries());
        let tempFormErrors = { ...formErrors };
        formFields.map((field) => {
            let errMsg = '';
            if (field.type === 'radio') {
                data[field.name] = fd.get(field.name);
            }
            else if (field.type === 'checkbox') {
                data[field.name] = fd.getAll(field.name);
            }

            if (field.required && (data[field.name] === null || data[field.name].length === 0)) {
                if (isSubmit || field.name === event.target.name) {
                    errMsg = field.label + " is a required field";
                    tempFormErrors[field.name] = errMsg;
                }
            }

            else if (field.required && field.minLength && (data[field.name] === null || data[field.name].length < field.minLength)) {
                if (isSubmit || field.name === event.target.name) {
                    errMsg = "Minimum length of " + field.label + " should be " + field.minLength;
                    tempFormErrors[field.name] = errMsg;
                }
            }

            else if (field.required && field.maxLength && (data[field.name] === null || data[field.name].length > field.maxLength)) {
                if (isSubmit || field.name === event.target.name) {
                    errMsg = "Maximum length of " + field.label + " can be " + field.maxLength;
                    tempFormErrors[field.name] = errMsg;
                }
            }
            else {
                delete tempFormErrors[field.name];
            }

        })
        setFormData({ ...data });
        setFormErrors({ ...tempFormErrors });
        console.log(formErrors);
        // event.target.reset();
    }

    function handleSubmit(event) {
        event.preventDefault();
        validateForm(event, true);
        if (JSON.stringify(formErrors) === "{}") {
            console.log("Form Submitted");
            console.log(formData);
            // event.target.submit();
        }
        else {
            console.log("Form has errors");
        }
    }

    return (
        <form onSubmit={handleSubmit} ref={form}>
            <h2>Webform</h2>
            {formFields.map((field, index) => {
                let fieldToRender;
                if (field.type === 'radio' || field.type === 'checkbox') {
                    fieldToRender = field.subValues.map((option) => {
                        return (
                            <>
                                <label>{option.label}</label>{/* htmlFor={`${field.name}-${option.value}`} */}
                                <input type={field.type} name={field.name} value={option.value} onBlur={validateForm} onKeyUp={clearErrorMessage} /> {/* id={`${field.name}-${option.value}`} */}
                            </>
                        )
                    })
                }
                else if (field.type === 'select') {
                    fieldToRender = <select id={field.name} name={field.name} onBlur={validateForm} onKeyUp={clearErrorMessage} >
                        {field.subValues.map((option) => {
                            return (
                                <option value={option.value}>{option.label}</option>
                            )
                        })}
                    </select>
                }
                else if (field.type === 'textarea') {
                    fieldToRender = <textarea name={field.name} onBlur={validateForm} onKeyUp={clearErrorMessage} ></textarea>
                }
                else {
                    fieldToRender = <input type={field.type} name={field.name} onBlur={validateForm} onKeyUp={clearErrorMessage} />
                }
                return (
                    <div className="control-row">
                        <div className="control no-margin">
                            <label htmlFor={field.name}>{field.label}</label>
                            {fieldToRender}
                        </div>
                        {
                            formErrors[field.name] &&
                            <div className="error-message">{formErrors[field.name]}</div>
                        }
                    </div>
                )
            })}
            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form>
    )
}