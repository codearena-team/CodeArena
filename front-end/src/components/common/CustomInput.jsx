import './custom.css';
export default function CustomInput (probs) {

  return (
    <div class="container">
        <div className="inputs">
            <input onChange={(e)=>probs.setEmail(e.target.value)} type={probs.type} required /> 
            <label>{probs.label}</label>
        </div>
    </div>
  )
}