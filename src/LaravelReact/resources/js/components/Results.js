import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

const limit_num = 10;

function Results({
    url,
    results,
    setResults,
    start,
    setStart
}) {



    const handlePagenate = (param) => {
        setStart(start+param)
        axios.get(url+"&start="+start)
        .then(response =>{
            setResults(response.data.items)
            console.log(response)
        }).catch(() => console.log("request failed"))
        
    }

    useEffect(() => {},[results])
   

    return (
        
                    <div className="">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">No</th>
                                <th scope="col">#</th>
                                <th scope="col">タイトル</th>
                                <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((item, index) =>{
                                    return(
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td><img style={{width: "200px"}} src={item.pagemap.cse_image ? item.pagemap.cse_image[0].src : ""} /></td>
                                            <td><a href={item.link}>{item.title}</a></td>
                                            <td>{item.snippet}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table> 
                        {results.length > 0 ? 
                        <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a 
                                            className="page-link" 
                                            href="#" 
                                            aria-label="Previous"
                                            onClick={()=>handlePagenate(-limit_num)}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">{start-limit_num+1}~{start}件目</a></li>
                                    <li className="page-item">
                                        <a 
                                            className="page-link"
                                            href="#"
                                            aria-label="Next"
                                            onClick={()=>handlePagenate(limit_num)}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                        </nav>
                        :
                        <></>
                        }

                    </div>
   

    );
}

export default Results;
