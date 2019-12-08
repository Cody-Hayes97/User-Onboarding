import React from "react";

const UserData = props => {
  return (
    <div>
      {props.userList.map(users => (
        <ul key={users.id}>
          <li>Name: {users.name}</li>
          <li>Email: {users.email}</li>
          <li>Password: {users.password}</li>
        </ul>
      ))}
    </div>
  );
};

export default UserData;
