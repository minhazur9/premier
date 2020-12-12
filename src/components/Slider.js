import React from 'react';
import 'materialize-css/dist/js/materialize.min.js';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import axios from 'axios'

class Slider extends React.Component {
  state = {
    movies: [ {backdrop_path: ''},{backdrop_path: ''},{backdrop_path: ''},{backdrop_path: ''}],
    shows: [ {backdrop_path: ''},{backdrop_path: ''},{backdrop_path: ''},{backdrop_path: ''}]
  }

  initSlider = () => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.slider');
      M.Slider.init(elems, {});
    });
  }

  getRandomShows = () => {
    const key = '47b253083f612b83066bfaf81a01e411'
        const randomPage = Math.floor((Math.random() * 500) + 1)
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=${randomPage}`)
        .then((response) =>  {
          console.log(response.data.results);
          this.setState({shows:response.data.results})
        })
  }

  componentDidMount() {
    this.initSlider();
    const key = '47b253083f612b83066bfaf81a01e411'
        const randomPage = Math.floor((Math.random() * 70) + 1)
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${randomPage}`)
        .then((response) =>  {
          this.setState({movies:response.data.results})
        })
    .then(this.getRandomShows())
  }
      render() {
          return (
              <>
                  <div className="slider">
    <ul className="slides">
      <li>
        <Link to={`/movies/${this.state.movies[0].id}`}><img src={`https://image.tmdb.org/t/p/original${this.state.movies[0].backdrop_path}`}  alt="pic1"/></Link>
        <div className="caption center-align">
          <h3 className='caption-title'>{this.state.movies[0].title}</h3>
        </div>
      </li>
      <li>
        <Link to={`/movies/${this.state.shows[0].id}`}><img src={`https://image.tmdb.org/t/p/original${this.state.shows[0].backdrop_path}`}  alt="pic2"/></Link>
        <div className="caption left-align">
          <h3 className='caption-title'>{this.state.shows[0].name}</h3>
        </div>
      </li>
      <li>
      <Link to={`/movies/${this.state.movies[1].id}`}><img src={`https://image.tmdb.org/t/p/original${this.state.movies[1].backdrop_path}`}  alt="pic3"/></Link> 
        <div className="caption right-align">
          <h3 className='caption-title'>{this.state.movies[1].title}</h3>
        </div>
      </li>
      <li>
      <Link to={`/movies/${this.state.shows[1].id}`}><img src={`https://image.tmdb.org/t/p/original${this.state.shows[1].backdrop_path}`}  alt="pic4"/></Link> 
        <div className="caption center-align">
          <h3 className='caption-title'>{this.state.shows[1].name}</h3>
        </div>
      </li>
    </ul>
  </div>
              </>
          )
      }
}

export default Slider;