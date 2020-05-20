import React from 'react'
import axios from 'axios'
import * as yup from 'yup'

function Form() {
    return (
        <div>
            <form>
                <h2>List of Users</h2>
                <label>Username:&nbsp;
                <input
                        // value='value.name'
                        onChange='onInputChange'
                        name='username'
                        type='text'
                    ></input>
                </label>
                <label>Email:&nbsp;
                    <input
                        type="text"
                        onChange='onInputChange'
                        name='email'
                    // value='value.email'
                    />
                </label>
                <label>Password:&nbsp;
                    <input
                        type="password"
                        onChange='oninputChange'
                        name='password'
                    // value='value.password'
                    />
                </label>
                <label>Terms &amp; Condition:&nbsp;
                    <input
                        type="checkbox"
                        onChange='onCheckboxChange'
                        name='password'
                    />
                    <button>Submit</button>
                </label>

            </form>
        </div>
    )
}

export default Form
