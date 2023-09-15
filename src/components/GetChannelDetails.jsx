import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../contexts/SessionContext";
import ChatContext from '../contexts/ChatContext';
import ReactSelect, { components } from "react-select";

const baseURL = 'http://206.189.91.54/';

const fetchChannelData = async (session, chatId, setChannel) => {
  const endpoint = `${baseURL}api/v1/channels/${chatId}`;
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
    'access-token': session.accessToken,
    'client': session.client,
    'expiry': session.expiry,
    'uid': session.uid,
  };

  const response = await fetch(endpoint, { method, headers });
  const result = await response.json();
  setChannel(result.data);
};

const fetchUserData = async (session, setUsers) => {
  const endpoint = `${baseURL}api/v1/users`;
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
    'access-token': session.accessToken,
    'client': session.client,
    'expiry': session.expiry,
    'uid': session.uid,
  };

  const response = await fetch(endpoint, { method, headers });
  const result = await response.json();
  const data = result.data.map((user) => ({
    value: user.id,
    label: user.email,
  }));
  setUsers(data.sort((a, b) => { return a.label < b.label ? -1 : 1; }));
};

const addUser = async (session, chatId, selectedUserId, fetchChannelData) => {
  const endpoint = `${baseURL}api/v1/channel/add_member`;
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
    'access-token': session.accessToken,
    'client': session.client,
    'expiry': session.expiry,
    'uid': session.uid,
  };
  const body = JSON.stringify({
      id: chatId,
      member_id: selectedUserId
  });

  const response = await fetch(endpoint, { method, headers, body });
  const result = await response.json();
  
  await fetchChannelData();
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#d8323c" : provided.borderColor,
    boxShadow: state.isFocused ? `0 0 0 2px #d8323c` : provided.boxShadow,
    "&:hover": {
      borderColor: "black",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#d8323d67" : provided.backgroundColor,
    color: state.isFocused ? "black" : provided.color,
    "&:hover": {
      backgroundColor: "#d8323d67",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#d8323d67" : provided.backgroundColor,
    color: state.isFocused ? "black" : provided.color,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#d8323c',
  }),
};

export default function ChannelDetails() {
  const { session } = useContext(SessionContext);
  const { chat } = useContext(ChatContext);
  const [channel, setChannel] = useState({ channel_members: [] });
  const [users, setUsers] = useState([{ label: '', value: '' }]);
  const [optionSelected, setOptionSelected] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false); 



  useEffect(() => {
    async function fetchData() {
      await fetchChannelData(session, chat.id, setChannel);
      await fetchUserData(session, setUsers);
    }

    fetchData();
  }, [session, chat]);

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const handleChange = (selected) => {
    setSelectedUserId(selected.value);
    setOptionSelected(selected);
  };

  const handleAddUser = () => {
    addUser(session, chat.id, selectedUserId, () => {
      fetchChannelData(session, chat.id, setChannel);
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal); 
  };

  return (
    <>
      <div id='channel-details-container'>
      <button 
        className='show-details-btn'
        onClick={toggleModal}>
          <div className='i-wrapper'>i</div>
      </button>
    </div>
    {showModal && (
      <div className='modal-overlay'>
        <div className='add-member-modal'>
          <div className='modal-header'>
            <h2 style={{textTransform:'uppercase'}}>
              Channel Details
            </h2>
            <button
              className='close-modal'
              onClick={toggleModal}
            >X</button>
          </div>
          <div className="channel-member-select">
            {channel && channel.channel_members ?
              <ReactSelect
                options={users.filter(user => !channel.channel_members.some((member) => member.user_id === user.value))}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{Option}}
                onChange={handleChange}
                value={optionSelected}
                styles= {customStyles}
                className='add-new-member'
              /> : null}
          </div>
          <div className='modal-bottom'>
            <button
              className='create-button'
              onClick={handleAddUser}>
              Add Member
            </button>
          </div>
          <div className='member-container'>
            <h3 style={{textAlign:'left'}}>Channel Members: </h3>
            <ul className='member-list'>
              {channel && channel.channel_members
        .map((member) => {
          const user = users.find((user) => user.value === member.user_id);
          return { user, member }; 
        })
        .sort((a, b) => {
          const nameA = a.user && a.user.label ? a.user.label.toUpperCase() : "";
          const nameB = b.user && b.user.label ? b.user.label.toUpperCase() : "";
          return nameA.localeCompare(nameB);
        })
        .map((sortedMember) => (
          <li key={sortedMember.member.user_id}>
            {sortedMember.user && sortedMember.user.label}
          </li>
        ))}
           </ul>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
