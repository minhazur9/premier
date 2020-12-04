import React from 'react'
import axios from 'axios'
import ShowCard from '../../components/shows/ShowCard'
import {Link} from 'react-router-dom'

class ShowIndex extends React.Component {
    state = {
        shows: [],
        loading: true,
        page: 1,
        catagory: 'airing_today',
        header: 'Now Playing'
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
                <ShowCard  voteAverage={show.vote_average} key={show.id} id={show.id} title={show.name} image={`${imagePath}${show.poster_path}`}/>   
            )     
        })
    }

    handlePrevShowPage = () => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page - 1;
        const catagory = this.state.catagory;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/tv/${catagory}?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({shows: response.data.results, loading: false}))
    }

    handleNextShowPage = () => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page + 1;
        const catagory = this.state.catagory;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/tv/${catagory}?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({shows: response.data.results, loading: false}))
    }


    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        const catagory = this.state.catagory;
        axios.get(`https://api.themoviedb.org/3/tv/${catagory}?api_key=${key}&language=en-US&page=1`)
            .then((response) => {
                this.setState({shows: response.data.results, loading: false})
            })
    }

    renderPopular = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'popular', shows: response.data.results, header:'Popular'}) )
    }

    renderNowPlaying = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'top_rated', shows: response.data.results, header:'Top Rated'}) )
    }

    renderToday = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'now_playing', shows: response.data.results, header:'Now Playing'}) )
    }

    renderUpcoming = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'on_the_air', shows: response.data.results, header:'Upcoming'}) )
    }

    render() {
        return(
        <>
        <h1>{this.state.header}</h1>
        <aside className='nav-wrapper #03a9f4 light-blue movie-nav '>
            <ul>
                <li className='catagory-item'><Link to='#' key={1} onClick={this.renderToday} className='catagory-link' >Now Playing</Link></li>
                <li className='catagory-item'><Link to='#' key={2} onClick={this.renderPopular} className='catagory-link' >Popular</Link></li>
                <li className='catagory-item'><Link to='#' key={3} onClick={this.renderNowPlaying} className='catagory-link' >Top Rated</Link></li>
                <li className='catagory-item'><Link to='#' key={4} onClick={this.renderUpcoming} className='catagory-link' >Upcoming</Link></li>
            </ul>
    </aside>
        <ul className="movie-list">
            {this.state.loading ? this.renderLoadingIcon() : this.renderShowCards()}
            {this.state.page < 500 &&
            <Link to="#" onClick={this.handleNextShowPage}><i className="fas fa-arrow-circle-right fa-4x"></i></Link> }
            {this.state.page > 1 &&
            <Link to="#" onClick={this.handlePrevShowPage}><i className="fas fa-arrow-circle-left fa-4x"></i></Link> }
    </ul>
        </>
        )
    }
}

export default ShowIndex;