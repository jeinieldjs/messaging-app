import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../contexts/SessionContext";
import ChatContext from '../contexts/ChatContext';
import  {MessageContext}  from '../contexts/MessageContext';
import ReactSelect, {components} from "react-select";

const baseURL = 'http://206.189.91.54/';

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

function CreateChannel(/*props*/{ channels, setChannels }) {
  const { session } = useContext(SessionContext);
  const [channel, setChannel] = useState({ channel_members: [] });
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([{ label: '', value: '' }]);
  const [optionSelected, setOptionSelected] = useState(null);
  const [userIds, setUserIds] = useState([]);
  const [user, setUser] = useState({ label: '', value: '' });
  const [showModal, setShowModal] = useState(false);
  const [errors,setErrors] = useState('');

  const newChannel = (event) => {
    event.preventDefault();

    if (channelName.length > 15) {
      alert("Channel name exceeds 15 characters");
      return; 
    }

    const endpoint = `${baseURL}api/v1/channels`;
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
      'access-token': session.accessToken,
      'client': session.client,
      'expiry': session.expiry,
      'uid': session.uid,
    };

    const body = JSON.stringify({ name: channelName, user_ids: userIds });

    fetch(endpoint, { method, headers, body })
    .then((response) => {
      if (response.status === 200) {
        alert('Channel created successfully.');
        return response.json();
      } else {
        //console.log('Failed to create channel. Status:', response.status);
        //return response.json().then((errorData) => {
          //throw new Error(errorData.message || 'Unknown error');
          response.json().then(data =>{
            setErrors(data.errors.join('. '));
        });
      }
    })
    .then((data) => {
      //const newChannels = [...channels];
      //newChannels.push(data);
      //setChannels(newChannels);
      console.log(data);
      setChannels((prevChannels) => [...prevChannels, data]);
    })
    .catch((error) => {
      console.log(error);
      alert(error[0]); //still not working...

    });

  setShowModal(false);
};

  const fetchUsers = async () => {
    const endpoint = `${baseURL}api/v1/users`;
    const method = 'GET';
    const headers = {
      'Content-Type': 'application/json',
      'access-token': session.accessToken,
      'client': session.client,
      'expiry': session.expiry,
      'uid': session.uid,
    };

    await fetch(endpoint, { method, headers })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((result) => {
        const data = result.data.map((user) => ({
          value: user.id,
          label: user.email,
        }));
        setUsers(data.sort((a, b) => { return a.label < b.label ? -1 : 1; }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleChange = (selected) => {
    setOptionSelected(selected);
    setUserIds(selected.map((data) => data.value));
  };

  return (
    <>
    <div id='add-channel-line'>
      <button 
        className='add-channel-btn'
        onClick={toggleModal}
      >
      <i className='fas fa-plus-square' style={{color: '#0c0e0c'}}></i>
      Add Channel
      </button>
    </div>
    {showModal && (
      <div className='modal-overlay'>
        <div className='channel-modal'>
          <div className='modal-header'>
            <h3 className='modal-label'>
              Create New Channel
            </h3>
            <button
              className='close-modal'
              onClick={toggleModal}
            >X</button>
          </div>
          {errors ? <p className="error-line" style={{color:'dark gray', fontSize:'0.7rem', textAlign:'center'}}><i>{errors}</i></p> : null}
          <div className="modal-content">
            <label className='modal-labels'>Channel Name</label>
            <input
              type="text"
              className="channel-name-input"
              onChange={(e) => setChannelName(e.target.value)}
              placeholder='Name must not exceed 15 characters'
            ></input>
          </div>
          <div className="channel-member-select">
            <label className='modal-labels'>Add Members</label>
              <ReactSelect
                options={users.filter((user) =>
                    !channel.channel_members.some((member) => member.user_id === user.value)
                )}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{Option}}
                onChange={handleChange}
                value={optionSelected}
                styles={customStyles}
              />
          </div>
          <div className='modal-bottom'>
            <button
              className='create-button'
              onClick={newChannel}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

const fetchChannels = (setChannels, session) => {
  const endpoint = `${baseURL}api/v1/channels`;
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
    'access-token': session.accessToken,
    'client': session.client,
    'expiry': session.expiry,
    'uid': session.uid,
  };

  fetch(endpoint, { method, headers })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((result) => {
      setChannels(result.data);
      //console.log(result);
    })
    .catch((error) => {
      console.log(`Error:${error}`);
    });
};

export const ChannelDisplay = (props) => {
  const { session } = useContext(SessionContext);
  const { channels, setChannels } = props;
  const { setMessages } = useContext(MessageContext);
  const { chat, setChat } = useContext(ChatContext); 
  //const formatChannelName = (name) => name.replace(/ /g, '-');
  /*const formatChannelName = (name) => {
    let formattedName = '';
    
    for (let i = 0; i < name.length; i++) {
      if (name[i] === ' ') {
        formattedName += '-';
      } else {
        formattedName += name[i];
      }
    }
    
    return formattedName;
  };---error: cannot read length*/
  

  const selectChannel = (event) => {
    setChat({
      id: event.target.getAttribute('data-id'),
      name: event.target.getAttribute('data-name'),
      type: event.target.getAttribute('data-type'),
    });
  };

  useEffect(() => {
    fetchChannels(setChannels, session);

    if (!chat && channels && channels.length > 0) {
      setChat({
        id: channels[0].id,
        name: channels[0].name,
        type: 'Channel',
      });
    }
  }, [channels]);

  useEffect(() => {
    fetchChannels(setChannels, session);
  }, []);
  //console.log(channels);

  return (
    <div className='channel-list'>
     <ul>
    {channels && [...channels] 
        .sort((a, b) => {
          const nameA = a.name ? a.name.toUpperCase() : "";
          const nameB = b.name ? b.name.toUpperCase() : "";
          return nameA.localeCompare(nameB);
        })
        .map((channel) => (
          <li key={"channel_" + channel.id}>
            <a
              href='#'
              data-id={channel.id}
              data-name={channel.name}
              data-type={'Channel'}
              onClick={selectChannel}
            >
              # {channel.name}
            </a>
          </li>
        ))}
  </ul>
    </div>
  );
};

export default CreateChannel;