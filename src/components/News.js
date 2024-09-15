import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import './News.css'

const News =(props)=> 
{
  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(false)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)
  
  //sskender api
  const updatenews=async()=>
  {
    setLoading(true)
    props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bc634538c11247138f66720fdc8a89be&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData= await data.json()
    props.setProgress(50)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(()=>{
    updatenews()
    //eslint-disable-next-line
  },[])
  const handleNext= async()=>{   
      // this.setState({
      //   loading:true
      // })
      // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page+1}&pageSize=${props.pageSize}`
      // let data = await fetch(url);
      // let parsedData= await data.json()
      // this.setState({
      //   page:this.state.page+1,
      //   articles:parsedData.articles,
      //   loading:false
      // })
      setPage(page+1)
      updatenews()
    
  }        
  const handlePrev= async()=>{
    // this.setState({
    //   loading:true
    // })
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page-1}&pageSize=${props.pageSize}`
    // let data = await fetch(url);
    // let parsedData= await data.json()
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    setPage(page-1)
    updatenews()
  }      
  const capitalizeFirstLetter=(str)=> {
    if (typeof str !== 'string' || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
    return (
      <div className='container-fluid my-3'>
        <h2 style={{marginTop:'90px'}}>{`Top Headline - ${capitalizeFirstLetter(props.category)}`}</h2>
      {loading && <Spinner/>}
        <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.urlToImage}>
            <NewsItem  author={element.author} publishedAt={element.publishedAt} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div> 
          })}  
        </div>
        <div className="container-fluid d-flex justify-content-between">
          <button disabled={page<=1}type="button" className="btn btn-dark" onClick={handlePrev}> &larr; Previous</button>
          <button disabled={(page+1>Math.ceil(totalResults/20))}type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>
      </div>
    ) 
}
News.defaultProps={
  country:'us',
  category:'entertainment',
  pageSize:5
}
News.propTypes={
  country:PropTypes.string,
  category:PropTypes.string,
  pageSzie:PropTypes.number,
}
export default News 