export default function Button (props) {
    return (
      <div> 
        <button className="btn btn-neutral w-full rounded-full">{props.name}</button>
      </div>
    )
  }