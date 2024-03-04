import { useEffect, useState } from 'react';
import { apiService } from '../../services/apiService';

const InputDropdown = ({
  className, type, placeholder, required,
  inputValue, setValue, apiUrl, jsonResponse,
  fieldName, index, listName
}) => {

  const [list, setList] = useState([]);
  const [inputValueChild, setInputValueChild] = useState(inputValue);

  useEffect(() => {
    setInputValueChild(inputValue)
  }, [inputValue])

  const handleChange = async (event) => {
    const { value } = event.target;
    setInputValueChild(value);
    setValue({ selectedElementOfList: { description: value }, index });
    if (value.length > 2 && list.length === 0) {
      const res = await apiService.get(apiUrl + value);
      if (res.status === 202) {
        const data = await res.json();
        setList(data[jsonResponse]);
      }
    } else if (value.length < 3) {
      setList([]);
    }
  }

  const handleSelect = (event) => {
    const selected = event.target.value;
    const selectedElementOfList = list.find(ele => ele[fieldName] === selected);
    if (selectedElementOfList) {
      setValue({ selectedElementOfList, index });
    }
    setList([]);
  }

  return (
    <div className="flex w-full">
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={inputValueChild}
        required={required}
        onChange={handleChange}
        onSelect={handleSelect}
        list={listName}
      />
      <datalist id={listName}>
        {list.map((ele) => (
          <option key={ele[fieldName]} value={ele[fieldName]} />
        ))}
      </datalist>
    </div>
  );
}

export { InputDropdown };
