import React, { useState, useEffect } from 'react'
import axios from "axios"
import * as yup from "yup"
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Label, Form, Input, FormGroup } from 'reactstrap'



const formSchema = yup.object().shape({
    name: yup.string()
        .required("I would like to know your name, not creepy though"),
    email: yup
        .string()
        .email("Please enter a valid email c'mon cman")
        .required("Yeah... don't forget your email"),
    password: yup
        .string()
        .required("Oops, this is a required field!")
        .min(3, "need more than 3 character and we're good"),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to terms of use"),

})



const UserForm = (props) => {

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
    });



    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState)
            .then(valid => {
                setButtonDisabled(!valid);
            })
    }, [formState])


    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
    });


    const handleSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost([...post, res.data]);
                console.log("success", post)

                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: "",

                });
            })
            .catch(err => console.log(err.response))
    }

    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            });
    };
    const handleChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked
                    : event.target.value
        }

        setFormState(newFormData);
        validateChange(event);


    };
    console.log(errors)
    return (


        <Form onSubmit={handleSubmit}>

            <FormGroup>
                <Label htmlFor="name" >
                    {errors.name.length > 0 ? <h6 className="error">
                        {errors.name}</h6> : null}
                        Username:&nbsp;
                <Input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                    />
                </Label>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="email">
                    Email:&nbsp;
                <Input
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    {errors.email.length > 0 ? (
                        <p className="error">{errors.email}</p>
                    ) : null}
                </Label>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="password">
                    Password:&nbsp;
                <Input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    {errors.password.length > 0 ? (
                        <p className="error">{errors.password}</p>
                    ) : null}
                </Label>
            </FormGroup>

            <FormGroup check>
                <Label check htmlFor="terms">

                    <Input
                        type="checkbox"
                        name="terms"
                        checked={formState.terms}
                        onChange={handleChange}
                    />{' '}
                    {errors.terms = false ? (
                        <p className="error">{errors.terms}</p>
                    ) : null}
                        Terms & Conditon
                    </Label>
            </FormGroup><br />

            <FormGroup>
                <Button disabled={buttonDisabled}>Submit</Button>
            </FormGroup>


            <div>{JSON.stringify(post, null)}</div>

        </Form>




    )
}


export default UserForm;




