import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    department: '',
    cgpa: '',
    dob: '',
    techStacks: [],
    areaOfInterest: '',
    resume: ''
  });

  const [submittedDataList, setSubmittedDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? 
          (checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value)) 
          : value
      }));
    }
  };

  const validateForm = () => {
    const { name, regNumber, dob } = formData;
    const nameRegex = /^[a-zA-Z\s]{2,20}$/;
    const regNumberRegex = /^\d{12}$/;
    
    if (!nameRegex.test(name)) {
      alert('Name should contain a minimum of 2 characters and a maximum of 20 characters.');
      return false;
    }
    
    if (!regNumberRegex.test(regNumber)) {
      alert('Registration number must be exactly 12 digits.');
      return false;
    }
    
    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();
    
    if (
      dobDate > today ||
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      alert('Date of Birth cannot be in the future and you must be at least 18 years old.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedDataList(prevList => [...prevList, formData]);
      setFormData({
        name: '',
        regNumber: '',
        department: '',
        cgpa: '',
        dob: '',
        techStacks: [],
        areaOfInterest: '',
        resume: ''
      });
    }
  };
  
  return (
    <div className='form-container'>
      <form id="student-form" onSubmit={handleSubmit}>
        <h1>Student Registration Form</h1>
        <label htmlFor="name"><strong>Name:</strong></label>
        <input type="text" id="name" name="name" value={formData.name} required placeholder='eg:Abc R' 
          minLength="2" maxLength="20" pattern="[a-zA-Z\s]+" onChange={handleChange} />
        <br />
        <label htmlFor="number"><strong>Registration Number:</strong></label>
        <input type="text" id="regNumber" name="regNumber" value={formData.regNumber} required placeholder='eg:21041234567' 
          pattern="\d{12}" onChange={handleChange} />
        <br />
        <label><strong>Department:</strong></label>
        <div className="radio-group">
          <label><input type="radio" id="cse" name="department" value="CSE" checked={formData.department === 'CSE'} onChange={handleChange} />CSE</label>
          <label><input type="radio" id="it" name="department" value="IT" checked={formData.department === 'IT'} onChange={handleChange} />IT</label>
          <label><input type="radio" id="aids" name="department" value="AIDS" checked={formData.department === 'AIDS'} onChange={handleChange} />AIDS</label>
          <label><input type="radio" id="csbs" name="department" value="CSBS" checked={formData.department === 'CSBS'} onChange={handleChange} />CSBS</label>
        </div>
        <br />
        <label htmlFor="cgpa"><strong>CGPA:</strong></label>
        <input type="number" id="cgpa" name="cgpa" value={formData.cgpa} required step="0.01" onChange={handleChange} />
        <br />
        <label htmlFor="date-of-birth"><strong>Date of Birth:</strong></label>
        <input type="date" id="dob" name="dob" value={formData.dob} required onChange={handleChange} />
        <br />
        <label><strong>Preferred Tech Stacks:</strong></label>
        <div className="checkbox-group">
          <label><input type="checkbox" id="frontend-developer" name="techStacks" value="Frontend Developer" checked={formData.techStacks.includes("Frontend Developer")} onChange={handleChange} />Frontend Developer</label>
          <label><input type="checkbox" id="backend" name="techStacks" value="Backend" checked={formData.techStacks.includes("Backend")} onChange={handleChange} />Backend Developer</label>
          <label><input type="checkbox" id="database" name="techStacks" value="Database Administrator" checked={formData.techStacks.includes("Database Administrator")} onChange={handleChange} />Database Administrator</label>
          <label><input type="checkbox" id="software" name="techStacks" value="Software Developer" checked={formData.techStacks.includes("Software Developer")} onChange={handleChange} />Software Developer</label>
          <label><input type="checkbox" id="business" name="techStacks" value="Business Analyst" checked={formData.techStacks.includes("Business Analyst")} onChange={handleChange} />Business Analyst</label>
          <label><input type="checkbox" id="data" name="techStacks" value="Data Analyst" checked={formData.techStacks.includes("Data Analyst")} onChange={handleChange} />Data Analyst</label>
        </div>
        <br />
        <label htmlFor="area-of-interest"><strong>Area of Interest:</strong></label>
        <input type="text" id="areaOfInterest" name="areaOfInterest" value={formData.areaOfInterest} placeholder='eg:AI,ML,Cloud...' onChange={handleChange} />
        <br />
        <label htmlFor="resume"><strong>Resume:</strong></label>
        <input type="file" id="resume" name="resume" onChange={handleChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {submittedDataList.length > 0 && <DataTable dataList={submittedDataList} />}
    </div>
  );
}

function DataTable({ dataList }) {
  return (
    <div className="data-table">
      <h2>Entered Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration Number</th>
            <th>Department</th>
            <th>CGPA</th>
            <th>Date of Birth</th>
            <th>Preferred Tech Stacks</th>
            <th>Area of Interest</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.regNumber}</td>
              <td>{data.department}</td>
              <td>{data.cgpa}</td>
              <td>{data.dob}</td>
              <td>{data.techStacks.join(', ')}</td>
              <td>{data.areaOfInterest}</td>
              <td>{data.resume ? data.resume.name : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
