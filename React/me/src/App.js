import React from 'react';
import Row from './components/Row';
import './App.css';


function App() {

  const myInformation = {
    'Name': 'Lucky Sington Shrestha',
    'Address': 'Bhaktapur',
    'Emails': ['luckshrestha@gmail.com', 'hi@shresthalucky.com.np'],
    'Interests': ['Programming', 'Design', 'Artificial Intelligence'],
    'Education': ['Everest English School', 'Khwopa Higher Secondary School', 'Khwopa College of Engineering']
  }

  return (
    <div className="wrapper">
      <div className="info-table">
        {Object.keys(myInformation).map((key) => {
          return (
            <Row title={key} content={myInformation[key]} key={key} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
