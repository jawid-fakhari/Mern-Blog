import User from "../models/user.model.js";
//utilizzando il pacchetto bcryptjs per criptare la password prima di archiviarla nel database, assicurandosi che la password sia archiviata in modo sicuro e non sia esposta.
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// Il pacchetto jsonwebtoken (JWT) è utilizzato per generare e verificare i token JSON Web Token.
import jwt from "jsonwebtoken";

//Questa funzione gestisce il processo di registrazione dell'utente. Prende lo username, l'email e la password dal corpo della richiesta, convalida l'input, cripta la password utilizzando bcryptjs, crea un nuovo documento User nel database MongoDB, e restituisce un messaggio di successo al completamento della registrazione. Se si verifica un errore durante il processo, viene passato alla funzione middleware successiva.
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !"username" ||
    !"email" ||
    !"password" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  //usiamo npm i bcryptjs package per creare hashed password, cosi non nessuno può avere a disposizione il password ne anche admin.
  const hashedPassword = bcryptjs.hashSync(password, 10); // metodo per creare hashed password

  const newUser = new User({
    username,
    email,
    password: hashedPassword, // ora il password è un hashed password
  });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

//Questa funzione gestisce il processo di accesso dell'utente...
export const signin = async (req, res, next) => {
  //prende lo username e la password dal corpo della richiesta
  const { username, password } = req.body;
  //convalida l'input
  if (!username || !password || username === "" || password === "") {
    next(errorHandler(400, "All fields are required!"));
  }
  //recupera il documento utente dal database utilizzando lo username e restituisce un messaggio di successo al completamento dell'accesso.Se lo username o la password sono invalidi, viene restituito un messaggio di errore
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(400, "Invalid username")); // messaggio deve essere username or password invalid cosi hacker non puo concentrarsi solo su un fattore! ma qui per esercizio usiamo i propri.
    }
    //confronta la password criptata con la password di input utilizzando bcryptjs
    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return next(errorHandler(400, "Invalid password!"));
    }
    //crea un nuovo token utilizzando il metodo sign del pacchetto jsonwebtoken e viene criptata, che poi lo salviamo dentro i cookie del browser
    const token = jwt.sign(
      // Il payload: Si tratta di un oggetto che contiene l'identificatore univoco dell'utente (validUser._id). Il payload è incluso nel JWT e può essere accesso dal server per identificare l'utente.
      { id: validUser._id },
      //La chiave segreta: Si tratta di una stringa segreta utilizzata per firmare il JWT. In questo caso, la chiave segreta è archiviata nella variabile env dentro process.env.JWT_SECRET.
      process.env.JWT_SECRET_KEY,
      //Le opzioni: Si tratta di un oggetto che specifica il tempo di scadenza del JWT (expiresIn: "1h"). Il token scade dopo un'ora
      { expiresIn: "1h" }
    );
    //utilizzando destructuring assignment di JavaScript per creare un nuovo oggetto rest da validUser._doc, escludendo la proprietà password. Questa operazione viene eseguita utilizzando l'operatore di propagazione (...) e una proprietà nome-chiave calcolata (password: pass).
    const { password: pass, ...rest } = validUser._doc;

    //restituisce un messaggio di successo al completamento dell'accesso
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);

    // Se si verifica un errore durante il processo, viene passato alla funzione middleware successiva.
  } catch (error) {
    next(error);
  }
};
 
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.find({ email});
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password,...rest } = user._doc;
      res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(rest);
    } else {
      const gnereatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(gnereatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
        email,
        password:  hashedPassword,
        profilePicture : googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password,...rest } = newUser._doc;
      res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(rest);
    }
  } catch (error) {
    next(error);
  }
  }
