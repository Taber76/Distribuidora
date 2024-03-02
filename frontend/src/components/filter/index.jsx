import { useState, useEffect } from 'react';

import { Modal } from '../modal';
import { apiService } from '../../services/apiService';

const Filter = ({ name, getRoute, searchField, liveFilter, preLoadedOptions, setFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [optionsList, setOptionsList] = useState([]);
  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  useEffect(() => {
    if (preLoadedOptions) {
      setOptionsList(preLoadedOptions);
      setSearchTerm(name);
    }
  }, [])


  const loadOptions = async () => {
    try {
      if (!preLoadedOptions) {
        const res = await apiService.get(getRoute);
        if (res.status === 202) {
          const data = await res.json();
          setOptionsList(data.users);
          setOptionsLoaded(true);
        } else {
          activeModal(`Error al cargar la lista de ${name}.`, 2500);
        }
      }
    } catch (error) {
      activeModal(`Error al cargar la lista de ${name}.`, 2500);
    }
  };

  const handleOptionFocus = () => {
    if (!optionsLoaded && liveFilter) {
      loadOptions();
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = optionsList.filter(option =>
    preLoadedOptions ? true : option[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = option => {
    setSearchTerm(option);
    setIsDropdownOpen(false);
    setFilter(option);
  };

  return (
    <div>

      {showModal && (
        <Modal
          text={modalText}
          width="300px"
          height="150px"
          color="blue"
          textColor="white"
          margin="0"
        />
      )}

      <input
        type="text"
        placeholder={name}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => {
          handleOptionFocus();
          setIsDropdownOpen(true);
        }}
        className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-semibold"
      />
      {isDropdownOpen && searchTerm && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1">
          {filteredOptions.map(option => (
            <li
              key={option._id}
              className="px-2 py-1 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionSelect(option[searchField])}
            >
              {option[searchField]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Filter };
