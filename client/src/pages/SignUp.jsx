import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

// definzione della funzione compnente signup
export default function SignUp() {
    // Utilizzo di useState per gestire lo stato dei campi del form
    const [formData, setFormData] = useState({});
    // Utilizzo di useState per gestire lo stato dell'errore
    const [errorMessage, setErrorMessage] = useState(null);
    // Utilizzo di useState per gestire lo stato di loading
    const [loading, setLoading] = useState(false);
    // init navigate per cambiare pagina quando submit è successfull line 46
    const navigate = useNavigate();
    // funzione per gestire il cambiamento dei valori nei campi del form
    const handleChange = (e) => {
        setFormData({
            ...formData,// spread operator ci  da possibilità di mantenere i dati dell form
            [e.target.id]: e.target.value.trim(),// qui aggingiamo i value nuovi della forma togliendo spazio bianco
        })
    };
    // handle submit button asyncronise per via di delay di mandare e ricevere data
    const handleSubmit = async (e) => {
        e.preventDefault(); //preventDefault x non ricaricare la pagina ogni volta
        if (!formData.username || !formData.password || !formData.email) {
            return setErrorMessage("Please fillout all required fields");
        }
        try {// try catch per gestione errore
            setLoading(true);
            // se abbiamo un error message nella richiesta precendete, qui viene cancellato
            setErrorMessage(null);
            //fetch api key,creare proxy dentro vite.config.js
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            //error message quando riceviamo errore da server, che precedentemente abbiamo scritto dentro index.js per i statuscodes, ci ritorna l'errore statuscode
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false); 
            // se non ci sono errori nella richiesta precedente, allora usiamo navigate hook per cambiare page
            if(res.ok) {
            navigate('/sign-in');
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return <div className='min-h-scree mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            {/* left */}
            <div className='flex-1'>
                <Link to="/" className='font-bold dark:text-white text-4xl'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Jawid's
                    </span>
                    Blog
                </Link>
                <p className='text-sm mt-5'>You can SignUp with your email and password or with your google account</p>
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
                        <Label value='Email: ' />
                        <TextInput
                            type='email'
                            placeholder='your email address'
                            id='email' onChange={handleChange} />
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
                                <Spinner size='sm'/>
                                <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign Up'
                            )}
                    </Button>
                    <OAuth/>
                </form>
                <span>
                    Do you have an account?
                </span>
                <Link to='/signin' className=' text-blue-500'>
                    Sign In
                </Link>
            </div>
            {// if errorMessage true then alert error message
                errorMessage && (
                    <Alert className='mt-5' color="failure">
                        {errorMessage}
                    </Alert>
                )
            }
        </div>
    </div>
}
