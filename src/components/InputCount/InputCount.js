import { useState } from "react";

const InputCount = (props) => {
  const [value, setValue] = useState(false);
  return (
    <td onClick={() => {
      props.disableSubmitBtn(false);
      setValue(true);
    }}>
      {value ? (
        <input
          type="text"
          name={`count_${props.name}`}
          placeholder={props.placeholder}
          onKeyDown={(e) => {if(e.which === 27){
             props.disableSubmitBtn(true);
             setValue(false);
          }}}
        />
      ) : (
        <span>{props.value}</span>
      )}
    </td>
  );
};

export { InputCount };