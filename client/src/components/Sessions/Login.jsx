import React, { useState } from 'react';
import Fire from '../../firebase';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Error handling for incorrect authentication
        Fire.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.error('Incorrect username or password');
            });

        // log inputted email and password
        console.log(`submitted email:
        ${email} password: ${password}`);
    }

    return (
        <div>
            <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        onChange = {
                            ({ target }) => 
                                setEmail(target.value)
                        }
                        placeholder="Email"
                    />
                    <br />
                    <input
                        type="password"
                        onChange={
                            ({ target }) =>
                                setPassword(target.value)
                        }
                        placeholder="Password"
                    />
                    <br />
                    <button type="submit">
                        Sign In
                    </button>
                </form>
        </div>
    )
};

export default Login