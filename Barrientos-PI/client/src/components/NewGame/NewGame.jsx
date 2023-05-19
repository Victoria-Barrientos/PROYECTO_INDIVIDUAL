import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./NewGame.module.css";
import { newVideogameValidation } from "../../validations";
import { Card } from "../Card/Card";

export default function NewGame() {

    const URL_BASE = 'http://localhost:3001/videogames'

    const [form, setForm] = useState(
        {
        name: "",
        description: "",
        releaseDate: "",
        rating: 0,
        image: "",
        platforms: [],
        genres: []
        }
    );

    const [errors, setErrors] = useState(
        {}
    );

    const [newVideoGame, setNewVideoGame] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false)
  
    const handleChange = (event) => {
        const property = event.target.name;
        let value = event.target.value;
      
        if (event.target.multiple) {
          value = Array.from(
            event.target.selectedOptions,
            (option) => option.value
          );
        }
        setForm(
          {
          ...form,
          [property]: value,
          }
        );
        newVideogameValidation(property, value, errors, setErrors);
      };     

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
          setForm({
            name: "",
            description: "",
            releaseDate: "",
            rating: 0,
            image: "",
            platforms: [],
            genres: [],
          });
          setErrors({});
        }
        try {
          const { data } = await axios.post(`${URL_BASE}`, form, {
            headers: {
              "Content-Type": "application/json",
            }
          });
          setNewVideoGame(data.videoGame);
          setMessage(data.message);
        } catch (error) {
          setError('Video game couldn\'t be created. Please, complete the form before submitting');
        }
      };

      useEffect(() => {
        const isValid = (Object.keys(errors).length === Object.keys(form).length) && Object.values(errors).every((error) => error === "");
        setIsFormValid(isValid);
      }, [errors]);

      const handleCloseMessage = () => {
        setMessage("");
        setError("");
      };

    return (
        <div className={styles.newGameContainer}>
        <span>
            {message && (
                <p className={styles.successMessage}>{message}<button onClick={handleCloseMessage} className={styles.closeButton}>
                  X
                </button></p>
            )}
            {error && (
                  <p className={styles.errorMessage}>{error}<button onClick={handleCloseMessage} className={styles.closeButton}>
                    X
                  </button></p>
            )}
      </span>
          <h2>New Videogame</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formColumn}>

                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <div>{errors.name}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea type="text" name="description" value={form.description} onChange={handleChange}></textarea>
                    {errors.description && <div>{errors.description}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label>Image</label>
                    <input type="text" name="image" value={form.image} onChange={handleChange} />
                    {errors.image && <div>{errors.image}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label>Platforms</label>
                    <p>To select multiple, hold down the shift or ctrl key, then select with the mouse.</p>
                    <div className={styles.selectContainer}>
                        <select  name="platforms" multiple value={form.platforms}  className={styles.select} onChange={handleChange}>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                                <option value="Linux">Linux</option>
                                <option value="macOS">macOS</option>
                                <option value="PC">PC</option>
                                <option value="Nintendo Entertainment System">Nintendo Entertainment System</option>
                                <option value="Nintendo Switch">Nintendo Switch</option>
                                <option value="PlayStation 3">PlayStation 3</option>
                                <option value="PlayStation 4">PlayStation 4</option>
                                <option value="PlayStation 5">PlayStation 5</option>
                                <option value="PS Vita">PS Vita</option>
                                <option value="Web">Web</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Xbox One">Xbox One</option>
                                <option value="Xbox Series S/X">Xbox Series S/X</option>
                                <option value="Xbox 360">Xbox 360</option>
                        </select>
                    </div>
                    {errors.platforms && <div>{errors.platforms}</div>}
                </div>

            </div>

            <div className={styles.formColumn}>

                <div  className={styles.formGroup}>
                    <label>Release Date</label>
                    <input type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />
                    {errors.releaseDate && <div>{errors.releaseDate}</div>}
                </div>

                <div  className={styles.formGroup}>
                    <label>Rating</label>
                    <input type="range" min={0} max={5} step={1} name="rating" value={form.rating} onChange={handleChange} />
                    <span className={styles.ratingValue}>{form.rating}</span>
                    {errors.rating && <div>{errors.rating}</div>}
                </div>


                <div className={styles.formGroup}>
                    <label>Genres</label>
                    <p>To select multiple, hold down the shift or ctrl key, then select with the mouse.</p>
                    <div className={styles.selectContainer}>
                        <select name="genres" multiple value={form.genres} className={styles.select} onChange={handleChange}>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Arcade">Arcade</option>
                                <option value="Board Games">Board Games</option>
                                <option value="Card">Card</option>
                                <option value="Casual">Casual</option>
                                <option value="Educational">Educational</option>
                                <option value="Family">Family</option>
                                <option value="Fighting">Fighting</option>
                                <option value="Indie">Indie</option>
                                <option value="Massively Multiplayer">Massively Multiplayer</option>
                                <option value="Racing">Racing</option>
                                <option value="Platformer">Platformer</option>
                                <option value="Puzzle">Puzzle</option>
                                <option value="RPG">RPG</option>
                                <option value="Shooter">Shooter</option>
                                <option value="Simulation">Simulation</option>
                                <option value="Sports">Sports</option>
                                <option value="Strategy">Strategy</option>
                        </select>
                  </div>
                  {errors.genres && <div>{errors.genres}</div>}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.buttonContainer}>
                    <button className={`${styles.gameButton} ${isFormValid ? '' : styles.disabledButton}`} type="submit" disabled={!isFormValid}>Create</button>
                </div>
              </div>


            </div>
          </form>
        </div>
      );
}