import axios from "axios";

function post(){
    await fetch('../api/login',{
        method: 'GET',
        // body: JSON.stringify(body),
        headers:{
                'Access': 'application/json'
                },
    })

    return(
        <ul class="list-group">
            <li class="list-group-item">
                <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" checked/>
                <label class="form-check-label" for="firstRadio">First radio</label>
            </li>
        </ul>
    )
}
export default post;