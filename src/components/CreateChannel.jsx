import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../contexts/SessionContext";
import ChatContext from '../contexts/ChatContext';
import { MessageContext } from '../contexts/MessageContext';
import ReactSelect, { components } from "react-select";

function CreateChannel(props) {
  const { session } = useContext(SessionContext);
  const [channel, setChannel] = useState({ channel_members: [] });
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([{ label: '', value: '' }]);
  const [optionSelected, setOptionSelected] = useState(null);
  const [userIds, setUserIds] = useState([]);
  const [user, setUser] = useState({ label: '', value: '' });
  const [showModal, setShowModal] = useState(false);
  const { channels, setChannels, fetchChannels } = props;

  const newChannel = (event) => {
    event.preventDefault();
    const endpoint = 'http://206.189.91.54/api/v1/channels';
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
          return response.json();
        } else {
          console.log('failed');
        }
      })
      .then((data) => {
        const newChannels = [...channels];
        newChannels.push(data);
        setChannels(newChannels);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowModal(false);
  };

  const fetchUsers = async () => {
    const endpoint = 'http://206.189.91.54/api/v1/users';
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
      <i className='fas fa-plus-square' style={{color: '#eaebea'}}></i>
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
          <div className="modal-content">
            <label className='modal-labels'>Channel Name</label>
            <input
              type="text"
              className="channel-name-input"
              onChange={(e) => setChannelName(e.target.value)}
            ></input>
          </div>
          <div className="channel-member-select">
            <label className='modal-labels'>Add Members</label>
              <ReactSelect
                options={users.filter(
                  (user) =>
                    !channel.channel_members.some(
                      (member) => member.user_id === user.value
                    )
                )}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                onChange={handleChange}
                value={optionSelected}
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
}

export default CreateChannel;
