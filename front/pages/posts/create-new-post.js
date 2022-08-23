import axios from "axios";

function post({data}){
    
    function pageView(id){

        data.map(posts =>
            {
                if(posts.id === id){

                    return(
                    <>
                        {posts.pages?.map(pages =>{
                        {return (
                            <>
                            {pages.page_title}<br/>
                            </>
                            )}
                        }
                        )}<br/>
                    </>
                    )
                }else return null
            }
          )
    }
    return(
                    
               <>
          {data.map(posts =>
            {return(
                <div className="treeview w-20 border">

                    <ul className="list-group">
                        <li className="list-group-item">
                            <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" checked pageView/>
                            <label className="form-check-label" htmlFor="firstRadio">

                            {posts.post_title}

                            </label>
                        </li>
                    </ul>
                </div>
              )})}

                </> 
    )
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:8000/api/get-posts/`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
  

export default post;