import {useEffect, useState} from "react";

const CountInput = (props) => {
  
  const [status, setStatus] = useState( false);
  const [value, setValue] = useState( +props.value);
  
  useEffect(() => {
     if (props.func) {
        setStatus(false);
     }
  }, [props.func]);
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <td onClick={() => {
      props.disableSubmitBtn(false);
      setStatus(true);
    }}>
      {status ? (
        <input
          type="number"
          name={`count_${props.name}`}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {if(e.which === 27){
             props.disableSubmitBtn(true);
             setStatus(false);
          }}}
        />
      ) : (
        <span>{props.value}</span>
      )}
    </td>
  );
};
export { CountInput };
