import React from 'react'
import axios from 'axios'
import MovieNav from '../../components/movies/MovieNav'
import ShowCard from '../../components/shows/ShowCard'
import {Link} from 'react-router-dom'

class ShowIndex extends React.Component {
    state = {
        shows: [],
        loading: true,
        page: 1
    }

    // Render Loading Icon
    renderLoadingIcon() {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    // Render Show Cards
    renderShowCards() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return this.state.shows.map((show) => {
            return (
                <ShowCard key={show.id} id={show.id} title={show.name} image={`${imagePath}${show.poster_path}`}/>   
            )     
        })
    }

    handlePrevShowPage = () => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page - 1;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({shows: response.data.results, loading: false}))
    }

    handleNextShowPage = () => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page + 1;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({shows: response.data.results, loading: false}))
    }


    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`)
            .then((response) => {
                this.setState({shows: response.data.results, loading: false})
            })
    }

    render() {
        return(
        <>
        <h1>All Shows</h1>
        <MovieNav/>
        <ul className="movie-list">
            {this.state.loading ? this.renderLoadingIcon() : this.renderShowCards()}
            {this.state.page < 500 &&
            <Link to="#" onClick={this.handleNextShowPage}><i class="fas fa-arrow-circle-right fa-4x"></i></Link> }
            {this.state.page > 1 &&
            <Link to="#" onClick={this.handlePrevShowPage}><i class="fas fa-arrow-circle-left fa-4x"></i></Link> }
    </ul>
        </>
        )
    }
}

export default ShowIndex;