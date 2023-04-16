import React from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom'
const Card = (props) => {
  const navigate = useNavigate("")
  const id = props.id
  return (
    <div class="col-md-6 col-lg-4">
    <div class="card m-3">
      <img src={props.img} className='imgcard' onClick={() => navigate(`/Post-Details/${props.id}`)} />
      <div class="card-body">
        <p className='date'>{props.date}</p>
        <h3 class="card-title">{props.title.slice(0,15)}</h3>
        <p class="card-text">{props.des.slice(0, 20)}{
        }</p>
        <div className='mt-2 d-flex row justify-content-between'>
          <h5>Status</h5>
          {props.status === "Approved" && <h5 className='Approved'>Approved</h5>}
          {props.status === "Pending" && <h5 className='Pending'>Pending</h5>}
          {props.status === "Rejected" && <h5 className='Rejected'>Rejected</h5>}
        </div>
      </div>
    </div>
  </div>

  )
}

export default Card