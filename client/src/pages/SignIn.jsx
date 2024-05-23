//imortazione di componenti necessar da flowbite-react e react
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFail } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

// definzione della funzione compnente SingIn
export default function SingIn() {
    // Utilizzo di useState per gestire lo stato dei campi del form
    const [formData, setFormData] = useState({});
    // Utilizzo di useState per gestire lo stato dell'errore
    // const [errorMessage, setErrorMessage] = useState(null);
    // Utilizzo di useState per gestire lo stato di loading
    // const [loading, setLoading] = useState(false);

    const {loading, error: errorMessage} = useSelector(state => state.user)

    const dispatch = useDispatch();
    
    // Ottenimento dell'oggetto navigate da useNavigate line 52
    const navigate = useNavigate();
 
    // Funzione per gestire il cambiamento dei valori nei campi del form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        })
    };
    
    // Funzione per gestire submit del form
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Controllo se i campi username e password sono compilati
        if (!formData.username || !formData.password) {
            return dispatch(signInFail("Please fill all fields"))
        }
        try {
            dispatch(signInStart())
            // Richiesta POST all'API per effettuare il login
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            // Controllo se la richiesta è fallita
            if (data.success === false) {
                dispatch(signInFail(data.message));
            }
            
            // Se la richiesta è riuscita, reindirizzamento alla home
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFail(error.message));
        }
    };

    // Renderizzazione del componente
    return <div className='min-h-scree mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            {/* left */}
            <div className='flex-1'>
                <Link to="/" className='font-bold dark:text-white text-4xl'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Jawid's
                    </span>
                    Blog
                </Link>
                <p className='text-sm mt-5'>You can SingIn with your username and password or with your google account</p>
            </div>
            {/* right */}
            <div className='flex-1'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <Label value='Username: ' />
                        <TextInput
                            type='text'
                            placeholder='your username'
                            id='username' onChange={handleChange} />
                    </div>

                    <div>
                        <Label value='password: ' />
                        <TextInput
                            type='Password'
                            placeholder='your password'
                            id='password' onChange={handleChange} />
                    </div>
                    <Button className='w-full mt-5' gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                        {
                            loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign in'
                            )}
                    </Button>
                    <OAuth/>
                </form>
                <span>
                    Don't you have an account?
                </span>
                <Link to='/signup' className=' text-blue-500'>
                    Sign Up
                </Link>
            </div>
            {
                errorMessage && (
                    <Alert className='mt-5' color="failure">
                        {errorMessage}
                    </Alert>
                )
            }
        </div>
    </div>
}
