import React, { useState } from 'react';

const Component = () => {
    const [submit, setSubmit] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [age, setAge] = useState('');
    const [result, setResult] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (submit.length < 5 && fname.trim() && lname.trim() && age.trim()) {
            setSubmit([...submit, { fname, lname, age: parseInt(age) }]);
            setFname('');
            setLname('');
            setAge('');
        }
    };

    const handleYounger = () => {
        if (submit.length > 0) {
            const youngest = submit.reduce((prev, curr) => (prev.age < curr.age ? prev : curr));
            setResult(`Youngest: ${youngest.fname} ${youngest.lname}, Age: ${youngest.age}`);
        }
    };

    const handleOlder = () => {
        if (submit.length > 0) {
            const oldest = submit.reduce((prev, curr) => (prev.age > curr.age ? prev : curr));
            setResult(`Oldest: ${oldest.fname} ${oldest.lname}, Age: ${oldest.age}`);
        }
    };

    const handleSearch = () => {
        const foundPerson = submit.find(person => person.fname.toLowerCase() === searchTerm.toLowerCase());
        if (foundPerson) {
            setResult(`Found: ${foundPerson.fname} ${foundPerson.lname}, Age: ${foundPerson.age}`);
        } else {
            setResult('Name not found');
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={submitHandler}>
                    <label>First name:</label>
                    <input
                        type="text"
                        onChange={(e) => setFname(e.target.value)}
                        value={fname}
                        required
                    />
                    <label>Last name:</label>
                    <input
                        type="text"
                        onChange={(e) => setLname(e.target.value)}
                        value={lname}
                        required
                    />
                    <label>Age:</label>
                    <input
                        type="number"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        required
                    />
                    <button
                        type="submit"
                        disabled={!age.trim() || submit.length >= 5}
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div>
                <button onClick={handleYounger}>Younger</button>
                <button onClick={handleOlder}>Older</button>
                <input
                    type="text"
                    placeholder="Search by First Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div>
                <ul>
                    {submit.map((ele, index) => (
                        <li key={index}>
                            {ele.fname} {ele.lname}, Age: {ele.age}
                        </li>
                    ))}
                </ul>
            </div>

            {result && <div><strong>{result}</strong></div>}
        </div>
    );
};

export default Component;
