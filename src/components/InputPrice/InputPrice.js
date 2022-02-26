import { useState } from "react";

const InputPrice = (props) => {
  const [value, setValue] = useState(false);
  return (
    <td onClick={() => {
      props.disableSubmitBtn(false);
      setValue(true);
    }}>
      {value ? (
        <input
          type="text"
          name={`price_${props.name}`}
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

export { InputPrice };
