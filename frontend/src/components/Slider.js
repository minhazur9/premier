import React from 'react';
import 'materialize-css/dist/js/materialize.min.js';
import M from 'materialize-css';
import {Link} from 'react-router-dom';

class Slider extends React.Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.slider');
      var instances = M.Slider.init(elems, {});
    });
  }
      render() {
          return (
              <>
                  <div className="slider">
    <ul className="slides">
      <li>
        <Link to="/shows/82856"><img src={`https://image.tmdb.org/t/p/original/9ijMGlJKqcslswWUzTEwScm82Gs.jpg`}/></Link>
        <div className="caption center-align">
          <h3 className='caption-title'>The Mandalorian</h3>
        </div>
      </li>
      <li>
        <Link to="movies/337401"><img src="https://image.tmdb.org/t/p/original/qAKvUu2FSaDlnqznY4VOp5PmjIF.jpg"/></Link>
        <div className="caption left-align">
          <h3 className='caption-title'>Mulan</h3>
        </div>
      </li>
      <li>
      <Link to="shows/71712"><img src="https://image.tmdb.org/t/p/original/iDbIEpCM9nhoayUDTwqFL1iVwzb.jpg"/></Link> 
        <div className="caption right-align">
          <h3 className='caption-title'>The Good Doctor</h3>
        </div>
      </li>
      <li>
      <Link to="movies/475557"><img src="https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg"/></Link> 
        <div className="caption center-align">
          <h3 className='caption-title'>Joker</h3>
        </div>
      </li>
    </ul>
  </div>
              </>
          )
      }
}

export default Slider;