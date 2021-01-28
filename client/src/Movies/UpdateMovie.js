import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useHistory, useParams } from 'react-router-dom'

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: null,
    stars: [],
}
export default function UpdateMovie(props) {
    const {push} = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams();

    useEffect(()=>{
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res=>{
            setMovie(res.data);
            console.log(res.data)
          })
          .catch(err=>{
            console.log(err);
          });
      }, []);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then( res => {
                console.log(res.data)
                props.setMovieList(
                    props.movieList.map((item) => {
                        if (item.id === res.data.id){
                            return res.data
                        }
                        else{
                            return item
                        }
                    })
                )
                setMovie(initialMovie)
                push(`/movies/${movie.id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <form onSubmit = {handleSubmit}>
               <input
                type="string"
                name="title"
                onChange={handleChange}
                placeholder="Title..."
                value={movie.title}/>

               <input
                type="string"
                name="director"
                onChange={handleChange}
                placeholder="Director..."
                value={movie.director}/>

                <input 
                 type="number"
                 name="metascore"
                 onChange={handleChange}
                 placeholder="metascore"
                 value={movie.metascore}/>

                {/* <input
                 type="text"
                 name="stars"
                 onChange={handleChange}
                 placeholder="Actors..."
                 value={movie.stars}/> */}
                 <button>Update Movie</button>
            </form>
        </div>
    )
}
