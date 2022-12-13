import { errorPrefix } from '@firebase/util';
import {useState, useContext} from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password:'',
}

const SignInForm = () => {

const [formFields, setFormFields] = useState(defaultFormFields);
const {email, password} = formFields;


const resetFormFields = () => {
    setFormFields(defaultFormFields);
}

const signInWithGoogle =  async () => {
    await signInWithGooglePopup();
};
const handleSubmit = async (event) => {
    event.preventDefault();

    //check if user is authenicated and if so, create user document
    try {
        await signInAuthUserWithEmailAndPassword(email,password);
        resetFormFields();
    } catch (error) {
        switch(error.code){
            case 'auth/wrong-password' : 
                alert('Incorrect password for email');
                break
            case 'auth/user-not-found': 
                alert('No user associated with this email');
                break
            default:
                console.log(error)
        }
    }
} 


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type='email'
                    inputOptions= {{
                        type:'email',
                        required:true,
                        onChange:handleChange,
                        name:'email',
                        value:email,
                    }}
                />
                
                <FormInput
                    label="Password"
                    inputOptions= {{
                        type:'password',
                        required:true,
                        onChange:handleChange,
                        name:'password',
                        value:password,
                    }}
                />
                <div className="buttons-container">
                <Button type="submit"> Sign In </Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}> Google Sign In </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;

