import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    })

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true);
            return false;
        }
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate("/");
        } else {
            alert("Please Enter Correct Log In Details");
        }
    }

    return (
        <>

            <div className="w-2/4 m-auto">
                <Card>
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email1"
                                    value="Your email"
                                />
                            </div>
                            <TextInput
                                placeholder="name@mail.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {error && !email && <span className="invalid-input"> Enter Valid Email </span>}
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && !password && <span className="invalid-input"> Enter Valid Password </span>}
                        <Button onClick={handleLogin}>
                            Login
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default Login;