import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Results from './results.js';


function App() {

    const [word, setWord] = useState("");
    const [start, setStart] = useState(1);
    const [results, setResults] = useState([]);
    const key = process.env.MIX_APP_SEARCH_API_KEY;
    const cse = process.env.MIX_APP_CSE;
  
    const url = "https://www.googleapis.com/customsearch/v1?key="+key+"&cx="+cse+"&q="+String(word)

    const search = (e) => {
        if(word == ""){
            alert("検索ワードを入力してください")
            return false
        }
        e.preventDefault()
        console.log(start)
        axios.get(url+"&start="+start)
        .then(response =>{
            console.log(start)
            setResults(response.data.items)
            console.log(response)
            setStart(response.data.items.length)
        }).catch(() => console.log("request failed"))
    }

    return (
        <div className="container">
            <a href=""></a>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card m2">
                        <div className="card-header">Google</div>
                        
                        <div className="row justify-content-center p-2">
                            
                            <form action="" onSubmit={(e)=>search(e)}>
                                <div className="mb-3 p-2">
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        value={word} 
                                        placeholder="検索したいワードを入力してください"
                                        onChange={(e)=>setWord(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-primary" type="submit">検索</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="container mx-2">
                        <Results 
                        url={url}
                        results={results}
                        setResults={setResults}
                        start={start}
                        setStart={setStart}
                        />
                           
                    </div>
   

                </div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
