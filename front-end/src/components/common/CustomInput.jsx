import '../css/custom.css';
export default function CustomInput (probs) {

  return (
    <div class="container">
        <div className="inputs">
            <input type={probs.type} value={probs.value} required /> 
            <label>{probs.label}</label>
        </div>
    </div>
  )
}