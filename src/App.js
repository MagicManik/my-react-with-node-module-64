import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // ___________ load Data in own server _____________
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])




  // ___________ post Data in my own server ____________
  const handleFormSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    // console.log(name, email);
    const user = { name, email };

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
  }

  return (
    <div className="App">


      {/* __________ post Data in my own server _________ */}
      <h1 style={{ color: "tomato" }}>Post Data in my own server</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" id="" placeholder='name' required />
        <br />
        <input type="email" name="email" id="" placeholder='email' required />
        <br />
        <input type="submit" value="Submit" />
      </form>





      {/* __________ display Data in my own server _________ */}
      <h1 style={{ color: "tomato" }}>Display Data in my own server</h1>
      <h2>Total Users: {users.length}</h2>
      {
        users.map(user =>
          <div key={user.id}>
            <hr />
            <h2>Name: {user.name}</h2>
            <h3>Id: {user.id}</h3>
            <h3>Email: {user.email}</h3>
            <p>Phone: {user.ph}</p>
            <br />
          </div>)
      }
    </div>
  );
}

export default App;
