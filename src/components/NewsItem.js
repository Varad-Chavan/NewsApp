import React from 'react'
import './NewsItem.css'

const NewsItem =(props)=> {
 
    let {title,description,imageUrl,newsUrl,author,publishedAt} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-white">{description}</p>
            <p className="card-text text-white"><small className="text-white">By {author?author:"unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} target ='blank'className="btn sm btn-dark text-white">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
