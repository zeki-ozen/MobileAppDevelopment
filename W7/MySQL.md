# Student Management with MySQL and Express

MySQL handles relational data and complex queries, while Express exposes a REST layer that React Native clients can integrate with. The examples below rely on the `mysql2` package and demonstrate inserting and querying students.

## Example 1: Creating the Student Table and Inserting Records via REST
The Express API receives a POST request and writes the payload into the `students` table. A simple React Native form posts new entries.

```sql
-- schema.sql
CREATE DATABASE IF NOT EXISTS campus;
USE campus;
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL
);
```

```js
// server/mysqlStudents.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'campus'
});

app.post('/students', async (req, res) => {
  const { fullname, department } = req.body;
  if (!fullname || !department) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const [result] = await pool.query('INSERT INTO students (fullname, department) VALUES (?, ?)', [fullname, department]);
  res.status(201).json({ id: result.insertId, fullname, department });
});

app.listen(3010, () => console.log('MySQL Student API listening on 3010'));
```

```jsx
// AddStudentScreen.js
import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const API_URL = 'http://192.168.1.23:3010/students';

export default function AddStudentScreen() {
  const [fullname, setFullname] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, department })
    });
    const payload = await response.json();
    setStatus(`Student created #${payload.id}`);
    setFullname('');
    setDepartment('');
  };

  return (
    <View>
      <TextInput placeholder="Full Name" value={fullname} onChangeText={setFullname} />
      <TextInput placeholder="Department" value={department} onChangeText={setDepartment} />
      <Button title="Save Student" onPress={handleSubmit} />
      {status ? <Text>{status}</Text> : null}
    </View>
  );
}
```

## Example 2: Querying Students and Displaying Them in a List
Expose a GET endpoint capable of returning all students or filtering by department. The React Native screen renders the results in a `FlatList`.

```js
// server/mysqlStudents.js (add this endpoint)
app.get('/students', async (req, res) => {
  const { department } = req.query;
  let sql = 'SELECT * FROM students';
  const params = [];
  if (department) {
    sql += ' WHERE department = ?';
    params.push(department);
  }
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});
```

```jsx
// StudentListScreen.js
import { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const API_URL = 'http://192.168.1.23:3010/students';

export default function StudentListScreen() {
  const [students, setStudents] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');

  const fetchStudents = async () => {
    const query = departmentFilter ? `?department=${departmentFilter}` : '';
    const response = await fetch(`${API_URL}${query}`);
    const payload = await response.json();
    setStudents(payload);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <View>
      <TextInput placeholder="Filter by department" value={departmentFilter} onChangeText={setDepartmentFilter} />
      <Button title="Load Students" onPress={fetchStudents} />
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.fullname} - {item.department}</Text>
        )}
      />
    </View>
  );
}
```

> Tip: adjust connection credentials for your environment and expose the backend through the machine IP so Expo devices can reach it.
